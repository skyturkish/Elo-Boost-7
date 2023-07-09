const common = [
    {
        text: 'Select Role',
        amount: 'FREE'
    },
    {
        text: 'Select Champions',
        amount: 'FREE'
    },
    {
        text: 'Offline Mode',
        amount: 'FREE'
    },
    {
        text: 'VPN Encryption',
        amount: 'FREE'
    },
    {
        text: 'Booster Selection',
        amount: 'FREE'
    }
]

const servers = {
    EUW: 100,
    NA: 100,
    EUNE: 90,
    RU: 60,
    TR: 20
}

const optionValues = {
    premium: {
        value: 25,
        text: 'Premium Option{%25}'
    },
    stream: {
        value: 20,
        text: 'Stream Option{%20}'
    },
    soloOnly: {
        value: 25,
        text: 'Solo Only Option{%25}'
    },
    highMMR: {
        value: 30,
        text: 'High MMR Option{%30}'
    },
    untrackable: {
        value: 30,
        text: 'Untrackable Option{%30}'
    },
    stier: {
        value: 20,
        text: 'S+ TIER Option{%20}'
    },
    isDuo: {
        value: 30,
        text: 'Duoboosting Option{%30}'
    },
    isNotNetWin: {
        value: -30,
        text: 'Duoboosting Option{%30}'
    }
}
function filterOptions(options) {
    let result = {}
    for (let key in options) {
        if (options[key] === true) {
            result[key] = true
        }
    }
    return result
}

function calculateNormalOrder(order, discount) {
    let total = 0
    const amountMultiple = 2

    let amountGame = order.amountGame.split(' ')[0]

    const rawPrice = +amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    total = total * (servers[order.server] / 100)

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

const placementsRank = {
    unranked: 2.75,
    iron: 1.5,
    bronze: 1.5,
    silver: 2.25,
    gold: 3,
    platinum: 4,
    emerald: 6,
    diamond: 8,
    master: 10,
    grandmaster: 12,
    challenger: 14
}

function placementsGame(order, discount) {
    let total = 0
    const amountMultiple = placementsRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    console.log(order)

    total = total + rawPrice

    if (order.options.bonusWin) {
        texts.push({
            text: 'Bonus Win',
            amount: amountMultiple
        })
        total = total + amountMultiple
    }

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    total = total * (servers[order.server] / 100)

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

// ['35+','35-30LP','30-26LP','25-21LP','20-14LP']

const winRanks = [
    { 'iron-IV': 1.5 },
    { 'iron-III': 1.5 },
    { 'iron-II': 1.5 },
    { 'iron-I': 1.5 },
    { 'bronze-IV': 1.6 },
    { 'bronze-III': 1.7 },
    { 'bronze-II': 1.8 },
    { 'bronze-I': 1.9 },
    { 'silver-IV': 2 },
    { 'silver-III': 2.25 },
    { 'silver-II': 2.5 },
    { 'silver-I': 2.75 },
    { 'gold-IV': 3 },
    { 'gold-III': 3.5 },
    { 'gold-II': 4.0 },
    { 'gold-I': 4.5 },
    { 'platinum-IV': 5 },
    { 'platinum-III': 6 },
    { 'platinum-II': 7 },
    { 'platinum-I': 8 },
    { 'emerald-IV': 9 },
    { 'emerald-III': 10 },
    { 'emerald-II': 11 },
    { 'emerald-I': 12 },
    { 'diamond-IV': 12 },
    { 'diamond-III': 14 },
    { 'diamond-II': 16 },
    { 'diamond-I': 18 },
    { 'master-IV': 21 }
    // 857 / 100 = 8.57 bunu tam sayiya yuvarla aşağa doğru, 8*4 = 32 + 21 = 53 diye hesapla
]
const gainLpPercentage = {
    '20-14LP': 0,
    '25-21LP': 0,
    '30-26LP': 20,
    '35-30LP': 30,
    '40-36LP': 40,
    '41+': 80
}

function pureLP(LP) {
    if (LP !== '41+') {
        const values2 = LP.replace('LP', '').split('-')

        let firstVal2 = parseInt(values2[0])
        let secondVal2 = parseInt(values2[1])

        return (firstVal2 + secondVal2) / 2
    } else {
        return 41
    }
}

function winGame(order, discount) {
    let total = 0

    let pureCurrentLP = pureLP(order.currentRank.currentLP)

    const pureGainLP = pureLP(order.gainLP)

    const amountGame = order.amountGame.split(' ')[0]

    let keys = winRanks.map(function (obj) {
        return Object.keys(obj)[0]
    })

    let amountMultipleIndex = keys.indexOf(
        order.currentRank.division + '-' + order.currentRank.milestone
    )
    let rawPrice = 0

    let hicalattınmi = false

    for (let i = 0; i < amountGame; i++) {
        rawPrice = rawPrice + Object.values(winRanks[amountMultipleIndex])[0]

        pureCurrentLP = pureCurrentLP + pureGainLP

        if (pureCurrentLP >= 100) {
            if ((pureGainLP === 41 || pureGainLP === 38) & !hicalattınmi) {
                if (
                    order.currentRank.milestone === 'III' ||
                    order.currentRank.milestone === 'IV'
                ) {
                    hicalattınmi = true

                    amountMultipleIndex = amountMultipleIndex + 2
                } else {
                    amountMultipleIndex = amountMultipleIndex + 1
                }
            } else {
                amountMultipleIndex = amountMultipleIndex + 1
            }

            pureCurrentLP = pureCurrentLP % 100
        }
    }

    rawPrice = rawPrice * ((gainLpPercentage[order.gainLP] + 100) / 100)

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    total = total * (servers[order.server] / 100)

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

function divisionOrder(order, discount) {
    let total = 0

    let pureCurrentLP = pureLP(order.currentRank.currentLP)

    const pureGainLP = pureLP(order.gainLP)

    let keys = winRanks.map(function (obj) {
        return Object.keys(obj)[0]
    })

    let rawPrice = 0

    let amountMultipleIndex = keys.indexOf(
        order.currentRank.division + '-' + order.currentRank.milestone
    )

    let nextMultipleIndex = keys.indexOf(
        order.desiredRank.division + '-' + order.desiredRank.milestone
    )

    let amountGame = 0

    while (amountMultipleIndex != nextMultipleIndex) {
        rawPrice = rawPrice + Object.values(winRanks[amountMultipleIndex])[0]

        pureCurrentLP = pureCurrentLP + pureGainLP

        if (pureCurrentLP >= 100) {
            if (pureGainLP === 41 || pureGainLP === 38) {
                if (
                    Object.keys(winRanks[amountMultipleIndex])[0].split(
                        '-'
                    )[1] === 'III' ||
                    Object.keys(winRanks[amountMultipleIndex])[0].split(
                        '-'
                    )[1] === 'IV'
                ) {
                    amountMultipleIndex = amountMultipleIndex + 2

                    pureCurrentLP = 0
                } else {
                    amountMultipleIndex = amountMultipleIndex + 1
                }
            } else {
                amountMultipleIndex = amountMultipleIndex + 1
            }

            pureCurrentLP = pureCurrentLP % 100
        }
        amountGame++
    }

    rawPrice = rawPrice * ((gainLpPercentage[order.gainLP] + 100) / 100)

    if (amountGame > 2) {
        rawPrice = rawPrice * (85 / 100)
    }

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    if (order.options.bonusWin) {
        texts.push({
            text: 'Bonus Win',
            amount: Object.values(winRanks[nextMultipleIndex])[0]
        })
        total = total + Object.values(winRanks[nextMultipleIndex])[0]
    }

    total = total * (servers[order.server] / 100)

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

export const calculatePrice = (order) => {
    order.options = filterOptions(order.options)

    if (order.game == 'league-of-legends') {
        switch (order.orderType) {
            case 'division':
                return divisionOrder(order)
            case 'win':
                return winGame(order)
            case 'placements':
                return placementsGame(order)
            case 'normal-game':
                return calculateNormalOrder(order)
            case 'lesson':
                return currentLeagueOfLegendsOrder.lessonOrder
            case 'game-replay':
                return currentLeagueOfLegendsOrder.gameReplayOrder
            case 'live-game':
                return currentLeagueOfLegendsOrder.liveGameOrder
            case 'play-together':
                return currentLeagueOfLegendsOrder.playTogetherOrder
        }
    } else if (order.game == 'valorant') {
        switch (order.orderType) {
            case 'division':
                return currentValorantOrder.divisionOrder
            case 'win':
                return currentValorantOrder.winOrder
            case 'placements':
                return currentValorantOrder.placementsOrder
            case 'unrated':
                return currentValorantOrder.unratedOrder
            case 'lesson':
                return currentValorantOrder.lessonOrder
            case 'live-game':
                return currentValorantOrder.liveGameOrder
            case 'play-together':
                return currentValorantOrder.playTogetherOrder
        }
    }
}
