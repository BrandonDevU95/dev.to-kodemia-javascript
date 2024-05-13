import {
	auth,
	signOutFirebase,
	updateProfileFirebase,
} from './firebase/auth.js';
import {
	getAllPost,
	getLastPosts,
	getPostsByRelevant,
	getPostsMoreReactions,
} from '../js/api/postsAPI.js';
import {
	loadAvatar,
	loadInfoUser,
	notificatiosnRandom,
} from './components/users.js';
import {
	printCategories,
	printLastPosts,
	printPost,
	printTags,
	printTrendingPosts,
	toggleClass,
} from '../js/components/posts.js';

import { reloadBookmarks } from '../js/components/bookmark.js';

auth.onAuthStateChanged((user) => {
	if (!user) window.location.href = '../index.html';
	console.log(user);
	//No agrega capos personalizados
	// updateProfileFirebase({
	// 	role: 'user',
	// 	about: 'I am a user of the platform',
	// 	address: 'Street 123, City, Country',
	// 	displayName: 'Brandon Vargas',
	// 	photoURL: 'https://i.ibb.co/7zvZwvF/avatar.jpg',
	// 	phoneNumber: '+11234567890',
	// });
});

// const { user } = getUserData();

const search = document.getElementById('input-search');
const relevant = document.getElementById('relevant');
const latest = document.getElementById('latest');
const top = document.getElementById('top');
const btnLogout = document.getElementById('logout');
let timeoutSearch;

//13-05-24 3:16pm
//Lo que sigue es cargar el avatar del usuario y la informacion del usuario
//Puedes ver si se puede mover la fucion al AuthStateChange
//Puedes agregar el username directo en el displayName y el avatar en el photoURL

const loadPage = () => {
	printPost(null, 'posts-lists');
	printTags();
	printLastPosts();
	printTrendingPosts(10, 'trends-list');
	printCategories('list-categories');

	// reloadBookmarks(user, 1500, false);
};

relevant.addEventListener('click', async () => {
	//Ver si se puede hacer una funcion para no repetir tanto codigo
	latest.classList.remove('fw-bold');
	latest.classList.add('fw-lighter');
	top.classList.remove('fw-bold');
	top.classList.add('fw-lighter');

	await toggleClass(
		relevant,
		'fw-bold',
		'fw-bold',
		'fw-lighter',
		'posts-lists',
		getPostsByRelevant
	);
	// reloadBookmarks(user, 1000, false);
});

latest.addEventListener('click', async () => {
	relevant.classList.remove('fw-bold');
	relevant.classList.add('fw-lighter');
	top.classList.remove('fw-bold');
	top.classList.add('fw-lighter');

	await toggleClass(
		latest,
		'fw-bold',
		'fw-bold',
		'fw-lighter',
		'posts-lists',
		() => getLastPosts(3)
	);
	// reloadBookmarks(user, 1000, false);
});

top.addEventListener('click', async () => {
	relevant.classList.remove('fw-bold');
	relevant.classList.add('fw-lighter');
	latest.classList.remove('fw-bold');
	latest.classList.add('fw-lighter');

	await toggleClass(
		top,
		'fw-bold',
		'fw-bold',
		'fw-lighter',
		'posts-lists',
		() => getPostsMoreReactions(3)
	);

	// reloadBookmarks(user, 1000, false);
});

search.addEventListener('keyup', async (e) => {
	clearTimeout(timeoutSearch);

	timeoutSearch = setTimeout(async () => {
		const query = e.target.value;

		const posts = await getAllPost();

		const result = posts.filter((post) =>
			post.titulo.toLowerCase().includes(query.toLowerCase())
		);

		await printPost(result, 'posts-lists');
		// reloadBookmarks(user, 1000, false);
	}, 500);
});

btnLogout.addEventListener('click', () => {
	signOutFirebase();
});

(async () => {
	loadPage();
	// loadAvatar(tepUser, 'avatar-image');
	// loadInfoUser(user);
	notificatiosnRandom();
})();
