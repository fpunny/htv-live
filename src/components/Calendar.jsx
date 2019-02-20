import React, { useState, useEffect } from 'react';
import moment from 'moment';
import schedule from '../schedule';
import '../styles/components/Calendar.scss';

const bloom = new Array(97).fill(0);
const INTERVAL = 2000;
const HEIGHT = 47;

const skip = (s, e) => {
    const a = moment.utc('00:00', 'H:mm');
    s = s.diff(a, 'minute') / 15;
    e = e.diff(a, 'minute') / 15;
    return (e - s) * 900;
}

const calcHeight = cut => {
    let start; let end;
    if (cut) {
        // No idea why
        start = moment.utc(cut[0], 'H:mm').add(5, 'hours');
        end = moment.utc(cut[1], 'H:mm').add(5, 'hours');
    }

    const now = moment();
    if (cut && now > start && now < end) {
        start.subtract(5, 'hours');
        const h = start.hours() * 3600;
        const m = start.minutes() * 60;
        const s = start.seconds();
        return (h + m + s) * 47 / 900;
    }
    const h = now.hours() * 3600;
    const m = now.minutes() * 60;
    const s = now.seconds();
    return (h + m + s - (cut && now > end ? skip(start, end): 0)) * 47 / 900;
}

const calcSchedule = (events, cut) => {
    bloom.fill(0);
    return (
        events.map(event => {
            const meta = getPos(
                moment.utc(event.time[0], 'H:mm'),
                moment.utc(event.time[1], 'H:mm'),
                event.overlap,
                cut
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

const getPos = (f, t, overlap, cut) => {
    let diff; let skip; let end;
    if (cut) {
        const a = moment.utc('00:00', 'H:mm');
        const start = moment.utc(cut[0], 'H:mm').diff(a, 'minute') / 15;
        end = moment.utc(cut[1], 'H:mm').diff(a, 'minute') / 15;
        skip = end - start;
    }

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
    return [ diff / 15, h > end ? h - skip : h ];
}

const layout = cut => {
    const a = moment.utc('00:00', 'H:mm');
    let skipStart; let skipEnd;
    if (cut) {
        skipStart = moment.utc(cut[0], 'H:mm').diff(a, 'minute') / 15;
        skipEnd = moment.utc(cut[1], 'H:mm').diff(a, 'minute') / 15;
    }
    return (
        bloom.map((v, i) => (
            cut ? (
                i === skipStart ? <li key={ i } className='cal__layout'>{
                    parseTime(Math.floor(i / 4), (i % 4) * 15)
                } - {
                    parseTime(Math.floor(skipEnd / 4), (skipEnd % 4) * 15)
                }</li> :
                i > skipStart && i <= skipEnd ? null :
                <li key={ i } className='cal__layout'>
                    { parseTime(Math.floor(i / 4), (i % 4) * 15) }
                </li>
            ) :
            <li key={ i } className='cal__layout'>
                { parseTime(Math.floor(i / 4), (i % 4) * 15) }
            </li>
        ))
    );
};

const _getSchedule = async (active, setEvents) => {
    const res = await schedule[active].schedule();
    setEvents(res.default);
};

export const Calendar = ({ active, select }) => {
    const date = moment(schedule[active].date, 'DD/MM/YY');
    const cut = schedule[active].cut;
    const [ timer, setTimer ] = useState(calcHeight(cut));
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
                () => setTimer(calcHeight(cut)),
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
                    events ? calcSchedule(events, cut).map((
                        { title, location, meta, offset, background, primary, secondary, time: [from, to] },
                        i
                    ) => {
                        const [ diff, h ] = meta;
                        const w = Math.max(...bloom.slice(h, h + diff));
                        const style = {
                            transform: `translate3d(${ offset * 100 }%, ${ h * HEIGHT }px, 0)`,
                            height: `${ (diff * HEIGHT) - 1 }px`,
                            width: `${ 100 / (w || 1) }%`,
                            backgroundColor: background
                        };
                        return (
                            <li key={ i } style={ style } data-index={ i } onClick={ click } className='cal__item'>
                                <span className='cal__item-title' style={{ color: primary }}>{ title }</span>
                                <span className='cal__item-subtitle' style={{ color: secondary }}>{ location }</span>
                                <span className='cal__item-time' style={{ color: secondary }}>
                                    { parseTime(...from.split(':')) } - { parseTime(...to.split(':')) }
                                </span>
                            </li>
                        );
                    }) : null
                }
                { layout(cut) }
            </ul>
        </section>
    );
};