const express = require('express')
const User = require('../modules/user')
const auth = require('../middle-ware/auth')

const router = express.Router()

router.post('/users', (req, res) => {
     console.log(req.body)
    const user_in = new User(req.body)
    user_in.save()
        .then((user_in) => { res.status(200).send(user_in) })
        .catch((e) => { res.status(400).send(e) })
})
///////////////////////////////////////////////////////////////////////////////////////////
// get 
router.get('/users', auth,(req, res) => {
    User.find({}).then((user_in) => {
        res.status(200).send(user_in)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
////////////////////////////////////////////////////////////////////////////////////////////
// to get by id 

router.get('/users/:id',auth , (req, res) => {
    console.log(req.params)
    const _id = req.params.id
    User.findById(_id).then((user_in) => {
        if (!user_in) {
            return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user_in)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
////////////////////////////////////////////////////////////////////////////////////////////
// patch 

router.patch('/users/:id',auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        //console.log(updates)
        const _id = req.params.id
        // const user_in = await User.findByIdAndUpdate(_id,req.body,{
        //     new:true,
        //     // res.send  القديمه 
        //     runValidators:true
        //     // مش هيطبق الشروط اللى ف الموديل 
        // })

        const user_in = await User.findById(_id)
        if (!user_in) {
            return res.status(404).send('No user is found')
        }
        updates.forEach((ele) => (user_in[ele] = req.body[ele]))
        await user_in.save()
        res.status(200).send(user_in)
        // user.age = req.body.age
        // user.username = req.body.username
        // user.city = req.body.city
        // user.password = req.body.password

        // person = {
        //     age : 26,
        //     city : "mansoura"
        // }

        // person.    //  . notation 

        // person[]  // braket notation 

        /*
            ['age' , 'password']

            user[age] = req.body[age]  

        */
         
    }
    catch (error) {
        res.status(400).send(error)
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////
// delete 

router.delete('/users/:id', auth,async (req, res) => {
    try {email
        const _id = req.params.id
        const user_in = await User.findByIdAndDelete(_id)
        if (!user_in) {
            return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user_in)
    }
    catch (e) {
        res.status(500).send(e)
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////
// // login : 
router.post('/login', async (req, res) => {
    try {
        const user_in = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ user_in , token })
    }catch (e) {
        res.status(400).send(e.message)
    }
})
///////////////////////////////////////////////////////////
//token
router.post('/user', async (req ,res)=>{
    try{ const user_in =new User(req.body)
        const token = await user_in.generateToken()
        await user_in.save()
        res.status(200).send({user_in, token})
    }catch(e){
        res.status(400).send(e)
    }
})
////////////////////////////////
//profile 
router.get('/profile', auth , async(req , res)=>{
    res.status(200).send(req.user_in)
})
/////////////////////////////////
//logout
router.delete('/logout', auth ,async(req ,res)=>{
  try{
    console.log(res.user_in)
    req.user_in.token= req.user_in.token.filter((ele)=>{
        return ele !=req.token })
        await req.user_in.save()
        res.send
  }catch(e){
    res.status(400).send(e.message)
  }  
})
/////////////////////
//logout all
router.delete('/logout', auth, async (req, res) => {
    try {
        req.user_in.token =[]
        await req.user_in.save()
        res.send
    } catch (e) {
        res.status(400).send(e.message)
    }
})
module.exports = router 