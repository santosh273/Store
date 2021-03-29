const exp = require("express");
const asynchandler = require("express-async-handler");

const activityApiObj = exp.Router();

const Activity = require("../Models/Activity");

activityApiObj.post("/addactivity",asynchandler(async(req,res,next)=>{

    activityObj = req.body;

    newActivity = new Activity({
        username : activityObj.username,
        id : activityObj.id,
        title : activityObj.title,
        activity : activityObj.activity
    })

    await newActivity.save();
    res.send({message:"activity added successfully"});
}))

activityApiObj.get("/getactivities/:username",asynchandler(async(req,res,next)=>{
    let username =  req.params.username;
    let activities = await Activity.find({username:username});
    res.send({message:activities});

}))

activityApiObj.delete("/deleteactivity/:id",asynchandler(async(req,res,next)=>{
    let id = req.params.id;
    await Activity.remove({id:id});
    res.send({message:"activity deleted successfully"});
}))

activityApiObj.post("/updateactivity",asynchandler(async(req,res,next)=>{
    activityObj = req.body;
    await Activity.updateOne({id:activityObj.id},{title:activityObj.title,activity:activityObj.activity});
    res.send({message:"activity updated successfully"});
}))

module.exports = activityApiObj;