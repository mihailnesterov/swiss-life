import React from 'react';
import { Trans } from '@lingui/macro';

const SeminarItem = (props) => {

    const {item} = props;

    return (
        <div className="seminar-item">
            <div>
                <h3>
                    <span>{item.name}</span>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.01172 14.125C5.7513 14.125 4.60026 13.8177 3.55859 13.2031C2.51693 12.5781 1.68359 11.7448 1.05859 10.7031C0.444011 9.66146 0.136719 8.51042 0.136719 7.25C0.136719 5.97917 0.444011 4.82812 1.05859 3.79687C1.68359 2.75521 2.51693 1.92708 3.55859 1.3125C4.60026 0.687499 5.7513 0.374999 7.01172 0.374999C8.28255 0.374999 9.43359 0.687499 10.4648 1.3125C11.5065 1.92708 12.3346 2.75521 12.9492 3.79687C13.5742 4.82812 13.8867 5.97917 13.8867 7.25C13.8867 8.51042 13.5742 9.66146 12.9492 10.7031C12.3346 11.7448 11.5065 12.5781 10.4648 13.2031C9.43359 13.8177 8.28255 14.125 7.01172 14.125Z" fill="#47BB1E"/>
                    </svg>
                </h3>
                <p>{item.description}</p>
                <div>
                    <div>
                        <a className='btn btn-default' href={item.form_link} target="_blank"><Trans>Записаться</Trans></a>
                    </div>
                    <div>
                        <p><Trans>Дата</Trans>: {item.start_date}</p>
                        <p><Trans>Время</Trans>: {item.start_time}</p>
                    </div>
                </div>
            </div>
            <div>
                {item.file && <img src={item.file.url} alt={item.file.name}  />}
            </div>
        </div>
    )
}

export default SeminarItem;