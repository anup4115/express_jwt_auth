import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
class userController{
    static register_user=async(req,res)=>{
        const {name,email,password,password_confirmation,tc}=req.body
        const user=await userModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"User with the email already exists."})
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    const salt= await bcrypt.genSalt(10)
                    const hashpassword=await bcrypt.hash(password,salt)
                    try{
                        const userDocument=new userModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                            tc:tc,
                        })
                        await userDocument.save()
                        
                        const saved_user=await userModel.findOne({email:email})

                        const token=jwt.sign({userID:saved_user._id},process.env.SECRET_KEY,{expiresIn:('15d')})
                        res.send({"status":"success","message":"Registration successful","token":token})
                    }catch(error){
                        res.send({"status":"failed","message":"Unable to register"})
                    }

                }else{
                    res.send({"status":"failed","message":"Password doesn't match with Confirm Password"})
                }
            }else{
                res.send({"status":"failed","message":"Please enter all credentials"})
            }
        }
        
    }
    static login_user=async(req,res)=>{
        try{
            const {email,password}=req.body
            if(email && password){
                const user=await userModel.findOne({email:email})
            if(user !=null){
                const isMatch=await bcrypt.compare(password,user.password)
                if((user.email===email) && isMatch){
                    const token=jwt.sign({userID:user._id},process.env.SECRET_KEY,{expiresIn:('15d')}) 
                    res.send({"status":"success","message":"Login Successful","token":token})
                }else{
                    res.send({"status":"failed","message":"Email or Password is wrong"})
                }
            }else{
                res.send({"status":"failed","message":"User doesn't exist, Please register"})
            }

            }else{
                res.send({"status":"failed","message":"Invalid email or passsword"})
            }
            
        }catch(error){
            res.send({"status":"failed","message":"Unable to login"})
        }
    }
}

export default userController