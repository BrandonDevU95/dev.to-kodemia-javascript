import { getToken } from '../js/api/usersAPI.js';
import {
	printPost,
	printTags,
	printLastPosts,
	printCategories,
	printTrendingPosts,
} from '../js/components/posts.js';

if (!getToken()) {
	window.location.href = '../index.html';
}

printPost();
printTags();
printLastPosts();
printCategories();
printTrendingPosts();
