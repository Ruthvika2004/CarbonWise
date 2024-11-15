const mongoose=require('mongoose')

const Schema= mongoose.Schema

const projectSchema = new Schema({
    Project_title:{
        type:String,
        required: true
    },
    // Project_desc:{
    //     type:String,
    //     required: true
    // },
    Location:{
        type:String,
        required: false
    },
    // Cost_per_Credit:{
    //     type:Number,
    //     required: true
    // },
    Carbon_credits:{
        type:Number,
        required: true
    }
   
},{timestamps: true}) 

module.exports=mongoose.model('Project',projectSchema)

 
