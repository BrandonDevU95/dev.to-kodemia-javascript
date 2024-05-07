import { getToken } from '../js/api/usersAPI.js';
import {
	printPost,
	printTags,
	printLastPosts,
	printCategories,
	printTrendingPosts,
} from '../js/components/posts.js';
import { getAllPost } from '../js/api/postsAPI.js';

if (!getToken()) {
	window.location.href = '../index.html';
}

const search = document.getElementById('input-search');

search.addEventListener('keyup', async (e) => {
	const query = e.target.value;
	const posts = await getAllPost();

	const result = posts.filter((post) =>
		post.titulo.toLowerCase().includes(query.toLowerCase())
	);

	await printPost(result, 'posts-lists');
});

printPost(null, 'posts-lists');
printTags();
printLastPosts();
printCategories();
printTrendingPosts();
