import { createDB, verifyDB, getAllTags } from './api/postsAPI.js';

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

printTags();
