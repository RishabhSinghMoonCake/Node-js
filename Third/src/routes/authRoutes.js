import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'


const router = express.Router()
const salt = 8
//register user enpoint /auth/register
router.post('/register' , async (req,res)=>{
  const {username, password} = req.body
  

  //encrypt the password
  const hashedPassword = bcrypt.hashSync(password,salt)

  //save data in db
  try {
    const user = await prisma.user.create({
      data:{
        username,
        password:hashedPassword
      }
    })

    //now that we have our user, add their first todo
    const defaultTodo = `hello :) add your first todo`
    await prisma.todo.create({
      data:{
        task:defaultTodo,
        userId:user.id
      }
    })

    //create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'})
    res.json({token})
  } catch (error) {
    console.log(error.message)
    res.sendStatus(503)
  }

 
})

router.post('/login', async (req,res)=>{ 
  const {username, password} = req.body

  try{
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if(!user)
    {
      return res.status(404).send({message:'User not Found'})
    }
    
    const passwordIsValid = bcrypt.compareSync(password,user.password)
    if(!passwordIsValid)
    {
      return res.status(401).send({message:'Invalid Password'})
    }
    //Now its a successul authentication approved
    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:'24h'})
    res.json({token})
  }
  catch(error)
  {

    res.sendStatus(503)
  }
})

export default router