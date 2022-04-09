import React from 'react';

const CategoriesFilter = (props) => {

    const {categories, fetchData} = props;

    const setActiveCategory = (name) => {
        if ( name === 'Все' )
            fetchData();
        else
            fetchData({'name':name}); // доделать вывод категорий...
    }

    return (
        <div className='categories-filter'>
            <ul>
                {
                    categories.map((item,i) => 
                        <li key={i}>
                            <button 
                                onClick={() => setActiveCategory(item.name)}
                                title={item.description}
                            >{item.name}</button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default CategoriesFilter;