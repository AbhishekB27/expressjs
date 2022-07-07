const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { validateEmpoyee } = require('../middlewares');
const { isAuthorised } = require('../middlewares');
const { route } = require('./auth');

const employees =JSON.parse( fs.readFileSync(path.join(path.resolve(),'employee.json'),{encoding:'utf-8'}));
router.get('/',isAuthorised,(req,res)=>{
        console.log('Data Fetched Successfully.')
        res.status(200).send(employees)
        console.log(employees.length)
});
//get employee by id
router.get('/:id',(req,res)=>{
    const empId = req.params.id
    if(empId > employees[employees.length - 1].id){
        res.status(401).send('Employee does not exist.')
    }
    const employee = employees.find(data=>data.id == empId)
    res.send(employee)
    // console.log(employees[employees.length - 1].id)
});
//add employee
router.post('/',validateEmpoyee,(req,res)=>{
    const employee = req.body
    const newEmp = {
        id: employees.length === 0 ? 1 : employees[employees.length - 1].id + 1,
        ...employee
    }
    fs.writeFile('employee.json',JSON.stringify([...employees,newEmp]),(err)=>{
        if(err){
            res.status(401).send(err.message)
        }
        console.log('1 Employee Successfully Added.')
        fs.readFile('employee.json',(err,data)=>{
            if(err){
                res.status(401).send(err.message)
            }
            res.status(200).send(data)
        })
    })
});
router.put('/:id',(req,res)=>{
    const empId = Number(req.params.id)
    const emp = req.body
    const employee = employees.find(data=>data.id === empId)
    const empIndex = employees.indexOf(employee)
    console.log(empIndex)
    
    const updatedEmp = {
        ...employee,
        ...emp,
    } 
    employees[empIndex] = updatedEmp;
    fs.writeFile('employee.json',JSON.stringify([...employees]),(err)=>{
        if(err){
            res.status(401).send(err.message)
        }
        fs.readFile('employee.json',(err,data)=>{
            if(err){
                res.status(401).send(err.message)
            }
            res.status(200).send(data)
        })
        console.log('Data Updated Successfylly.')
    })
});
//delete employee by id 
router.delete('/:id',(req,res)=>{
    const empId = Number(req.params.id);
    const updatedEmp = employees.filter(data=>data.id !=empId)
    // console.log(updatedEmp)
    if(!employees.find(data=>data.id === empId)){
        res.status(401).send('Employee Does not exist.')
    }
    else{
        fs.writeFile('employee.json',JSON.stringify([...updatedEmp]),(err)=>{
            if(err){
                res.status(401).send(err.message)
            }
            console.log('Employee Deleted Successfully.')
            res.send(updatedEmp)
        })
    }
})
module.exports = router;