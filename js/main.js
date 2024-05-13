import {
	printCategories,
	printLastPosts,
	printPost,
	printTags,
	printTrendingPosts,
} from '../js/components/posts.js';

import { auth } from './firebase/auth.js';
import { checkDB } from './seedDB.js';
import { getAllPost } from './api/postsAPI.js';

// auth.onAuthStateChanged((user) => {
// 	if (user) window.location.href = '../views/home.html';
// });

await checkDB();

const search = document.getElementById('input-search');
let timeoutSearch;

const loadPage = () => {
	printPost(null, 'posts-lists');
	printTags();
	printLastPosts();
	printTrendingPosts(10, 'trends-list');
	printCategories('list-categories');
};

search.addEventListener('keyup', async (e) => {
	clearTimeout(timeoutSearch);

	timeoutSearch = setTimeout(async () => {
		const query = e.target.value;

		const posts = await getAllPost();

		const result = posts.filter((post) =>
			post.titulo.toLowerCase().includes(query.toLowerCase())
		);

		await printPost(result, 'posts-lists');
	}, 500);
});

//crea una funcion anonima autoejecutable para cargar la DB
(async () => {
	loadPage();
})();
