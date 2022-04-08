require('dotenv').config();
const mongoose = require('mongoose');

/*
const MONGODB_URI="mongodb+srv://UserDB:Kinlough123@cluster0.42sqf.mongodb.net/FYP?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI)

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo yeahhh !");
})
*/

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected");
}).catch((err) => console.log(err));