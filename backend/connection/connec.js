const mongoose=require('mongoose');
mongoose.set('strictQuery',false)

async function getConnection(){
    await mongoose.connect('mongodb+srv://Ugramraju:Ugram1182@cluster0.fxlcb2l.mongodb.net/?retryWrites=true&w=majority');
}
module.exports=getConnection;