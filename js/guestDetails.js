import { auth } from './firebase/auth.js';
import { printDetailsPost } from '../js/components/posts.js';

auth.onAuthStateChanged((user) => {
	if (user) window.location.href = '../index.html';
});

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);

const id = params.get('id');

printDetailsPost(id, 'post-details');
