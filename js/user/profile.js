import {
	getToken,
	getUserByUsername,
	getUserData,
	logout,
} from '../api/usersAPI.js';

import { getPostsByUsername } from '../api/postsAPI.js';
import { printPost } from '../components/posts.js';

const btnLogout = document.getElementById('logout');
const avatar = document.querySelectorAll('#avatar-image');

const profile = document.getElementById('my-profile');
const posts = document.getElementById('my-posts');
const collections = document.getElementById('my-collections');

const profileTab = document.getElementById('profile-tab');
const postsTab = document.getElementById('posts-tab');
const collectionsTab = document.getElementById('collections-tab');

if (!getToken()) window.location.href = '../../index.html';

const { user } = getUserData();

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../../index.html';
});

profile.addEventListener('click', () => {
	profile.querySelector('a').classList.add('active');
	posts.querySelector('a').classList.remove('active');
	collections.querySelector('a').classList.remove('active');

	profileTab.classList.contains('d-none') &&
		profileTab.classList.remove('d-none');
	postsTab.classList.add('d-none');
	collectionsTab.classList.add('d-none');
});

posts.addEventListener('click', async () => {
	posts.querySelector('a').classList.add('active');
	profile.querySelector('a').classList.remove('active');
	collections.querySelector('a').classList.remove('active');

	postsTab.classList.contains('d-none') &&
		postsTab.classList.remove('d-none');

	profileTab.classList.add('d-none');
	collectionsTab.classList.add('d-none');

	const postsUser = await getPostsByUsername(user);
	printPost(postsUser, 'posts-lists');
});

collections.addEventListener('click', () => {
	collections.querySelector('a').classList.add('active');
	profile.querySelector('a').classList.remove('active');
	posts.querySelector('a').classList.remove('active');

	collectionsTab.classList.contains('d-none') &&
		collectionsTab.classList.remove('d-none');
	profileTab.classList.add('d-none');
	postsTab.classList.add('d-none');
});

(async () => {
	const userObject = await getUserByUsername(user);
	const fields = document.querySelectorAll(
		'#form-profile input , #form-profile textarea'
	);

	avatar.forEach((img) => {
		img.src = userObject.avatar;
		img.alt = userObject.username;
	});

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
