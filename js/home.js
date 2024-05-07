import {
	createPostsDB,
	getAllPost,
	getLastPosts,
	getPostsByRelevant,
	getPostsMoreReactions,
	verifyPostsDB,
} from '../js/api/postsAPI.js';
import {
	createUsersDB,
	getAvatarByUsername,
	getToken,
	getUserData,
	logout,
	verifyUsersDB,
} from '../js/api/usersAPI.js';
import {
	deleteBookmark,
	getAllBookmarksByUser,
	saveBookmarkUser,
} from '../js/api/bookmarks.js';
import {
	printCategories,
	printLastPosts,
	printPost,
	printTags,
	printTrendingPosts,
} from '../js/components/posts.js';

if (!getToken()) {
	window.location.href = '../index.html';
}

const { user } = getUserData();

const search = document.getElementById('input-search');
const relevant = document.getElementById('relevant');
const latest = document.getElementById('latest');
const top = document.getElementById('top');
const btnLogout = document.getElementById('logout');
const avatar = document.getElementById('avatar-image');
let timeoutSearch;
let timeoutIdBookmarks;

const loadPage = () => {
	printPost(null, 'posts-lists');
	printTags();
	printLastPosts();
	printTrendingPosts(10, 'trends-list');
	printCategories('list-categories');

	clearTimeout(timeoutIdBookmarks);

	timeoutIdBookmarks = setTimeout(async () => {
		booksmarkIcon();
		loadBookmarks();
	}, 1500);
};

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

const loadAvatar = async () => {
	const avatarImage = await getAvatarByUsername(user);
	avatar.src = avatarImage;
	avatar.alt = user;
};

const booksmarkIcon = () => {
	const icons = document.querySelectorAll('.bi-bookmark');
	icons.forEach((icon) => {
		const parentElement = icon.parentNode;
		parentElement.disabled = false;
		icon.classList.remove('text-dark');
		icon.addEventListener('click', async () => {
			if (icon.classList.contains('bi-bookmark')) {
				parentElement.disabled = true;
				const res = await saveBookmarkUser(user, icon.id);
				if (res.name) {
					icon.classList.add('bi-bookmark-check-fill');
					icon.classList.add('text-warning');
					icon.classList.remove('bi-bookmark');
					parentElement.disabled = false;
				} else {
					console.error('Error al guardar el bookmark');
				}
			} else if (icon.classList.contains('bi-bookmark-check-fill')) {
				parentElement.disabled = true;
				const res = await deleteBookmark(icon.id);
				if (!res) {
					icon.classList.remove('text-warning');
					icon.classList.remove('bi-bookmark-check-fill');
					icon.classList.add('bi-bookmark');
					parentElement.disabled = false;
				} else {
					console.error('Error al eliminar el bookmark');
				}
			}
		});
	});
};

const loadBookmarks = async () => {
	const bookmarks = await getAllBookmarksByUser(user);
	if (bookmarks) {
		const icons = document.querySelectorAll('.bi-bookmark');
		icons.forEach((icon) => {
			const isBookmarked = bookmarks.find(
				(bookmark) => bookmark.postId === icon.id
			);
			if (isBookmarked) {
				icon.classList.add('bi-bookmark-check-fill');
				icon.classList.add('text-warning');
				icon.classList.remove('bi-bookmark');
			}
		});
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

search.addEventListener('keyup', async (e) => {
	clearTimeout(timeoutSearch);

	timeoutSearch = setTimeout(async () => {
		const query = e.target.value;

		const posts = await getAllPost();

		const result = posts.filter((post) =>
			post.titulo.toLowerCase().includes(query.toLowerCase())
		);

		await printPost(result, 'posts-lists');
	}, 500);
});

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../index.html';
});

//crea una funcion anonima autoejecutable para cargar la DB
(async () => {
	const posts = await verifyPostsDB();
	const users = await verifyUsersDB();
	if (!posts) createPostsDB();
	if (!users) createUsersDB();
	loadPage();
	loadAvatar();
})();
