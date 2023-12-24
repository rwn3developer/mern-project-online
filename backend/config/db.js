const mongoose = require('mongoose')

const connectDb = async () => {
  try{
    const con = await mongoose.connect(process.env.MOMGO_URL);
    console.log(`Connect Mongodb ${con.connection.host}`);
  } catch(err){
    console.log(`Error in Mongodb ${err}`);
  } 
}

module.exports = {
    connectDb
}