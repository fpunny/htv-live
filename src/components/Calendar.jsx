import React, { useState, useEffect } from 'react';
import moment from 'moment';
import schedule from '../schedule';
import '../styles/components/Calendar.scss';

const bloom = new Array(97).fill(0);
const INTERVAL = 2000;
const HEIGHT = 47;

const calcHeight = () => {
    const now = moment();
    const h = now.hours() * 3600;
    const m = now.minutes() * 60;
    const s = now.seconds();
    return (h + m + s) * 47 / 900;
}

const calcSchedule = events => {
    bloom.fill(0);
    return (
        events.map(event => {
            const meta = getPos(
                moment.utc(event.time[0], 'H:mm'),
                moment.utc(event.time[1], 'H:mm'),
                event.overlap
            );
            let offset = 0;
            for (let i = meta[1]; i < meta[1] + meta[0]; i++) {
                offset = Math.max(offset, bloom[i]);
                bloom[i] += 1;
            }
            return { ...event, meta, offset };
        })
    );
}

const parseTime = (h, m = '00') => {
    const a = h % 12 || 12;
    const b = `${m}`.padStart(2, '0');
    const c = h > 12 && h < 24? 'pm' : 'am';
    return `${ a }:${ b }${ c }`;
};

const getPos = (f, t, overlap) => {
    let diff;
    const h = overlap === 'TOP' ? 0 : (f.format('H') * 4) + f.format('m') / 15;
    switch(overlap) {
        case 'TOP':
            diff = t.diff(moment.utc('00:00', 'H:mm'), 'minute');
            break;
        case 'BOTTOM':
            diff = moment.utc('24:00', 'H:mm').diff(f, 'minute');
            break;
        default:
            diff = t.diff(f, 'minute');
            break;
    }
    return [ diff / 15, h ];
}

const layout = () => (
    bloom.map((v, i) => (
        <li key={ i } className='cal__layout'>
            { parseTime(Math.floor(i / 4), (i % 4) * 15) }
        </li>
    ))
);

const _getSchedule = async (active, setEvents) => {
    const res = await schedule[active].schedule();
    setEvents(res.default);
};

export const Calendar = ({ active, select }) => {
    const date = moment(schedule[active].date, 'DD/MM/YY');
    const [ timer, setTimer ] = useState(calcHeight());
    const [ events, setEvents ] = useState(null);
    const getSchedule = async () => await _getSchedule(active, setEvents);
    const showClock = moment().diff(date, 'days') === 0;

    const click = ({ target }) => {
        const index = target.getAttribute('data-index');
        select(events[index]);
    }

    useEffect(() => {
        getSchedule();
        let t;

        if (showClock) {
            t = window.setTimeout(
                () => setTimer(calcHeight()),
                INTERVAL
            );
        }

        return () => clearTimeout(t);
    });

    return (
        <section className='cal'>
            <h1 className='cal__title'>Schedule - { date.format('MMMM Do') }</h1>
            <ul className='cal__list'>
                { showClock ? <li style={{ transform: `translate3d(0, ${ timer - 1 }px, 0)` }} className='cal__clock'/> : null }
                {
                    events ? calcSchedule(events).map(({ title, location, meta, offset, time: [from, to] }, i) => {
                        const [ diff, h ] = meta;
                        const w = Math.max(...bloom.slice(h, h + diff));
                        const style = {
                            transform: `translate3d(${ offset * 100 }%, ${ h * HEIGHT }px, 0)`,
                            height: `${ (diff * HEIGHT) - 1 }px`,
                            width: `${ 100 / (w || 1) }%`
                        };
                        return (
                            <li key={ i } style={ style } data-index={ i } onClick={ click } className='cal__item'>
                                <span className='cal__item-title'>{ title }</span>
                                <span className='cal__item-subtitle'>{ location }</span>
                                <span className='cal__item-time'>
                                    { parseTime(...from.split(':')) } - { parseTime(...to.split(':')) }
                                </span>
                            </li>
                        );
                    }) : null
                }
                { layout() }
            </ul>
        </section>
    );
};