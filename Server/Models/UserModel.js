const mongoose = require('mongoose');
const validator = require("validator"); // pour la validation des mails

const userSchema = new mongoose.Schema(
    {
        userFirstName : {
            type : String,
            require : true
        },

        userLastName : {
            type : String,
            require : true
        },
        userNumberPhone : {
            type : String,
            require : true
        },
        userAddress : {
            type : String,
            require : true
        },
        userEmail : {
            type : String,
            require : true,
            validate :{
                validator : validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            }
        },
        userPassword : {
            type : String,
            require : true
        },
        userRole : {
            type : Number,  
            require : true,
        },
    },
    {timestamps:true}
);
module.exports = mongoose.model("UserSchema" , userSchema)