const title = document.getElementById('title-new-post');
const tags = document.getElementById('tags-new-post');
const description = document.getElementById('description-new-post');
const footer = document.getElementById('footer-new-post');

const tipTitle = document.getElementById('writting-post-title');
const tipTags = document.getElementById('writting-post-tags');
const tipDescription = document.getElementById('writting-post-description');
const tipFooter = document.getElementById('publishing-tips');

title.addEventListener('click', () => {
	tipTitle.classList.remove('d-none');
	tipTitle.classList.add('show');
	tipTags.classList.add('d-none');
	tipDescription.classList.add('d-none');
	tipFooter.classList.add('d-none');
});

tags.addEventListener('click', () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.remove('d-none');
	tipTags.classList.add('show');
	tipDescription.classList.add('d-none');
	tipFooter.classList.add('d-none');
});

description.addEventListener('click', () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.add('d-none');
	tipDescription.classList.remove('d-none');
	tipDescription.classList.add('show');
	tipFooter.classList.add('d-none');
});

footer.addEventListener('mouseover', () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.add('d-none');
	tipDescription.classList.add('d-none');
	tipFooter.classList.remove('d-none');
	tipFooter.classList.add('show');
});
