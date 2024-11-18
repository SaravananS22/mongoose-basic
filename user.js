const mongoose=require('mongoose');

const addressSchema = new mongoose.Schema({
    street:String,
    city:String
})

const userSchema = new mongoose.Schema({
    name:String,
    age:{
        type:Number,
        min:1,
        max:100,
        // custom validate
        validate:{
            validator:value=>value % 2===0,
            message:props=>`${props.value} is not an even number`
        }
    },
    email:{
        type:String,
        minLength:10,
        required:true,
        lowercase:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>new Date()
    },
    updatedAt:{
        type:Date,
        immutable:true,
        default:()=>new Date()
    },
    bestFriend:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User' // ref the modal
        // mongoose tells this object ref this modal
    },
    hobbies:[String],
    address:addressSchema
})

userSchema.methods.sayHi=function(){
    console.log(`Hi My name ${this.name}`)
}

userSchema.statics.findByName=function(name){
    return this.find({name:new RegExp(name,'i')})
}

userSchema.query.byName=function(name){
    return this.where({name:new RegExp(name,'i')})
}

//allows us to define static class methods for the models using schema objects

// virtual not present in the actual database
userSchema.virtual("namedEmail").get(function(){
    return `${this.name} <${this.email}>`
})

// middle ware 
// important save,validate,remove
userSchema.pre('save',function(next){
    this.updatedAt=Date.now()
    // next()
    throw new Error('Fail Save')
})

userSchema.post("save",function(doc,next){
    // doc here is user object
    doc.sayHi()
    next()
})
module.exports=mongoose.model('User',userSchema)
// User is the collection in the DB
// then export the modal