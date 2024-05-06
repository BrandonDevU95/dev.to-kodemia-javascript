import { printDetailsPost } from '../js/components/posts.js';

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const id = params.get('id');

printDetailsPost(id, 'post-details');
