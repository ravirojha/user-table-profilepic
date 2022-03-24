import { Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'


function EditField({
                       isEdit,
                       setValue,
                       value,
                       type,
                       autoFocus,
                       size,
                       placeholder,
                   }) {
    return (
        <Flex alignItems={'center'} gap='1rem'>
            {!isEdit ? (
                <>
                    <Text
                        as={type}
                        fontWeight={type === 'h1' ? 900 : 700}
                        fontSize={`${size}px`}
                        noOfLines={1}>
                        {value}
                    </Text>
                </>
            ) : (
                <>
                    <Input
                        placeholder={placeholder}
                        value={value}
                        px={'5px'}
                        mb={1}
                        autoFocus={autoFocus}
                        fontSize='xl'
                        fontWeight={700}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </>
            )}
        </Flex>
    )
}

export default EditField;