import React, { Fragment } from 'react';
import '../styles/components/Description.scss';

const parseTime = (h, m = '00') => {
    const a = h % 12 || 12;
    const b = `${m}`.padStart(2, '0');
    const c = h > 12 && h < 24 ? 'pm' : 'am';
    return `${ a }:${ b }${ c }`;
};

const showEvent = ({ title, location, description, time, lead }) => (
    <Fragment>
        <h1 className='info__title'>{ title }</h1>
        <ul className='info__tags'>
            {
                Object.entries({ location, time, lead }).map(([key, val]) => {
                    const res = (
                        key !== 'time' ? val :
                        `${ parseTime(...val[0].split(':')) } - ${ parseTime(...val[1].split(':')) }`
                    );
                    return (
                        val ? (
                            <li key={ key } className='info__tag'>
                                <span className='info__tag-title'>
                                    { key.charAt(0).toUpperCase() + key.slice(1) }:
                                </span>
                                <span className='info__tag-text'>{ res }</span>
                            </li>
                        ): null
                    );
                })
            }
        </ul>
        <p className='info__text'>{ description }</p>
    </Fragment>
);

export const Description = ({ selected }) => {
    return (
        <section className='info'>
            { selected ? showEvent(selected) : <p className='info__help'>{ '<<' } Click on an event to learn more.</p> }
        </section>
    );
};