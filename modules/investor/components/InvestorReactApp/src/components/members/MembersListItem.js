import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const NewsListItem = (props) => {

    const {item, num} = props;

    return (
        <div>
            <div>{num+1}</div>
            <div>{item.fullName}</div>
            <div>{item.email}</div>
            <div>
                {
                    item.status === 1 ?
                    <FontAwesomeIcon className='text-green' icon={solid('check')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('xmark')} />
                }
            </div>
            <div>
                {
                    item.verified === 1 ?
                    <FontAwesomeIcon className='text-green' icon={solid('check')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('xmark')} />
                }
            </div>
            <div>
                {
                    item.userStatus.id > 1 &&
                    <span style={{
                            backgroundColor:`#${item.userStatus.color}`,
                            color: `#${item.userStatus.id === 2 ? 'fff' : '000'}`,
                            padding: '0.25rem 1rem',
                            borderRadius: '6px',
                            cursor:'pointer'
                        }}
                    >{item.userStatus.name}
                    </span>
                }
            </div>
        </div>
    )
}

export default NewsListItem;