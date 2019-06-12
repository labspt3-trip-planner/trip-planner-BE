const faker = require('faker');

const User = {
	email: faker.internet.email(),
	password: faker.internet.password()
};
const a = new Array(500)
	.fill(null)
	.map(a => (e = faker.fake('{{internet.email}}, {{internet.password}}')));
console.log(a);

module.exports = User;
