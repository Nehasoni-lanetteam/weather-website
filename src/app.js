const express = require('express')
const path=require('path')
const app = express()
const hbs=require('hbs')
const geocoding=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port=process.env.PORT || 4001
 
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath= path .join(__dirname,'../templates/partial')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicDirectoryPath))

app.get('/',(req, res)=>{
    res.render('index',{
        title:"Weather"
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:"abouttt"
    })
})  
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'heyyyyy'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address)
    {
        return res.send({error:"Enter the location"})
    }

    geocoding(req.query.address,(error,{location}={})=>{
        if(error){
            return res.send({error:"oops geocoding gone wrong"})
        }
        forecast(location,(error,dataf)=>{
            
            if(error){
                return res.send({error: "something went wrong with forecast"})
            }
            res.send({
                location,
                forecast:dataf,
                address:req.query.address

            })
        })
    })
    // res.send({forecast:23,location:"India"})
})

app.get('/products',(req,res)=>{
if(!req.query.search){
return res.send({error:"oops enter the location dear"
 })
}
console.log(req.query)
res.send({products:[]})
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'ERROR',
        em:'Article not found'})
})
app.get('*',(req,res)=>{
    res.render("error",{title:"not found 404 error",
    em:"opps not there"})
})

app.listen(port, ()=>{
    console.log('server')
})










// app.get('/help',(req, res)=>{
//     res.send([{
//         name:"neha"
//     },{
//         name:"nehaaa"
//     }])
// })
// app.get('/about',(req, res)=>{
//     res.send('<h1>hey from about page</h1>')
// })