import { User} from '../models/user.model';
interface IUser {
    firstName: string;
    lastName: string;
  }
const getHome=(async (request:any, response:any)=> {
    response.sendFile("/sandbox/public/index.html");
  });

const getInitdata=(async (req:any, res:any) => {
    await User.sync({ force: true }); // Force drop table if already exists
  
    const usersWrite = [
      ["John", "Hancock"],
      ["Liz", "Smith"],
      ["Ahmed", "Khan"]
    ];
    await User.bulkCreate(
      usersWrite.map(([firstName, lastName]) => ({ firstName, lastName }))
    );
  
    res.send("Completed Data Initialization");
  });

 const getUsers=(async (req:any, res:any) => {
    await User.sync();
    const users = ((await User.findAll()) as any) as IUser[];
    res.jsonp(users);
  });

  const getDeleteuser=(async (req:any, res:any) => {
    const first = req.params.first;
    const last = req.params.last;
    await User.sync();
    await User.destroy({
      where: {
        firstName: first,
        lastName: last
      }
    });
    res.send(`Deleted user ${first} ${last}`);
  });

  const getAddUser=(async (req:any, res:any) => {
    const first = req.params.first;
    const last = req.params.last;
    await User.sync();
  
    const existingUser = await User.findAll({
      where: {
        firstName: first,
        lastName: last
      }
    });
    if (existingUser && existingUser.length > 0) {
      res.send("User already exists");
    } else {
      await User.create({
        firstName: first,
        lastName: last
      });
      res.send(`Created user ${first} ${last}`);
    }
  });
const getUpdateuser=(async (req:any, res:any) => {
      const first = req.params.first;
      const last = req.params.last;
      const modifyFirst = req.params.modifyFirst;
      const modifyLast = req.params.modifyLast;
  
      await User.sync();
      const existingUsers = await User.findAll({
        where: {
          firstName: first,
          lastName: last
        }
      });
      if (!existingUsers || existingUsers.length === 0) {
        res.send("User doesn't exisft");
      } else {
        const u = existingUsers[0];
        u.firstName = modifyFirst;
        u.lastName = modifyLast;
        u.save();
      }
    }
  );  

  export{getHome,getAddUser,getInitdata,getDeleteuser,getUpdateuser,getUsers}