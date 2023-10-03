const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors=require("cors");
const userModel = require("./Models/userModel");
const empModel = require("./Models/empModel");
const PORT = process.env.PORT || 9000
require("dotenv").config();

mongoose.set('strictQuery', false);


const app = express();
app.use(express.json())

app.use(
  cors({
    origin: 'https://mongo-crud-8c22.vercel.app',
  })
);


mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is Connected..")
  }).catch(err => {
    console.log(err.message);
  })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected!');
});
//==================> User <=======================
app.post('/api/user/register', async (req, res) => {
  try {
    let Body = req.body;
    const { email, password } = Body;



    //==================> Email validation <=======================
    if (!Body.email) {
      return res.status(400).json("Please enter email");
    }
    const Emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let Email = Emailregx.test(Body.email);
    if (!Email) {
      return res.status(400).json("Please enter valid email.");
    }

    //<===================
    const dublicateEmail = await userModel.findOne({ email: email });
    if (dublicateEmail) {
      return res.status(400).json(" Email Already Exists");
    }



    //==================> password validation <=======================
    if (!Body.password) {
      return res.status(400).json("Please enter password");
    }
    const Passregx =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,}$/;
    let Password = Passregx.test(Body.password);
    if (!Password) {
      return res
        .status(400)
        .json(
          "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
        );
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let savedData = await userModel.create(Body);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
);
//==================> GET Users <=======================
app.get('/api/user/get', async (req, res) => {
  try {
    let data = req.body
    let {email,password} = data
    let getUsers = await userModel.find();
    return res.status(200).json(getUsers)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
);
//==================> Login user <=======================

app.post('/api/user/login', async (req, res) => {
  try {
    let Body = req.body;
    const { email, password } = Body;

    if (!email) {
      return res.status(400).json("Please enter email address");
    }

    if (!password) {
      return res.status(400).json("Please enter password");
    }

    let getUser = await userModel.findOne({ email });
    if (!getUser) return res.status(401).json("Email or Password is incorrect.");

    let matchPassword = await bcrypt.compare(password, getUser.password);
    if (!matchPassword) return res.status(401).json("Email or Password is incorrect.");

    //token

    const token = jwt.sign(
      {
        userId: getUser._id.toString(),
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json(token);

  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//==================> Update user <=======================
app.put('/api/user/update', async (req, res) => {
  try {
    let body = req.body

    const updatedUser = await userModel.updateOne({ _id: req.params.id }, { $set: body })
    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//==================> Delete user <=======================
app.delete('/api/user/delete', async (req, res) => {
  try {

    const deletedUser = await userModel.deleteOne({ _id: req.params.id })
    return res.status(200).json(deletedUser)

  } catch (error) {
    return res.status(500).json(error.message);
  }
})


//==================> Employee <=======================

//==================> Register <=======================

app.post('/api/emp/register',async(req,res)=>{
  let Body =req.body;
  try{
    let savedData = await empModel.create(Body);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
})
//==================>Emp get <=======================

app.get('/api/emp/get', async (req, res) => {
  try {
    let data = req.body
   
    let getEmps = await empModel.find();
    return res.status(200).json(getEmps)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
