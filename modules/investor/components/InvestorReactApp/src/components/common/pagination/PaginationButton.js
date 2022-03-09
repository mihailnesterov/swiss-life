import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const buttonTypes = {
    first: <FontAwesomeIcon icon={solid('angles-left')} />,
    last: <FontAwesomeIcon icon={solid('angles-right')} />,
    next: <FontAwesomeIcon icon={solid('chevron-right')} />,
    prev: <FontAwesomeIcon icon={solid('chevron-left')} />
};

const PaginationButton = (props) => {

    const {type, pageNum, isCurrent, setCurrentPage} = props;

    const [buttonType, setButtonType] = useState(null);
    const [buttonText, setButtonText] = useState(null);

    useEffect(() => {
        if(type) {
            switch (type) {
                case 'first':
                    setButtonType(buttonTypes.first);
                    break;
                case 'last':
                    setButtonType(buttonTypes.last);
                    break;
                case 'next':
                    setButtonType(buttonTypes.next);
                    break;
                case 'prev':
                    setButtonType(buttonTypes.prev);
                    break;
            }
        }

        return () => {
            setButtonType(null);
        }
    }, [type]);

    useEffect(() => {
        if(buttonType) {
            setButtonText(buttonType);
        } else {
            setButtonText(pageNum);
        }
        
    }, [buttonType, pageNum]);


    return (
        <button 
            className={isCurrent === true ? "current" : null}
            onClick={() => setCurrentPage(pageNum)}
        >
            {buttonText}
        </button>
    )
}


export default PaginationButton;