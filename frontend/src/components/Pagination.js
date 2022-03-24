import React from 'react';
import {Pagination} from "semantic-ui-react";

function PaginationComp({page, pageCount, change}) {
    return (
        <>
            <Pagination
                boundaryRange={0}
                defaultActivePage={page}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={pageCount || 0}
                onPageChange={(event, data) => {
                    change('page',data.activePage);
                    change('reload');
                }}
            />
        </>
    );
}

export default PaginationComp;