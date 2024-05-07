import { getToken } from '../js/api/usersAPI.js';
import {
	printPost,
	printTags,
	printLastPosts,
	printCategories,
	printTrendingPosts,
} from '../js/components/posts.js';
import {
	getAllPost,
	getLastPosts,
	getPostsByRelevant,
	getPostsMoreReactions,
} from '../js/api/postsAPI.js';
const search = document.getElementById('input-search');
const relevant = document.getElementById('relevant');
const latest = document.getElementById('latest');
const top = document.getElementById('top');

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

const toggleClass = async (
	element,
	classToCompare,
	classToRemove,
	classToAdd,
	wrapperId,
	callback
) => {
	if (element.classList.contains(classToCompare)) {
		element.classList.remove(classToRemove);
		element.classList.add(classToAdd);
		await printPost(null, wrapperId);
	} else {
		element.classList.remove(classToAdd);
		element.classList.add(classToRemove);
		const post = await callback();
		await printPost(post, wrapperId);
	}
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
});

printPost(null, 'posts-lists');
printTags();
printLastPosts();
printCategories();
printTrendingPosts();
