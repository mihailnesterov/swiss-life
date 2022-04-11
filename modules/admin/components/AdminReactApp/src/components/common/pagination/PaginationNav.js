import React, {useState, useEffect} from 'react';
import {getPageFromLink} from '../../../utils/pages';
import PaginationButton from './PaginationButton';

const PaginationNav = (props) => {

    const {id, links, pages, perPage, currentPage, params, fetchData} = props;

    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    useEffect(() => {
        links.first && 
        links.first.href && 
        setFirst(getPageFromLink(links.first.href));
        
        links.last && 
        links.last.href && 
        setLast(getPageFromLink(links.last.href));

        links.prev && 
        links.prev.href && 
        setPrev(getPageFromLink(links.prev.href));

        links.next && 
        links.next.href && 
        setNext(getPageFromLink(links.next.href));

        return () => {
            setFirst(null);
            setLast(null);
            setPrev(null);
            setNext(null);
        };
    },[links]);    

    const setCurrentPageHandler = (pageNum) => {
        if(id) {
            fetchData(id, {...params, ...{
                'per-page': `${perPage}`,
                'page': `${pageNum}`
            }});
        } else {
            fetchData({...params, ...{
                'per-page': `${perPage}`,
                'page': `${pageNum}`
            }});
        }

        console.log({...params, ...{
            'per-page': `${perPage}`,
            'page': `${pageNum}`
        }});
    }

    return (
        <nav>
            <ul>
                {
                    first && 
                    <li>
                        <PaginationButton 
                            type="first"
                            pageNum={first}
                            isCurrent={false}
                            setCurrentPage={setCurrentPageHandler}
                        />
                    </li>
                }
                {
                    prev && 
                    <li>
                        <PaginationButton 
                            type="prev"
                            pageNum={prev}
                            isCurrent={false}
                            setCurrentPage={setCurrentPageHandler}
                        />
                    </li>
                }
                {
                    pages && 
                    pages.length > 0 &&
                    currentPage &&
                    pages.map(page => 
                        <li key={page}>
                            <PaginationButton 
                                pageNum={page}
                                isCurrent={page === currentPage ? true : false}
                                setCurrentPage={setCurrentPageHandler}
                            />
                        </li>
                    )
                }
                {
                    next && 
                    <li>
                        <PaginationButton 
                            type="next"
                            pageNum={next}
                            isCurrent={false}
                            setCurrentPage={setCurrentPageHandler}
                        />
                    </li>
                }
                {
                    last && 
                    <li>
                        <PaginationButton 
                            type="last"
                            pageNum={last}
                            isCurrent={false}
                            setCurrentPage={setCurrentPageHandler}
                        />
                    </li>
                }
                
            </ul>
        </nav>
    )
}

export default PaginationNav;