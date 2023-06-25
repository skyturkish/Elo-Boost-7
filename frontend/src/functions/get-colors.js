const stateColors = [
    {
        name: 'paid',
        color: '#12B5E2'
    },
    {
        name: 'active',
        color: '#12E24C'
    },
    {
        name: 'pending',
        color: '#127EE2'
    },
    {
        name: 'paused',
        color: '#E21212'
    },
    {
        name: 'assigned',
        color: '#00BCB1'
    },
    {
        name: 'done',
        color: '#E29812'
    }
]

export const findStateColor = (name) => {
    return stateColors.find((state) => state.name === name).color
}
