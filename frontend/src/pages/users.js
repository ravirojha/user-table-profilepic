import React, {useContext, useEffect, useState} from 'react';
import {
    Flex,
    Box,
    useToast,
    Spinner
} from '@chakra-ui/react';
import UserService from "../services/user.service";
import {AuthContext} from "../App";
import User from "../components/user";
import PaginationComp from "../components/Pagination";
import AddButton from "../components/AddButton";

function Users(props) {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState('10');
    const [isNew, setIsNew] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bit, setBit] = useState(false);
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const toast = useToast();



    useEffect(() => {
        UserService.getUsers({ page })
            .then((res) => {
                setPageCount(res?.data.pageCount)
                setUserData(res?.data?.users);
                if (page > res?.data.pageCount){

                    setPage(res?.data.pageCount);
                }
                setIsLoading(false)
            })
            .catch((err) => {
                const error = err.response?.data.message;
                toast({
                    title: `${error}`,
                    status: 'error',
                    isClosable: true,
                })
            });

    }, [ page, bit, user]);

    function change(updateParam, value) {
        if(updateParam === 'new') {
            setIsNew(value);
        }  else if(updateParam === 'page') {
            setPage(value);
        } else if(updateParam === 'pageCount') {
            setPageCount(value);
        } else if(updateParam === 'reload') {
            setIsLoading(true);
            setBit(!bit);
        }
    }

    return (
        isLoading ? <Spinner/> :
        <Flex flexDirection={'column'} gap={3} align={'center'}>
            <Box p={5}>
            <AddButton change={change} isNew={isNew}/>
            </Box>
            {isNew && (<User userItem={{email: '', password: '', photo: ''}} change={change} isNew={true}/>)}
            {userData.length > 0 && (userData?.map((singleUser) => (
                    <User key={singleUser.id} userItem={singleUser} change={change} isNew={isNew}/>
                )))
                }
            <PaginationComp page={page} pageCount={pageCount} change={change}/>
        </Flex>
    );
}

export default Users;