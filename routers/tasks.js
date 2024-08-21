const express = require('express')
const Task = require('../modules/task')
const auth = require('../middle-ware/auth')
// const { findByIdAndDelete } = require('../models/user')
const router = express.Router()

router.post('/task',auth ,async(req,res)=>{
    try{
    //    const task= new Task (req.body)
        const task = new Task({ ...req.body, owner: req.user._id })
        await task.save()
        res.status(200).send(task) 
    } catch(e){
        res.status(400).send(e.message)
    }
})
router.get('/task', auth, async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})
router.get('/task/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findById(req.params.id)
         const task = await Task.findOne({ _id: id, owner: req.user._id })
        const _id = req.params.id
       if (!task) {
            return res.status(404).send('unable to reach to task')
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})
router.patch('/task/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndUpdate({_id},req.body ,{
            new: true,
            runvalidators: true 
        })
        if (!task) {
            return res.status(404).send('no task')
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})
router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id)
        if (!task) {
            return res.status(404).send('no task found')
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})


       


module.exports = router 