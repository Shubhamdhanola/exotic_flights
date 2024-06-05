import mongoose from "mongoose";

const connection = {};

async function dbConnect(){
  if (connection.isConnected) {
    console.log("Already Connected To Database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connection established successfully");
  } catch (error) {
    console.log("Failed to connect Database");
    process.exit(1);
  }
}

export default dbConnect;
