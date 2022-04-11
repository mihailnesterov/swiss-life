import React from 'react';

const ListMetaHeader = (props) => {

    const {title, meta} = props;

    return (
        <h3>{title} ({meta && meta.totalCount ? meta.totalCount : 0})</h3>
    )
}

export default ListMetaHeader;