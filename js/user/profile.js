import { getUserByUsername, getUserData, logout } from '../api/usersAPI.js';

const btnLogout = document.getElementById('logout');
const avatar = document.getElementById('avatar-image');

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../../index.html';
});

const { user } = getUserData();

(async () => {
	const userObject = await getUserByUsername(user);
	const fields = document.querySelectorAll(
		'#form-profile input , #form-profile textarea'
	);

	avatar.src = userObject.avatar;
	avatar.alt = userObject.username;

	const newUser = {
		fullname: userObject.name.firstname + ' ' + userObject.name.lastname,
		username: userObject.username,
		email: userObject.email,
		phone: userObject.phone,
		address: `${userObject.address.street} - ${userObject.address.number}, ${userObject.address.city}, CP. ${userObject.address.zipcode}.`,
		about: userObject.acerca,
	};

	fields.forEach((field) => {
		const key = field.name;
		field.value = newUser[key];
		field.addEventListener('change', () => {
			newUser[key] = field.value;
		});
	});
})();
