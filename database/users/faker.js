const faker = require('faker');

const User = {
	email: faker.internet.email(),
	password: faker.internet.password()
};
const a = new Array(500)
  .fill(null)
  .map(e => (e = faker.fake("{{internet.email}}, {{internet.password}}")));
console.log(User);


module.exports = User;
