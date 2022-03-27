import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Flex,
    IconButton,
    Tooltip,
    Box,
    useToast
} from '@chakra-ui/react';
import {AuthContext} from "../App";
import Card from "./UI/Card";
import CardFooter from "./UI/CardFooter";
import EditIcon from "../assets/svg/EditIcon";
import EditField from "./UI/EditField";
import DeleteIcon from "../assets/svg/DeleteIcon";
import UserService from "../services/user.service";

function User({userItem, change, isNew}) {
    const [isEditing, setIsEditing] = useState(isNew);
    const [userItemData, setUserItemData] = useState(userItem);
    const [imgUploaded, setImgUploaded] = useState(null);
    const {user} = useContext(AuthContext);
    const toast = useToast();


    const validateData = () => {
        if (!userItemData.email || (!String(userItemData.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))) toast({
            title: "Provide a valid email address",
            status: 'error',
            isClosable: true,
        });
        else if(isNew){
            if (!userItemData.password || userItemData.password.length < 4) {
                toast({
                    title: "Password length must be atleast 4 characters long",
                    status: 'error',
                    isClosable: true,
                });
            }
        }
        else return true;
    };


    const onCancel = () => {
        if(isNew) {
            change('new', false);
        }
        else {
            setUserItemData(userItem);
            setIsEditing(false);
        }
    }

    const onUpdate = () => {
        if(validateData()) {
            UserService.updateUser(userItemData.id, {...userItemData}).then(res => {
                setIsEditing(!isEditing);
                toast({
                    title: 'Updated Successfully',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                change('reload');
            }).catch((e) => {
                let error = e.response.data.message;
                toast({
                    title: `${error}`,
                    status: 'error',
                    isClosable: true,
                })
            });
        }
    }

    const onAdd = () => {
        if(validateData()) {
            UserService.addUser({...userItemData}).then(res => {
                change('new', !isNew);
                toast({
                    title: 'Added Successfully',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                change('reload');
            }).catch((e) => {
                let error = e.response.data.message;
                toast({
                    title: `${error}`,
                    status: 'error',
                    isClosable: true,
                })
                }
            )
        }
    }

    const onDelete = (id) => {
        UserService.deleteUser(id).then((res) => {
            toast({
                title: 'Deleted Successfully',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            change('reload');
        }).catch((e) => {
            let error = e.response.data.message;
            toast({
                title: `${error}`,
                status: 'error',
                isClosable: true,
            })
        })
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImgUploaded(URL.createObjectURL(file));
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setUserItemData({...userItemData, photo: reader.result});
        };
    };


    return (
        <>
            <Card>
                <Flex p={5} alignItems='center' gap={3}>
                    <Flex flexDirection={'column'} align={'flex-start'} p={3}>
                    <Avatar size={'xl'} src={`${userItemData.photo}`}/>
                    {isEditing &&  (
                        <Box pt={3}>
                        <input accept='image/' type='file' onChange={handleImageUpload}/>
                        </Box>
                        )}
                    </Flex>
                    <Flex flexDirection={'column'}>
                        <EditField
                            autoFocus={true}
                            isEdit={isEditing}
                            setValue={(val) => setUserItemData({...userItemData, email: val})}
                            type='h1'
                            value={userItemData.email}
                            size={25}
                            placeholder='Email'
                        />
                        <EditField
                            autoFocus={false}
                            isEdit={isEditing}
                            setValue={(val) => setUserItemData({...userItemData, password: val})}
                            type='p'
                            value={userItemData?.password}
                            placeholder='Password'
                            size={12}
                        />
                    </Flex>
                </Flex>
                <CardFooter
                    isEditMode={isEditing}
                    onCancel={onCancel}
                    onUpdate={onUpdate}
                    onAdd={onAdd}
                    isNew={isNew}
                    >
                    <Tooltip
                        label='Edit'
                        hasArrow
                        placement='top'
                        arrowSize={10}
                        fontSize='12px'>
                        <IconButton
                            onClick={() => setIsEditing(true)}
                            aria-label='Edit'
                            size='sm'
                            isRound
                            mr={5}
                            width='min-content'
                            icon={<EditIcon />}
                        />
                    </Tooltip>
                    <Tooltip
                        label='Delete'
                        hasArrow
                        placement='top'
                        arrowSize={10}
                        fontSize='12px'>
                        <IconButton
                            onClick={() => onDelete(userItemData.id)}
                            aria-label='Delete'
                            size='sm'
                            isRound
                            mr={5}
                            width='min-content'
                            icon={<DeleteIcon />}
                        />
                    </Tooltip>
                </CardFooter>
            </Card>
        </>
    );
}

export default User;