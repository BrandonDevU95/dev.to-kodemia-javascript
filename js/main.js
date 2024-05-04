import {
	createDB,
	verifyDB,
	getAllTags,
	getLastPosts,
} from './api/postsAPI.js';

//crea una funcion anonima autoejecutable para cargar la DB
(async () => {
	const products = await verifyDB();
	if (!products) createDB();
})();

const createTag = (tag) => {
	const tagElement = document.createElement('div');
	tagElement.classList.add(
		'py-2',
		'px-3',
		'link-nav',
		'rounded',
		'border-0',
		'text-start'
	);
	const tagLink = document.createElement('a');
	tagLink.href = '#';
	tagLink.classList.add(
		'text-decoration-none',
		'd-flex',
		'align-items-center'
	);
	tagLink.textContent = `#${tag}`;
	tagElement.appendChild(tagLink);
	return tagElement;
};

const printTags = async () => {
	const popularTags = document.getElementById('popular-tags');
	const tags = await getAllTags();

	tags.forEach((tag) => {
		const tagElement = createTag(tag);
		popularTags.appendChild(tagElement);
	});
};

const createTabDiscuss = (post) => {
	const tabElement = document.createElement('div');
	tabElement.classList.add('p-3', 'border-bottom', 'border-light');
	const tabLink = document.createElement('a');
	tabLink.href = '#';
	tabLink.classList.add('text-decoration-none', 'text-discuss');
	const tabTitle = document.createElement('p');
	tabTitle.classList.add('m-0');
	//Limitar el titulo a 25 caracteres
	tabTitle.textContent =
		post.titulo.length > 30
			? post.titulo.substring(0, 30) + '...'
			: post.titulo;
	const tabComments = document.createElement('span');
	tabComments.classList.add('pt-1', 'fs-6', 'text-secondary');
	tabComments.textContent = `${post.numComentarios} comments`;
	tabLink.appendChild(tabTitle);
	tabLink.appendChild(tabComments);
	tabElement.appendChild(tabLink);
	return tabElement;
};

const insertTitleLastPosts = (title) => {
	const titlePost = document.getElementById('title-last-post');
	titlePost.textContent = title;
};

const printLastPosts = async () => {
	const lastPosts = document.getElementById('last-posts');
	const posts = await getLastPosts();

	insertTitleLastPosts(`#${posts[0].tags[0]}`);

	posts.forEach((post) => {
		const tabElement = createTabDiscuss(post);
		lastPosts.appendChild(tabElement);
	});

	AddBadgeNew();
};

const AddBadgeNew = () => {
	const ultimaPublicacion =
		document.querySelector('#last-posts').lastElementChild;
	const badge = document.createElement('div');
	badge.classList.add('pt-1');
	const etiquetaNuevo = document.createElement('span');
	etiquetaNuevo.textContent = 'New';
	etiquetaNuevo.classList.add('badge', 'bg-warning', 'text-danger');

	badge.appendChild(etiquetaNuevo);
	ultimaPublicacion.appendChild(badge);
};

printTags();
printLastPosts();
