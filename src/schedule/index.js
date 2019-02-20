// date = DD/MM/YY

export default [
    {
        date: '20/02/19',
        cut: ['2:30', '2:45'],
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