const mongoose=require("mongoose");

//define User or Author schema
const userAuthorSchema = new mongoose.Schema({
    role:{
        type:String,
        require:true,
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        //require:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    profileImageUrl:{
        type:String,
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{"strict":"throw"})


//create model fro user author schema
const UserAuthor = mongoose.model('userauthor',userAuthorSchema)

//export
module.exports=UserAuthor;