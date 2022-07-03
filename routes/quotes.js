const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { isAuthorised } = require('../middlewares')

//fetch quotes data
// router.get('/',(req,res)=>{
//     const data = JSON.parse( fs.readFileSync(path.join(path.resolve(),'data.json'),{encoding:'utf-8'}) )
//     console.log(path.relative())
//     res.send(data)
// })
router.get('/',isAuthorised,(req,res)=>{
    fs.readFile(path.join(path.resolve(),'data.json'),'utf-8',(err,data)=>{
        res.send(data)
        console.log("Data fetch successfully.")
    })
})
//fetch quotes by id
router.get('/:quoteId',(req,res)=>{
   try {
    let { quoteId } = req.params
    console.log(quoteId)
    const data = JSON.parse( fs.readFileSync(path.join(path.resolve(),'data.json'),{encoding:'utf-8'}) )
    // console.log(data)
    const quotes = data.find(data=>data.id == quoteId )
    console.log(quotes)
    if(quotes){
        res.send(quotes)
    }
    else{
        res.status(500).send('Quote not found enter valid id')
        console.log('Quote not found enter valid id')
    }
   } catch (error) {
    res.send(error.message)
   }
})
//add the quote in data.json
router.post('/',(req,res)=>{
    try {
        const data = req.body
    const quotess = JSON.parse( fs.readFileSync(path.join(path.resolve(),'data.json'),{encoding:'utf-8'}) )
    const quote={
        id: quotess[quotess.length -1].id + 1,
        ...data
    }
    fs.writeFileSync(path.join(path.resolve(),'data.json'),JSON.stringify([...quotess,quote]))
    res.send(quote)
    } catch (error) {
        res.send(error.message)
    }
})

//delete quotes by id
router.delete('/:id',(req,res)=>{
    const {id} = req.params
    const quotess = JSON.parse( fs.readFileSync(path.join(path.resolve(),'data.json'),{encoding:'utf-8'}) )
    const quotes = quotess.filter(data=>data.id !=id);
    fs.writeFileSync(path.join(path.resolve(),'data.json'),JSON.stringify([...quotes]))
    res.send(quotes)
})
//update the data of quotes
router.put('/:quoteId',(req,res)=>{
    try {
        const { quoteId } = req.params
    const quoteData = req.body
    // console.log(quoteData)
    const quotes = JSON.parse( fs.readFileSync(path.join(path.resolve(),'data.json'),{encoding:'utf-8'}) );
    // console.log(quotes)
    const newQuotes = quotes.map((todo)=>{
        // console.log(todo)
        if(todo.id == quoteId){
            return{
                ...todo,
                ...quoteData,
            }
        }
        else{
            return todo
        }
    });
    console.log(newQuotes)
    fs.writeFileSync(path.join(path.resolve(),'data.json'),JSON.stringify([...newQuotes]))
    res.send(newQuotes)
    console.log('Hello I m put request')
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router