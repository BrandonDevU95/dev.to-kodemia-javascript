import { getToken } from './api/usersAPI.js';
import { createPostsDB, verifyPostsDB } from './api/postsAPI.js';
import { verifyUsersDB, createUsersDB } from './api/usersAPI.js';
import {
	printPost,
	printTags,
	printLastPosts,
	printCategories,
	printTrendingPosts,
} from '../js/components/posts.js';

if (getToken()) {
	window.location.href = '../views/home.html';
}

//crea una funcion anonima autoejecutable para cargar la DB
(async () => {
	const posts = await verifyPostsDB();
	const users = await verifyUsersDB();
	if (!posts) createPostsDB();
	if (!users) createUsersDB();
	loadPage();
})();

const loadPage = () => {
	printPost(null, 'posts-lists');
	printTags();
	printLastPosts();
	printTrendingPosts(10, 'trends-list');
	printCategories('list-categories');
};
