const express = require('express');
const mongoose = require('mongoose');
const Registerusers = require('./model');
const cors = require('cors')
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors({origin:'*'}));

//Static Files

// app.use(express.static(path.join(__dirname,'./client/build')));
// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname,'./client/build/index.html'));
// });

mongoose.connect('mongodb+srv://ramprasadboddu88:mobilicisDB@clustermobilicisdb.ei5pprr.mongodb.net/SampleDB').then(
    () => console.log("DB connection Established")
)

//Add New User Details
app.post('/addUser',async(req,res)=>{
    try {
        const {id,fast_name,last_name,email,gender,income,city,car,quote,phone_price} = req.body
        let newUser = new Registerusers({id,fast_name,last_name,email,gender,income,city,car,quote,phone_price});
        await newUser.save()
        let Data=await Registerusers.find()
        return res.json(Data[Data.length-1]);
    } catch (error) {
        return res.status(500).send('Server Error')
    }
})

// Get Last Users Data
app.get('/getLastUser',async(req,res)=>{
    try {
        let exist = await Registerusers.find();
        if (!exist){
            return res.status(400).send('Collections Empty');
        }
        const user = exist[exist.length-1]
        return res.json(user);
    } catch (error) {
        return res.status(500).send('Server Error')
    }
})

// Get All Users Data
app.get('/getAllUsers',async(req,res)=>{
    try {
        let exist = await Registerusers.find();
        if (!exist){
            return res.status(400).send('Collections Empty');
        }
        // const user = exist[exist.length-1]
        return res.json(exist);
    } catch (error) {
        return res.status(500).send('Server Error')
    }
})

// Get Specific User by Id
app.get('/allUsers/:id',async(req,res)=>{
    try {
        const user = await Registerusers.findById(req.params.id);
        return res.json(user);
    } catch (error) {
        return res.status(500).send('Server Error')
    }
})


// First Query
app.get('/Q1', async (req, res) => {
    try {
      const users = await Registerusers.find({
        income: {$lt: "$5"} ,
        car: { $in: ['BMW', 'Mercedes-Benz'] }
      }).maxTimeMS(30000);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //Second Query
  app.get('/Q2', async (req, res) => {
    try {
      const users = await Registerusers.find({
        gender:"Male",
        phone_price: {$gt: "$10000"}
      }).maxTimeMS(30000);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//Third Query
app.get('/Q3', async (req, res) => {
    try {
      const users = await Registerusers.find({
        last_name: /^M/,
        $expr: {
          $gt: [{ $strLenCP: "$quote" }, 15]
        },
        email: {
          $regex: ".*M.*",
          $options: "i"
        }
      }).maxTimeMS(30000);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//fourth Query
app.get('/Q4', async (req, res) => {
    try {
      const users = await Registerusers.find({
        $and: [
          { car: { $in: ["BMW", "Mercedes", "Audi"] } },
          { email: { $not: /\d/ } }
        ]
      }).maxTimeMS(30000);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//Fifth Query
app.get('/Q5', async (req, res) => {
    try {
      const users = await Registerusers.aggregate([
        // project a new field "incomeValue" that contains the numeric value of income
        {
          $project: {
            _id: 1,
            id: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
            gender: 1,
            income: 1,
            city: 1,
            car: 1,
            quote: 1,
            phone_price: 1,
            incomeValue: { $toDouble: { $substr: ["$income", 1, -1] } }
          }
        },
        // group by city and calculate the count and average incomeValue
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 },
            avgIncome: { $avg: "$incomeValue" }
          }
        },
        // sort by count in descending order and limit to top 10
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]);
    //   console.log(users);
      res.json(users);

    // const groupedByCity = await Registerusers.reduce((acc, curr) => {
    //     const city = curr.city;
    //     if (acc[city]) {
    //       acc[city].push(curr);
    //     } else {
    //       acc[city] = [curr];
    //     }
    //     return acc;
    //   }, {});
      
    //   const cityStats = Object.entries(groupedByCity).map(([city, cityUsers]) => {
    //     const totalIncome = cityUsers.reduce((acc, curr) => acc + curr.income, 0);
    //     const avgIncome = totalIncome / cityUsers.length;
    //     return { city, avgIncome };
    //   });
      
    //   const top10Cities = cityStats.sort((a, b) => b.avgIncome - a.avgIncome).slice(0, 10);

    //   res.json(top10Cities);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

// Delete Specific User by Id
app.delete('/deleteUser/:id',async(req,res)=>{
    try {
        await Registerusers.findByIdAndDelete(req.params.id);
        const user = await Registerusers.find();
        return res.json(user[user.length-1]);
    } catch (error) {
        return res.status(500).send('Server Error')
    }
})


app.listen(5000,()=>{
    console.log('Server running at port 5000....');
})

  