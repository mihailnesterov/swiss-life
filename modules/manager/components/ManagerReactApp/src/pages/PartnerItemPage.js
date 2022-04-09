import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import PartnerItem from '../components/partners/PartnerItem';
import Spinner from '../components/common/loader/Spinner';
import { getPartner } from '../api/partner';

const PartnerItemPage = () => {
    
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [partner, setPartner] = useState(null);

    useEffect(() => {
        if(id === 'new') {
            setTitle('Добавить партнера');
        } else {
            setLoading(true);
            getPartner(parseInt(id))
                .then(res => setPartner(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
        
        return () => setPartner(null);
    },[id]);

    useEffect(() => {
        if(partner && partner.id) {
            setTitle(`Партнер: ${partner.name}`);
        }
        
        return () => setTitle(null);
    },[partner]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        <PageLayout title={title}>
            <div className='page-partners'>
                <PartnerItem partner={partner} />
            </div>
        </PageLayout>
    )
}

export default PartnerItemPage;