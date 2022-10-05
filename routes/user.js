const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json())

const User = require('../Models/user.models')

router.get('/', async(req,res)=>{
    //console.log("get");
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', (req,res)=>{
    const data = req.body.formData
    //console.log(data);
    const newUser = new User({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone
    });
    try {
        const response = newUser.save()
        res.json("Saved!")
    } catch (error) {
        res.json(error)
    }
})

router.put('/:id', async(req,res)=>{
    const data = req.body.formData
    console.log(data);
    try {
        const user = await User.findById(req.params.id)
        user.name = data.name,
        user.email = data.email,
        user.password = data.password,
        user.phone = data.phone
        const response = await user.save()

        res.json("Updated!")
    } catch (error) {
        res.json(error)
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const response = user.remove()
        //console.log("del");
        res.json("Deleted!")
    } catch (error) {
        res.json(error)
    }
})

router.get('/:id', async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router