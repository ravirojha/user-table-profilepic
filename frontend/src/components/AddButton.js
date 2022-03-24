import React from 'react';
import { Button } from '@chakra-ui/react';
import AddIcon from "../assets/svg/AddIcon";


function AddButton({change, isNew}) {
    return (
        <>
            <Button onClick={() => change('new', !isNew)} leftIcon={<AddIcon />} colorScheme='pink' variant='solid'>
                Add User
            </Button>
        </>
    );
}

export default AddButton;