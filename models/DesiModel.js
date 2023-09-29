const mongoose = require('mongoose');

const DesiSchema = new mongoose.Schema({

    desi:{
        type:"String",
        required : true,
    },
   
})

module.exports = mongoose.model('Designation',DesiSchema)