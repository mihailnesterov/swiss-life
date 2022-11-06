import React from 'react';

const FormSent = (props) => {

    const {header, text, onOk} = props;

    return(
        <div className='form-sent'>
            <h3>{header}</h3>
            <div>
                <p>{text}</p>
                <button onClick={onOk}>Ок</button>
            </div>
        </div>
    )
}

export default FormSent;