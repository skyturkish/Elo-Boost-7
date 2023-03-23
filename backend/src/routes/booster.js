const { boosterService } = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const boosters = await boosterService.load()
    res.send(boosters)
})

router.post('/', async (req, res, next) => {
    const { name, mainGame } = req.body

    try {
        const booster = await boosterService.insert({
            name: name,
            mainGame: mainGame
        })

        res.send(booster)
    } catch (e) {
        next(e)
    }
})

router.get('/:boosterId', async (req, res) => {
    const { boosterId } = req.params

    const booster = await boosterService.find(boosterId)

    if (!booster) return res.status(404).send('Cannot find booster')
    // res.sendStatus(404) isteği sonlandırıyor

    res.send(booster)
})

router.delete('/:boosterId', async (req, res) => {
    const { boosterId } = req.params

    await boosterService.removeBy('_id', boosterId)

    res.send('OK')
})

router.patch('/:boosterId/balance', async (req, res) => {
    const { boosterId } = req.params

    const { amount } = req.body
    //We can't take booster from this request
    await boosterService.findAndUpdateBalance(boosterId, amount)

    const booster = await boosterService.find(boosterId)

    res.send(booster)
})

// router.post('/:passengerId/bookings', async (req, res) => {
//     // bu fonksiyonun adı request handle
//     const { passengerId } = req.params
//     const { driverId, origin, destination } = req.body

//     const booking = await passengerService.book(
//         driverId,
//         passengerId,
//         origin,
//         destination
//     )

//     res.send(booking)

//     // const passenger = await passengerService.findBy("id",req.params.passengerId)
//     // const driver = await driverService.findBy("id",req.query.driverId)

//     // passenger.book(driver,req.query.origin,req.query.destination)

//     // await passengerService.update(passenger) // url üzerinden query olarak da alabiliyoruz ya da body ile de alabilyioruz, burası query ile aldığımız yer

//     // res.send(flatted.stringify(passenger))
// })

// router.patch('/:passengerId', async (req, res) => {
//     const { name } = req.body

//     await passengerService.update(req.params.passengerId, { name })

//     res.send('oldu')
// })

module.exports = router
