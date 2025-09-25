const mongoose = require("mongoose")

module.exports.connect = async () =>{
  try {
    await mongoose.connect(process.env.URL_MONGO)
    console.log("connect success");
  } catch (error) {
    console.log("connec error");
  }
}