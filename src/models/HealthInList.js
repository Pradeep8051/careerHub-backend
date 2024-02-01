const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // firstname:{
    //     type:String,
    //     required: true,
    //     min: 3,
    //     max: 20
    // },
    // lastname:{
    //     type:String,
    //     required: true,
    //     trim: true,
    //     min: 3,
    //     max: 20
    // },
    // email:{
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    // },
    name:{
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    // hash_password:{
    //     type: String,
    //     required: true,
    // },
    type:{
        type: String,
        // enum:['user','admin'],
        default: 'Health'
    },
    // contact:{
    //     type: Number
    // },
    // profilepic:{ type: String}
},{ timestamps: true});

// userSchema.virtual('password').set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

// userSchema.virtual('fullname').get(function(){
//     return `${this.firstname} ${this.lastname}`;
// });

// userSchema.methods = {
//     authenticate: async function(password){
//         return await bcrypt.compare(password, this.hash_password)
//     }
// };

module.exports = mongoose.model('industriesList', userSchema);