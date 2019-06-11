const faker = require('faker');

const fakeUsersAmount = 500;

const User = {
    email: faker.internet.email(),
    password: faker.internet.password()
}


const generateUsers = () => {
    let arr = [];

    for(let i = 0; i < fakeUsersAmount; i++) {
        arr.push({
            username: faker.internet.email(),
            password: faker.internet.password()
        })
    }
}
console.log(generateUsers);

module.exports = User;