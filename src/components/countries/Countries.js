import React from 'react'
import Country from './Country';

import css from './country.module.css';

export default function Countries({ countries }) {

    return (
        <div className={css.flexWrap}>
            {
                countries.map(country => {
                    return <Country key={country.id} country={country} />
                })
            }
        </div>
    )
}
