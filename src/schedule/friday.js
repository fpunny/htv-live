import {HTV_OFFICIAL, SIDE, WORKSHOPS} from "./colours";

export default [
    {
        title: 'Waterloo Bus Leaves',
        location: 'Waterloo',
        description: 'Waterloo bus leaves for HTV III',
        // lead: ['Jun Zheng'],
        time: ['16:00', '16:30'] // from - to
    },
    {
        title: 'Hacker Registration',
        location: 'AC223',
        description: 'Registration, please make sure you have your acceptance ticket, and a piece of ID (student ID or government ID).',
        time: ['18:00', '21:00'], // from - to
        ...HTV_OFFICIAL
    },
    {
        title: 'Opening Ceremony',
        location: 'AC223',
        description: 'HTV III opening ceremony.',
        // lead: ['Jun Zheng'],
        time: ['21:00', '23:00'], // from - to
        ...HTV_OFFICIAL
    },
    {
        title: 'Team Formation',
        location: 'AC223',
        description: 'Stay in AC223 if you don\'t have a team yet, or want to find some new members for your team!',
        // lead: ['Jun Zheng'],
        time: ['23:00', '23:30'], // from - to
        ...SIDE
    },
    {
        title: 'Google Cloud Platform Workshop',
        location: 'HW214',
        description: 'Google Cloud Platform Workshop',
        // lead: ['Jun Zheng'],
        time: ['23:00', '24:00'], // from - to
        ...WORKSHOPS
    }
]