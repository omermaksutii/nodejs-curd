import { User} from '../models/user.model';
interface IUser {
    firstName: string;
    lastName: string;
  }
const getHome=(async (request:any, response:any)=> {
  return response.sendFile("/sandbox/public/index.html");
  });

const getInitdata=(async (req:any, res:any) => {
    await User.sync({ force: true }); // Force drop table if already exists
    console.log(req.body)
    const firstname=req.body.firstName
    const lastname=req.body.lastName
     await User.create({
      firstName:firstname,
      lastName:lastname
  })
  return res.json("Completed Data Initialization");
  });

 const getUsers=(async (req:any, res:any) => {
    await User.sync();
    const users = ((await User.findAll()) as any) as IUser[];
    return res.json(users);
  });

  const deleteUser=(async (req:any, res:any) => {
    const userid=req.params.id
    const existingUsers = await User.findOne({
      where: {
        _id:userid
      }
    });
    if (!existingUsers) {
      return res.json("User doesn't exist with this id");
    } 
    await User.destroy({
      where: {
      _id:userid
      }
    });
    return res.json(`user with id ${userid} deleted`);
  });

  const addUser=(async (req:any, res:any) => {
    await User.sync();
    const firstname=req.body.firstName
    const lastname=req.body.lastName
    const existingUser = await User.findOne({
      where: {
        firstName: firstname,
        lastName: lastname
      }
    });
    if (existingUser) {
      return res.json("User already exists");
    } else {
      await User.create({
        firstName:firstname,
        lastName:lastname
    })
    return res.json(`Created user ${firstname} ${lastname}`);
    }
  });
const updateUser=(async (req:any, res:any) => {
  const userid=req.params.id
  const firstname=req.body.firstName
  const lastname=req.body.lastName
      await User.sync();
      const existingUsers = await User.findOne({
        where: {
          _id:userid
        }
      });
      console.log(existingUsers)
      if (!existingUsers) {
        return res.json("User doesn't exist with this id");
      } 
      else {
          await User.update(
          {
            firstName: firstname,
            lastName: lastname
          },
          { where: { _id: userid } })
     
      return res.json("user information updated!") 
      }
    }
  );  

  export{getHome,addUser,getInitdata,deleteUser,updateUser,getUsers}