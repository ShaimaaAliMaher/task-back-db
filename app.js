
//   const  mongoose = require ('mongoose')

//   mongoose.connect('mongodb://127.0.0.1:27017/lec-10')


//   const Car = mongoose.model('Car' , { type : String })

//   const car1 = new Car ({type : "audi"})

//   car1.save()
//   .then(() => console.log('car added'))

//   ////////////////////////////////////////////////////////////////////
//  app.get ('/' , (req,res) => {
//     res.send("shaimaa")
//  })
//////////////////////////////////////////////////////////////////////
require('./db/mongoose')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// to parse automatically
app.use(express.json())
const userRouter = require("./routers/users")
app.use(userRouter)
app.listen(port, () => { console.log("All Done Successfully") })
///////////////////////////////////////////

//    const  bcryptjs = require ("bcryptjs")
//    const  passwordFunction =  async () => {
//       const  password = "is258369"
//       const hashedPassword = await bcryptjs.hash ( password , 8)
//       console.log(password)
//       console.log(hashedPassword)

//       const compare = await  bcryptjs.compare ("is28369"  , hashedPassword)
//       console.log(compare)
//    }
//    passwordFunction()

/////////////////////////////////////////////////////////////////////////
//token ..
//  const jwt = require("jsonwebtoken")
//  const mytoken= ()=>{
//     const token= jwt.sign({_id:"123456789"} ,"islam500")
//     console.log(token)
//     const tokenVerify =jwt.verify(token ,"islam500")
//     console.log(tokenVerify)
//  }
//  mytoken()
