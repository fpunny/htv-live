// date = DD/MM/YY

export default [
    /* {
        date: '20/02/19',
        cut: ['2:30', '2:45'],
        schedule: () => import('./test')
    }, */
    {
        date: '22/02/19',
        cut: ['0:00', '15:45'],
        schedule: () => import('./friday')
    },
    {
        date: '23/02/19',
        cut: ['2:15', '8:15'],
        schedule: () => import('./saturday')
    },
    {
        date: '24/02/19',
        cut: ['2:15', '8:30'],
        schedule: () => import('./sunday')
    },
]