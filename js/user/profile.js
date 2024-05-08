import { deleteBookmark, getAllBookmarksByUser } from '../api/bookmarks.js';
import { getPostById, getPostsByUsername } from '../api/postsAPI.js';
import {
	getToken,
	getUserByUsername,
	getUserData,
	logout,
} from '../api/usersAPI.js';

import { printPost } from '../components/posts.js';

if (!getToken()) window.location.href = '../../index.html';

const btnLogout = document.getElementById('logout');
const avatar = document.querySelectorAll('#avatar-image');

const profile = document.getElementById('my-profile');
const posts = document.getElementById('my-posts');
const collections = document.getElementById('my-collections');

const profileTab = document.getElementById('profile-tab');
const postsTab = document.getElementById('posts-tab');
const collectionsTab = document.getElementById('collections-tab');

const { user } = getUserData();
let timeoutIdBookmarks;

const loadBookmarks = async (icons) => {
	icons.forEach((icon) => {
		icon.classList.add('bi-bookmark-check-fill');
		icon.classList.add('text-warning');
		icon.classList.remove('bi-bookmark');
	});
};

const bookmarkIcon = (icons, user) => {
	icons.forEach((icon) => {
		const parentElement = icon.parentNode;
		parentElement.disabled = false;
		icon.classList.remove('text-dark');
		icon.addEventListener('click', async () => {
			parentElement.disabled = true;
			const res = await deleteBookmark(icon.id);
			if (!res) {
				icon.classList.remove('text-warning');
				icon.classList.remove('bi-bookmark-check-fill');
				icon.classList.add('bi-bookmark');
				const bookmarkPosts = await getBookmarkByUser(user);
				printPost(bookmarkPosts, 'collections-lists');
				reloadBookmarks(user);
				parentElement.disabled = false;
			} else {
				console.error('Error al eliminar el bookmark');
			}
		});
	});
};

const reloadBookmarks = async (user) => {
	clearTimeout(timeoutIdBookmarks);

	timeoutIdBookmarks = setTimeout(async () => {
		const icons = document.querySelectorAll('.bi-bookmark');
		loadBookmarks(icons);
		bookmarkIcon(icons, user);
	}, 1000);
};

const getBookmarkByUser = async (user) => {
	const collectionsUser = await getAllBookmarksByUser(user);

	if (!collectionsUser) return null;

	const postIdArray = collectionsUser.map((item) => item.postId);

	const bookmarkPosts = await Promise.all(
		postIdArray.map(async (postId) => {
			const post = await getPostById(postId);
			return post;
		})
	);

	return bookmarkPosts;
};

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../../index.html';
});

profile.addEventListener('click', () => {
	profile.querySelector('a').classList.add('active');
	posts.querySelector('a').classList.remove('active');
	collections.querySelector('a').classList.remove('active');

	profileTab.classList.contains('d-none') &&
		profileTab.classList.remove('d-none');
	postsTab.classList.add('d-none');
	collectionsTab.classList.add('d-none');
});

posts.addEventListener('click', async () => {
	posts.querySelector('a').classList.add('active');
	profile.querySelector('a').classList.remove('active');
	collections.querySelector('a').classList.remove('active');

	postsTab.classList.contains('d-none') &&
		postsTab.classList.remove('d-none');

	profileTab.classList.add('d-none');
	collectionsTab.classList.add('d-none');

	const postsUser = await getPostsByUsername(user);
	printPost(postsUser, 'posts-lists');
});

collections.addEventListener('click', async () => {
	collections.querySelector('a').classList.add('active');
	profile.querySelector('a').classList.remove('active');
	posts.querySelector('a').classList.remove('active');

	collectionsTab.classList.contains('d-none') &&
		collectionsTab.classList.remove('d-none');
	profileTab.classList.add('d-none');
	postsTab.classList.add('d-none');

	const bookmarkPosts = await getBookmarkByUser(user);

	if (!bookmarkPosts) {
		printNoPosts('No tienes colecciones aún', 'collections-lists');
		return;
	}

	printPost(bookmarkPosts, 'collections-lists');
	reloadBookmarks(user);
});

const printNoPosts = (title, wrapperId) => {
	const wrapper = document.getElementById(wrapperId);

	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}

	const h1 = document.createElement('h1');
	h1.classList.add('text-center', 'p-4');
	h1.textContent = title;
	wrapper.appendChild(h1);
};

(async () => {
	const userObject = await getUserByUsername(user);
	const fields = document.querySelectorAll(
		'#form-profile input , #form-profile textarea'
	);

	avatar.forEach((img) => {
		img.src = userObject.avatar;
		img.alt = userObject.username;
	});

	const newUser = {
		fullname: userObject.name.firstname + ' ' + userObject.name.lastname,
		username: userObject.username,
		email: userObject.email,
		phone: userObject.phone,
		address: `${userObject.address.street} - ${userObject.address.number}, ${userObject.address.city}, CP. ${userObject.address.zipcode}.`,
		about: userObject.acerca,
	};

	fields.forEach((field) => {
		const key = field.name;
		field.value = newUser[key];
		field.addEventListener('change', () => {
			newUser[key] = field.value;
		});
	});
})();
