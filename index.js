console.log("Hello I m ExpressJs")
const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("<h1 style='color:limegreen'>Hello This Is Home Page.</h1>")
});

app.get('/about',(req,res)=>{
    res.send("<h1 style='color:lawngreen'>Hello This Is About Page.</h1>")
})
app.get('/contact',(req,res)=>{
    res.send([{id:001,
               street:'prashad farm road, Nakraunda',
               city:'Dehradun',
               state:'Uttarakhand',
               mobile_no:0987654321
              },
              { id:002,
                street:'gularghati road, Balawala',
                city:'Dehradun',
                state:'Uttarakhand',
                mobile_no:0987654675
               }])
})
app.listen(8080)
