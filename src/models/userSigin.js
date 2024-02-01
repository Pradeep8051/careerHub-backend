const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        min: 3,
        max: 20
    },   
    role:{
        type:String,
        required: true,
        enum:['employee','employer'],
        trim: true,
    },
    mobile:{
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address:{
        type: String,
        required: true,
        trim: true,
    },
    location:{
        type: String,
        required: true,
        trim: true,
    },
    city:{
        type: String,
        required: true,
        trim: true,
    },
    district:{
        type: String,
        required: true,
        trim: true,
    },
    state:{
        type: String,
        required: true,
        trim: true,
    },
    pincode:{
        type: Number,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    hash_password:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        enum:['user','employer'],
        default: 'user'
    },
    profileimg:{ type: String}
},{ timestamps: true});

// userSchema.virtual('password').set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

// userSchema.virtual('fullname').get(function(){
//     return `${this.firstname} ${this.lastname}`;
// });

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password)
    }
};

module.exports = mongoose.model('user', userSchema);