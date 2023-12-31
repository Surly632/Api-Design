const express = require('express');
const router = express.Router();
const path = require('path');
const util = require('util')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let data = require('../user');
const { type } = require('os');

const filepath = path.join(path.resolve(__dirname,'..'),'/user.json');

function createuser(req,res) {
 
    let data_ = req.body;
     const id = uuidv4();
     data_={id,...data_};

     let ok = data.every((single)=>{
        if(single.firstname==data_.firstname && single.lastname==data_.lastname && single.age==data_.age)
         return false;
     return true;
     })

     console.log(ok);
     
    if(ok) {
     data.push(data_); 
     const newdata= JSON.stringify(data,null,3);  
     /* we can replace null using a replacer:
       exmaple:
       let space = 3;
       JSON.stringify( data,['firstname','age','lastname','id'], space);
       it would be: 
       {
        "firstname":"something",
        "age":someage,
        "lastname":"something",
        "id":someid
       }
     */
     fs.writeFileSync(filepath, newdata, { flag: 'w', encoding: 'utf-8'},()=>{})
     res.send(newdata);
    }
    else{
        res.send(data);
    }
}

function getUser(req,res){
    const id = req.params.id;
    const person = data.find((single)=>{return single.id===id});
    console.log(id);
  if(person) {
     res.json(person);
  }
  else
   res
   .status(404)
   .json({success:false,message:"User Not Found"});
}

function deleteUser(req,res){
    const id = req.params.id;
    const newdata = data.filter((person)=> id!==person.id);
    const persons = JSON.stringify(newdata,null,3);
    if(newdata.length===data.length) {
       res.json({success:false,message:"User does not exist!"});
       return;
    }
    fs.writeFile(filepath,persons,{flag:'w',encoding:'utf-8'},()=>{});
    const deleteduser = data.find((person)=>id==person.id);
    res.json({success:true,message:"The user was deleted successfully",person:deleteduser});
}

function updateUser(req,res){
    const id = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const person = data.find((person)=>id===person.id);
    const newdata = data.filter((person)=>person.id!==id);
    newdata.push(person);
    if(person && firstname) person.firstname = firstname ;
    if(person && lastname) person.lastname = lastname ;
    if(person && age) person.age = age;

    const users = JSON.stringify(newdata,null,3);

    fs.writeFile(filepath,users,{flag:'w',encoding:'utf-8'},()=>{});
    res.json({success:true,message:"Updated successfully",person:person});
}

module.exports={createuser,getUser,deleteUser,updateUser};