const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json())

const Car = require('../Models/car.models')

router.get('/', async (req, res) => {
    try {
        const cars = await Car.find()
        res.json(cars)
        //console.log("car get");
    } catch (error) {
        res.json(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        res.json(car)
    } catch (error) {
        res.json(error)
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.type === "save") {
            const data = req.body.data
            console.log(data);
            const newCar = new Car({
                brand: data.brand,
                reg_number: data.reg_number,
                price: data.price,
                description: data.description,
                img: data.img,
                user_id: data.user_id
            });
            const response = newCar.save()
            res.json("Saved!")

        } else if (req.body.type === "user") {
            const allCars = await Car.find()
            const selectCars = []
            allCars.map((car) => {
                if (car.user_id === req.body.userId) {
                    selectCars.push(car);
                }
            })
            res.json(selectCars)
        }
    } catch (error) {
        res.json(error)
    }
})


router.put('/:id', async (req, res) => {
    const data = req.body.data
    //console.log(req.params.id);
    //console.log(data);

    try {
        const car = await Car.findById(req.params.id)
        car.brand = data.brand,
            car.reg_number = data.reg_number,
            car.price = data.price,
            car.description = data.description,
            car.img = data.img,
            car.user_id = data.user_id

        const response = await car.save()

        res.json("Updated!")
    } catch (error) {
        res.json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        const response = car.remove()
        res.json("Deleted!")
    } catch (error) {
        res.json(error)
    }
})

module.exports = router