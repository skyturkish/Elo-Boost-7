export const valorantDivisions = [
    {
        color: '#000001',
        name: 'iron'
    },
    {
        color: '#421106',
        name: 'bronze'
    },
    {
        color: '#c0c0c0',
        name: 'silver'
    },
    {
        color: '#eeaf0c',
        name: 'gold'
    },
    {
        color: '#11a49b',
        name: 'platinum'
    },
    {
        color: '#c487f5',
        name: 'diamond'
    },
    {
        color: '#3ACD7F',
        name: 'ascendant'
    },
    {
        color: '#ff3156',
        name: 'immortal'
    },
    {
        color: '#FFDB7E',
        name: 'radiant'
    }
]

export const findColorByDivisionName = (name) => {
    return valorantDivisions.find((rank) => rank.name === name).color
}

export const valorantMilestones = ['I', 'II', 'III']

export const heroes = [
    'astra',
    'breach',
    'brimstone',
    'chamber',
    'cypher',
    'fade',
    'gekko',
    'harbor',
    'jett',
    'kayo',
    'killjoy',
    'neon',
    'omen',
    'phoenix',
    'raze',
    'reyna',
    'sage',
    'skye',
    'sova',
    'viper',
    'yoru'
]
