const mongoose = require('mongoose')
const muv = require('mongoose-unique-validator')

const productSchema = mongoose.Schema({
    userId : { type : String, required : true},
    name : {type : String, required : true},
    description : {type : String, required : true},
    picture : {type : String, required : true},
    price : {type : Number, required : true},
    amount : {type : Number, required : true}
})

productSchema.plugin(muv)

module.exports = mongoose.model('Product', productSchema)