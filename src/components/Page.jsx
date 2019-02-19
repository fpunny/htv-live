import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { fadeEffect } from '../util/Navigate';
import { makeClassName } from '../util/Tools';
import schedule from '../schedule';
import '../styles/components/Page.scss';

export const Page = ({ className, state, children }) => {
    const [ fade, setFade ] = useState(false);
    const [ active, setActive ] = state;
    useEffect(() => (
        fadeEffect(() => setFade(true), () => setFade(false))
    ));
    const click = ({ target }) => {
        const index = target.getAttribute('data-index');
        setActive(parseInt(index));
    };
    const name = makeClassName('page', [
        [fade, 'page--fade'], [className]
    ]);
    
    return <div className={ name }>
        <ul className='page__days'>
            {
                schedule.map(({ date }, i) => {
                    const cname = makeClassName('page__day', [[i === active, 'page__day--active']]);
                    return (
                        <li key={ date } data-index={ i } className={ cname } onClick={ click }>
                            <span className='page__day-title'>Day { i + 1 }</span>
                            <span className='page__day-date'>{ moment(date, 'DD/MM/YY').format('MMM DD') }</span>
                        </li>
                    );
                })
            }
        </ul>
        <div className='page__content'>{ children }</div>
    </div>;
};