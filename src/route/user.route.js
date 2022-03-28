const express = require('express');
const router = express.Router();
import { getHome,getInitdata,getUsers,deleteUser,addUser,updateUser} from "../controller/user.controller";
router.post('/initdata', getInitdata)
router.get('/users', getUsers)
router.delete('/deleteuser/:id',deleteUser)
router.post('/adduser', addUser)
router.put('/updateuser/:id',updateUser)
router.get('/', getHome)

export{router}