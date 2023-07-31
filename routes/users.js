const controller = require('../controllers/usercontroller');
const express = require('express');
const router = express.Router();
const path = require('path');
let data = require('../controllers/usercontroller').data;

router.get('/',(req,res)=>{
    res.json({Success:true,message:"Homepage",data:data});
});
router.post('/',controller.createuser);
router.get('/:id',controller.getUser);
router.delete('/:id',controller.deleteUser);
router.patch('/:id',controller.updateUser)

module.exports={router};