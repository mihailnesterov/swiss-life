import React from 'react';

const FormSent = (props) => {

    const {header, text, onOk} = props;

    return(
        <div className='form-sent'>
            <h3>{header}</h3>
            {text}
            <button onClick={onOk}>Ок</button>
        </div>
    )
}


export default FormSent;