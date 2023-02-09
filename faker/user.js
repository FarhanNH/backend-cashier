import User from '../models/User.js';
import { faker } from '@faker-js/faker';

const run = async (limit) => {
  try {
    let data = [];
    for (let i = 0; i < limit; i++) {
      data.push({
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }

    const fakeData = await User.insertMany(data);
    if (fakeData) {
      console.log(fakeData);
      console.log('Total data : ' + fakeData.length);

      process.exit();
    }

    //SINGLE DATA
    // const user = new User({
    // fullname: faker.name.fullName(),
    // email: faker.internet.email(),
    // password: faker.internet.password(),
    // });
    //   const newUser = await user.save();
    //   if (newUser) {
    //     console.log(newUser);
    //   }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export { run };

//EKSEKUSI COMMAND LINE node faker 'user.js'
//EKSEKUSI COMMAND LINE node faker 'user.js' 100
