import React from 'react';
import {HTV_OFFICIAL, SIDE, WORKSHOPS} from "./colours";

export default [
    {
        title: 'React Beginner Workshop',
        location: 'HW214',
        description: 'Want to take your web game to the next level? Join us in this workshop where you would learn the basics of React and make your own login page.',
        lead: ['Fredric Pun'],
        time: ['00:00', '1:00'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'Midnight Snack',
        location: 'HW308',
        description: 'Midnight snack.',
        // lead: ['Jun Zheng'],
        time: ['00:00', '1:00'], // from - to
        ...SIDE,
    },
    {
        title: 'Web Application Workshop',
        location: 'HW214',
        description: 'Web Application Workshop',
        lead: ['Omar Chehab'],
        time: ['01:00', '02:00'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'Breakfast',
        location: 'HW308',
        description: 'Breakfast!',
        // lead: ['Jun Zheng'],
        time: ['09:00', '11:00'], // from - to
        ...HTV_OFFICIAL,
    },
    {
        title: 'The Bottlenecks of Blockchain Technology',
        location: 'HW214',
        description: 'The Bottlenecks of Blockchain Technology',
        // lead: ['Jun Zheng'],
        time: ['09:00', '10:00'], // from - to
        ...WORKSHOPS
    },
    {
        title: 'The Hub Workshop',
        location: 'HW214',
        description: 'The Hub Workshop',
        // lead: ['Jun Zheng'],
        time: ['10:00', '11:30'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'FDM Group Workshop',
        location: 'HW214',
        description: 'FDM Group Workshop',
        // lead: ['Jun Zheng'],
        time: ['11:30', '12:30'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'Lunch',
        location: 'HW308',
        description: 'Lunch!',
        // lead: ['Jun Zheng'],
        time: ['13:00', '15:00'], // from - to
        ...HTV_OFFICIAL,
    },
    {
        title: 'GraphQL Workshop',
        location: 'HW214',
        description: 'What is all this GraphQL fuss about? During this workshop, you will learn the basics of GraphQL, and how to build a simple GraphQL API using Node.js!',
        lead: ['Jun Zheng'],
        time: ['13:00', '14:00'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'You.i TV Workshop',
        location: 'HW214',
        description: 'You.i TV Workshop',
        // lead: ['Jun Zheng'],
        time: ['14:00', '15:00'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'Snack',
        location: 'Nasir\'s Hot Dog Stand',
        description: (
            <span>Download CheaprEats app on your phone to redeem your free hot dog! <a href="https://cheapreats.com">Download Here</a>.</span>
        ),
        // lead: ['Jun Zheng'],
        time: ['16:00', '22:00'], // from - to
        ...SIDE,
    },
    {
        title: 'Women In Code Summit',
        location: 'HW214',
        description: 'Women In Code Summit',
        // lead: ['Jun Zheng'],
        time: ['15:00', '17:00'], // from - to
        ...HTV_OFFICIAL,
    },
    {
        title: 'Rogers Workshop',
        location: 'HW214',
        description: 'Rogers Workshop',
        // lead: ['Jun Zheng'],
        time: ['17:00', '18:30'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'MLH Cup Stacking',
        location: 'HW308',
        description: 'MLH Cup Stacking',
        // lead: ['Jun Zheng'],
        time: ['19:00', '20:00'], // from - to
        ...SIDE,
    },
    {
        title: 'Advanced React Workshop',
        location: 'HW214',
        description: 'Looking for a challenge? Join us in this workshop where we would explore some of the new features up till React 16.8 and create a modal library.',
        lead: ['Fredric Pun'],
        time: ['20:00', '21:00'], // from - to
        ...WORKSHOPS,
    },
    {
        title: 'Nerf Gun Fight',
        location: 'TBA',
        description: 'Nerf Gun Fight!',
        // lead: ['Jun Zheng'],
        time: ['21:00', '22:00'], // from - to
        ...SIDE,
    },
    {
        title: 'Dinner',
        location: 'HW214',
        description: 'Dinner!',
        // lead: ['Jun Zheng'],
        time: ['20:30', '22:30'], // from - to
        ...HTV_OFFICIAL,
    }
]