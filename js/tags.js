import { getAllPostByTag } from './api/postsAPI.js';
import { printPost } from './components/posts.js';

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const tag = params.get('tag');

(async () => {
	const posts = await getAllPostByTag(tag);
	printPost(posts, 'posts-lists', true);
})();
