import { logout } from '../js/api/usersAPI.js';
import { printCardUser } from '../js/components/users.js';
import { printDetailsPost } from '../js/components/posts.js';

const id = params.get('id');
const url = window.location.href;
const btnLogout = document.getElementById('logout');
const params = new URLSearchParams(new URL(url).search);

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../index.html';
});

printDetailsPost(id, 'post-details');
printCardUser(id, 'user-details');
