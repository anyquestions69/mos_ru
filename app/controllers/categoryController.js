const {Activity ,Category, User} = require('../models/user')
const { Op } = require("sequelize");

class Manager{
    async getCategories(req,res) {  
        
            let result = await Category.findAll()
            return res.send(result)
       
    }
   
    async getOne(req,res){
        let cat = await Category.findOne({where:{id:req.params['id']}})
        return res.send(cat)
    }
    
    async postCategory(req,res){
        if (!req.body.name)return res.status(409).send("Введите название");
        let category = {
            name:req.body.name
        }
        let result = await Category.create(category)
        return res.send(result)
    }
   
}
let manager = new Manager()
module.exports = manager