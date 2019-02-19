// date = DD/MM/YY

export default [
    {
        date: '19/02/19',
        schedule: () => import('./test')
    },
    {
        date: '22/02/19',
        schedule: () => import('./friday')
    },
    {
        date: '23/02/19',
        schedule: () => import('./saturday')
    },
    {
        date: '24/02/19',
        schedule: () => import('./sunday')
    },
]