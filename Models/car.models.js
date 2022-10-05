const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    
    brand: {
        type: String,
        required: true
    },
    reg_number: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Car', carSchema)