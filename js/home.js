import { getToken } from '../js/api/usersAPI.js';
import {
	printPost,
	printTags,
	printLastPosts,
	printCategories,
	printTrendingPosts,
} from '../js/components/posts.js';
import { getAllPost, getPostsByRelevant } from '../js/api/postsAPI.js';
const search = document.getElementById('input-search');
const relevant = document.getElementById('relevant');

if (!getToken()) {
	window.location.href = '../index.html';
}

search.addEventListener('keyup', async (e) => {
	const query = e.target.value;
	const posts = await getAllPost();

	const result = posts.filter((post) =>
		post.titulo.toLowerCase().includes(query.toLowerCase())
	);

	await printPost(result, 'posts-lists');
});

relevant.addEventListener('click', async () => {
	if (relevant.classList.contains('fw-bold')) {
		relevant.classList.remove('fw-bold');
		relevant.classList.add('fw-lighter');
		await printPost(null, 'posts-lists');
	} else {
		relevant.classList.remove('fw-lighter');
		relevant.classList.add('fw-bold');
		const posts = await getPostsByRelevant();
		await printPost(posts, 'posts-lists');
	}
});

printPost(null, 'posts-lists');
printTags();
printLastPosts();
printCategories();
printTrendingPosts();
