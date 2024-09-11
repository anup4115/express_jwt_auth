import userController from "../userController/userController.js";

import express from 'express'

const router=express.Router()
router.post('/signup',userController.register_user)
router.post('/login',userController.login_user)

export default router