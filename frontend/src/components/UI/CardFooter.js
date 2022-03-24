import React from 'react';
import { Button, Divider, Flex } from '@chakra-ui/react'


function CardFooter({
                        isEditMode,
                        onAdd,
                        isNew,
                        onCancel,
                        onUpdate,
                        children,
                    }) {
    return (
        <>
            <Divider position={'absolute'} bottom='58px' />
            <Flex mt='auto' p={5} gap={4} justifyContent='flex-end'>
                {isEditMode ? (
                    <>
                        <Button size='sm' variant={'ghost'} onClick={onCancel} mt={-5}>
                            Cancel
                        </Button>
                        <Button
                            mt={-5}
                            onClick={isNew ? onAdd : onUpdate}
                            size='sm'
                            color='white'
                            bg='teal'
                            variant={'solid'}>
                            Save
                        </Button>
                    </>
                ) : (
                    <>{children}</>
                )}
            </Flex>
        </>
    )
}

export default CardFooter;