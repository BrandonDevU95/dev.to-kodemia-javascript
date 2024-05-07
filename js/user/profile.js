import { logout } from '../api/usersAPI.js';

const btnLogout = document.getElementById('logout');

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../../index.html';
});
