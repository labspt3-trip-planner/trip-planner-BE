const faker = require('faker');

const User = {
	email: faker.internet.email(),
	password: faker.internet.password()
};
const a = new Array(500)
  .fill(null)
  .map(e => (e = faker.fake("{{internet.email}}, {{internet.password}}")));

  // add a console.log for a to generate 500 users in the console and Postman


module.exports = a;
