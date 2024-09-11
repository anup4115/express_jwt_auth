import mongoose from 'mongoose';

const connectDB=async(DB_URI)=>{
    try{
        const DB_OPTIONS={
            dbName:'JWT_Auth_DB'
        }
        await mongoose.connect(DB_URI,DB_OPTIONS)
        console.log("Connected...")
    }catch(error){
        console.log(error)
    }
}
export default connectDB