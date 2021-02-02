import React from 'react'
import { formatNumber } from '../../../helpers/formatHelpers';
import css from './header.module.css';

export default function Header({ filter, countryCount, totalPopulation, onChangeFilter }) {

    const handleInputChange = (event) => {
        const newText = event.target.value;

        onChangeFilter(newText)
    }

    return (
        <div className={css.flexRow}>
            <input
                placeholder="Filtrar"
                style={{ width: '60%' }}
                type='text'
                value={filter}
                onChange={handleInputChange}
            />
            <span className={css.info}>Países: <strong> {countryCount}</strong></span>
            <span className={css.info}>População: <strong>{formatNumber(totalPopulation)}</strong></span>
        </div>
    )

}
