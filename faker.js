import { connection } from './connection.js';

connection();

const args = process.argv;

console.log(args);

const fakerFile = args[2];
const limit = args[3] || 10;
const faker = await import(`./faker/${fakerFile}`);
faker.run(limit);
