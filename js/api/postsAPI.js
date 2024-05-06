import { posts, users } from '../seedDB.js';

const POSTS_BASE_URL =
	'https://kodemia-devto-default-rtdb.firebaseio.com/posts';

const createPostsDB = () => {
	posts.forEach(async (post) => {
		const user = users[Math.floor(Math.random() * users.length)];
		const postUser = {
			...post,
			autor: {
				username: user.username,
				name: user.name.firstname + ' ' + user.name.lastname,
			},
		};
		await createPost(postUser);
	});
	console.log('Posts DB Success');
};

const verifyPostsDB = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();
	return data;
};

const createPost = async (postObject) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`, {
		method: 'POST',
		body: JSON.stringify(postObject),
	});
	let data = await response.json();
	return data;
};

const deletePost = async (postId) => {
	let response = await fetch(`${POSTS_BASE_URL}/${postId}.json`, {
		method: 'DELETE',
	});
	let data = await response.json();
	return data;
};

const getPostById = async (postId) => {
	let response = await fetch(`${POSTS_BASE_URL}/${postId}/.json`);
	let data = await response.json();
	return data;
};

const getAllPost = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));
	return postsArray;
};

const getAllTags = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	//Crea un array con todos los tags de los posts con una profundidad de 1
	let tagsArray = postsArray.map((post) => post.tags).flat();
	//Crea un objeto Set para almacenar valores únicos de tags
	let tagsSet = new Set(tagsArray);
	//Convierte el objeto Set a un array
	let tagsUnique = [...tagsSet];
	return tagsUnique;
};

const getLastPosts = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	//Ordenar los posts por fecha
	postsArray.sort((a, b) => {
		return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
	});

	//Obtener los ultimos 10 posts
	let lastPosts = postsArray.slice(0, 10);
	return lastPosts;
};

const getAllCategories = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	let categoriesArray = postsArray.map((post) => post.categoria);
	//Crea un objeto Set para almacenar valores únicos de categorias
	let categoriesSet = new Set(categoriesArray);
	//Convierte el objeto Set a un array
	let categoriesUnique = [...categoriesSet];
	return categoriesUnique;
};

const getPostsMoreCommenst = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	//Ordenar los posts por numero de reacciones
	postsArray.sort((a, b) => {
		return b.numReacciones - a.numReacciones;
	});

	const trendingPosts = postsArray.map((post) => post.titulo);

	//Obtener los ultimos 10 posts
	return trendingPosts.slice(0, 10);
};

export {
	createPostsDB,
	createPost,
	deletePost,
	getPostById,
	getAllPost,
	verifyPostsDB,
	getAllTags,
	getLastPosts,
	getAllCategories,
	getPostsMoreCommenst,
};
