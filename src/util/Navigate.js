import { speed } from '../styles/_variables.scss';
export const DURATION = parseInt(speed.slice(0, -2));

const dispatchEvent = event => window.dispatchEvent(
    new CustomEvent(event)
);

export const Events = {
    FADE: 'onPageFade',
    DONE: 'onPageDone'
};

export const fadeEffect = (fade, done) => {
    window.addEventListener(Events.FADE, fade);
    window.addEventListener(Events.DONE, done);
    return () => {
        window.removeEventListener(Events.FADE, fade);
        window.removeEventListener(Events.DONE, done);
    };
};

export const fade = (fade, done) => {
    dispatchEvent(Events.FADE);
    fade();
    window.setTimeout(() => {
        dispatchEvent(Events.DONE);
        done();
    }, DURATION);
};