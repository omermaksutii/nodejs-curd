const express = require('express');
const router = express.Router();
import { getHome,getInitdata,getUsers,getDeleteuser,getAddUser,getUpdateuser} from "../controller/user.controller";
router.get('/initdata', getInitdata)
router.get('/users', getUsers)
router.get('/deleteuser/:first/:last', getDeleteuser)
router.get('/adduser/:first/:last', getAddUser)
router.get('/updateuser/:first/:last/:modifyFirst/:modifyLast',getUpdateuser)
router.get('/', getHome)

export{router}