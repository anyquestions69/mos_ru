const Sequelize = require("sequelize");
const sequelize = require('../config/database')


const Visitor = sequelize.define('visitor',{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    ip:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Role = sequelize.define("role",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const User = sequelize.define("user", {
    uid: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    createdAt:{
      type:Sequelize.TEXT,
      allowNull:true
    },
    gender:{
      type:Sequelize.STRING,
      allowNull: true
    },
    birthdate:{
      type:Sequelize.STRING,
      allowNull: true
    },
    address:{
      type:Sequelize.TEXT,
      allowNull: true
    }
  },{
    timestamps: false
  });

  const Activity = sequelize.define('activity',{
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desc: {
        type:Sequelize.TEXT,
        allowNull:true
      }
  },{
    timestamps: false
  })
  const Category = sequelize.define('category',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type:Sequelize.STRING,
        allowNull:true
      }
  },{
    timestamps: false
  })


const Group = sequelize.define('group',{
  id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
  },
  cat_1:{
    type:Sequelize.STRING,
    allowNull:true
  },
  cat_2:{
    type:Sequelize.STRING,
    allowNull:true
  },
  activity:{
    type:Sequelize.STRING,
    allowNull:true
  },
  address:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  okrug:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  district:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  inPerson:{
    type:Sequelize.BOOLEAN,
    allowNull:true
  },
  schedule:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  schedule_1:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  schedule_2:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  status:{
    type:Sequelize.STRING,
    allowNull:true
  }

},{
  timestamps: false
})



sequelize.sync({force: false}).then(async function (result){


    
})
.catch(err=> console.log(err));

module.exports = {User, Activity, Visitor, Group, Category}