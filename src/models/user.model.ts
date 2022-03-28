import { sequelize} from '../util/database';
var Sequelize = require("sequelize");
const User = sequelize.define("users", {
    firstName: {
      type: (Sequelize as any)["STRING"]
    },
    lastName: {
      type: (Sequelize as any)["STRING"]
    }
  });  
export {User}

