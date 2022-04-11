import React, { useState, useEffect } from 'react';
import PaginationNav from './PaginationNav';

const Pagination = (props) => {

    const {id, links, meta, params, fetchData} = props;

    const [currentPage, setCurrentPage] = useState(null);
    const [pageCount, setPageCount] = useState(null);
    const [perPage, setPerPage] = useState(null);
    const [totalCount, setTotalCount] = useState(null);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        setCurrentPage(meta.currentPage);
        setPageCount(meta.pageCount);
        setPerPage(meta.perPage);
        setTotalCount(meta.totalCount);

        return () => {
            setCurrentPage(null);
            setPageCount(null);
            setPerPage(null);
            setTotalCount(null);
        }
    }, [meta]);

    useEffect(() => {
        if( pageCount ) {
            const _pages = [];
            for(let i = 1; i <= pageCount; i++) {
                _pages.push(i);
            }
            setPages(_pages);
        }

        return () => setPages([]);
    }, [pageCount]);

    return (
        <div className='pagination'>
            {
                totalCount > perPage &&
                <PaginationNav 
                    id={id}
                    links={links} 
                    pages={pages} 
                    perPage={perPage}
                    currentPage={currentPage}
                    params={params}
                    fetchData={fetchData}
                />
            }
        </div>
    )
}

export default Pagination;