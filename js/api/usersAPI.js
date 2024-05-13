import { insertUserRecord } from '../firebase/database.js';
import { showToast } from '../components/toast.js';
import { signUpFirebase } from '../firebase/auth.js';

const USERS_BASE_URL =
	'https://kodemia-devto-default-rtdb.firebaseio.com/users';
const USER = 'user';

const createUsersDB = (users) => {
	users.forEach(async (user) => {
		const userRecord = await signUpFirebase(user);
		if (!userRecord) return;
		insertUserRecord(userRecord.user.uid, user);
	});
	showToast('Users DB created successfully', 'success');
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

const getUserByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user];
};

const getAvatarByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user].avatar;
};

const getAboutUserByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user].acerca;
};

const getNameByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user].name;
};

const getAllAvatarUsers = async () => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let avatars = keys.map((key) => {
		return {
			username: data[key].username,
			imagen: data[key].avatar,
		};
	});
	return avatars;
};

// {"sub":3,"user":"kevinryan","iat":1715551420}
const getUserData = () => {
	return JSON.parse(localStorage.getItem(USER));
};

const decodeToken = (token) => {
	const payload = token.split('.')[1];
	const decodedPayload = atob(payload);
	return JSON.parse(decodedPayload);
};

export {
	createUser,
	getUserData,
	decodeToken,
	createUsersDB,
	verifyUsersDB,
	getUserByUsername,
	getAllAvatarUsers,
	getNameByUsername,
	getAvatarByUsername,
	getAboutUserByUsername,
};
