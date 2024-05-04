import { seed } from '../seedDB.js';

const POSTS_BASE_URL =
	'https://kodemia-devto-default-rtdb.firebaseio.com/posts';

const createDB = () => {
	seed.forEach(async (post) => {
		await createPost(post);
	});
	console.log('Success DB');
};

const verifyDB = async () => {
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

export { createDB, createPost, deletePost, getPostById, getAllPost, verifyDB };
