const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const id = params.get('id');

console.log(id);
