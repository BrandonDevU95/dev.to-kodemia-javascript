import {
	getAvatarByUsername,
	getUserData,
	logout,
} from '../js/api/usersAPI.js';

import { printCardUser } from '../js/components/users.js';
import { printDetailsPost } from '../js/components/posts.js';

const url = window.location.href;
const btnLogout = document.getElementById('logout');
const avatar = document.getElementById('avatar-image');
const params = new URLSearchParams(new URL(url).search);

const id = params.get('id');

const { user } = getUserData();

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../index.html';
});

(async () => {
	const avatarImage = await getAvatarByUsername(user);
	avatar.src = avatarImage;
	avatar.alt = user;
})();

printDetailsPost(id, 'post-details');
printCardUser(id, 'user-details');
