const express = require("express");
const categoryController = require("../controllers/categoryController.js");
const categoryRouter = express.Router();
 

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get('/:id', categoryController.getOne)
 
module.exports = categoryRouter;