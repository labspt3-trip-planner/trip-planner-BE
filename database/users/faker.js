const faker = require('faker');

const User = {
    email: faker.internet.email(),
    password: faker.internet.password()
}
console.log(User);

module.exports = User;