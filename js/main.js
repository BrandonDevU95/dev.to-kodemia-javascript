import { createDB, verifyDB, getAllTags } from './api/postsAPI.js';
const popularTags = document.getElementById('popular-tags');

//crea una funcion anonima autoejecutable para cargar la DB
(async () => {
	const products = await verifyDB();
	if (!products) createDB();
})();

{
	/* <div class="list-group-item link-nav rounded border-0">
	<a href="#" class="text-decoration-none d-flex align-items-center">		
		#${Tag}
	</a>
</div>; */
}

const loadTags = async () => {
	const tags = await getAllTags();
	tags.forEach((tag) => {
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
		popularTags.appendChild(tagElement);
	});
};

loadTags();
