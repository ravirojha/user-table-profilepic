import React from 'react';
import { Flex } from '@chakra-ui/react'


function Card({ children }) {
    return (
        <Flex
            position={'relative'}
            overflow='hidden'
            lineHeight={2}
            flexDirection={'column'}
            width='70%'
            height='230px'
            borderWidth='thin'
            marginX={'auto'}
            _hover={{
                boxShadow: 'base',
            }}
            borderColor='gray.200'
            borderRadius={7}>
            {children}
        </Flex>
    )
}

export default Card;