const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
	const fields = document.querySelectorAll('#login-form input');
	const userObject = {};

	//Si el checkbox está marcado, se añade al objeto userObject
	fields.forEach((field) => {
		if (field.type === 'checkbox') {
			userObject[field.name] = field.checked;
		} else {
			userObject[field.name] = field.value;
		}
	});

	console.log(userObject);
});
