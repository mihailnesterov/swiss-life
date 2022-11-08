import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import SeminarItem from '../components/seminars/SeminarItem';
import Spinner from '../components/common/loader/Spinner';
import { getSeminar } from '../api/seminar';

const SeminarItemPage = () => {
    
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [seminar, setSeminar] = useState(null);

    useEffect(() => {
        if(id === 'new') {
            setTitle('Добавить семинар');
        } else {
            setLoading(true);
            getSeminar(parseInt(id))
                .then(res => setSeminar(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
        
        return () => setSeminar(null);
    },[id]);

    useEffect(() => {
        if(seminar && seminar.id) {
            setTitle(`Семинар: ${seminar.name}`);
        }
        
        return () => setTitle(null);
    },[seminar]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        <PageLayout title={title}>
            <div className='page-seminars'>
                <SeminarItem seminar={seminar} />
            </div>
        </PageLayout>
    )
}

export default SeminarItemPage;