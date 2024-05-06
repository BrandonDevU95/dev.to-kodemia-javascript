import { users } from '../seedDB.js';

const USERS_BASE_URL =
	'https://kodemia-devto-default-rtdb.firebaseio.com/users';

const createUsersDB = () => {
	users.forEach(async (user) => {
		await createUser(user);
	});
	console.log('Users DB Success');
};

const verifyUsersDB = async () => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	return data;
};

const createUser = async (userObject) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`, {
		method: 'POST',
		body: JSON.stringify(userObject),
	});
	let data = await response.json();
	return data;
};

const getAvatarByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user].avatar;
};

export { createUsersDB, verifyUsersDB, createUser, getAvatarByUsername };
