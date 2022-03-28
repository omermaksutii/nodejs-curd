import { sequelize} from '../util/database';
var Sequelize = require("sequelize");
const User = sequelize.define("users", {
  _id:{
    type:(Sequelize as any).INTEGER,
    allowNull:false,
    primaryKey: true,
    autoIncrement: true,
    },
    firstName: {
      type: (Sequelize as any)["STRING"],
      allowNull:false,
      unique:true
    },
    lastName: {
      type: (Sequelize as any)["STRING"],
      allowNull:false,
      unique:true
    }
  });  
export {User}

