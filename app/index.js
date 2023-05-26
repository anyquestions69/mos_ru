const express = require('express')
require("dotenv").config();
const categoryRouter = require('./routers/categoryRouter.js')
const groupRouter = require('./routers/groupRouter.js')
const viewRouter = require('./routers/staticRouter.js')
const hbs = require('hbs')
var cookieParser = require('cookie-parser');
const jsonParser = express.json();
const api = express.Router()
var cors = require('cors')


const app = express()

app.set("view engine", "hbs");
app.set("views", __dirname+"/views/templates")
hbs.registerPartials(__dirname + "/views/templates/partials");

app.use(cors({origin:'*'}))  
app.use(cookieParser());
app.use(jsonParser)
app.use("/static",express.static(__dirname + "/views/static"))


api.use('/categories', categoryRouter)
api.use('/groups', groupRouter)


app.use('/api', api)
app.use('/', viewRouter)

app.listen(3000,()=>{
    console.log('works')
})