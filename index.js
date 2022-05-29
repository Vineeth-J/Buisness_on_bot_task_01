const express = require('express')
const app = express()
const CORS = require('cors')
const pool = require('./db')

app.use(express.json())
app.use(CORS())


app.get('/branch',async function(req,res){
    const branchname = req.query.q;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    try{
        const bankdetails = await pool.query(`SELECT * FROM bankdetails where branch like '%${branchname}%' order by ifsc ASC`)
        limit && offset ? res.json((bankdetails.rows).slice(offset-1,parseInt((offset-1)+limit))) :
        limit ? res.json((bankdetails.rows).slice(0,limit-1)) : offset ? res.json((bankdetails.rows).slice(offset)) : res.json(bankdetails.rows)
    }
    catch(err){
        console.log(err);
    }
})

app.get('/search',async function(req,res){

    const q = req.query.q;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    try{
        const bankdetails = await pool.query(`select * from bankdetails where (ifsc like '%${q}%' or branch like '%${q}%' or address like '%${q}%' or city like '%${q}%' or district like '%${q}%' or statename like '%${q}%' or bankname like '%${q}%')order by ifsc ASC`)
        limit && offset ? res.json((bankdetails.rows).slice(offset-1,parseInt((offset-1)+limit))) :
        limit ? res.json((bankdetails.rows).slice(0,limit-1)) : offset ? res.json((bankdetails.rows).slice(offset)) : res.json(bankdetails.rows)
    }
    catch(err){
        console.log(err);
    }
    
})

app.listen(3000,function(){
    console.log("Server running on 3000");
})
