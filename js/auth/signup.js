import { signupFirebase } from './firebase.js';

const btnSignup = document.getElementById('btn-signup');

btnSignup.addEventListener('click', async (event) => {
	const fields = document.querySelectorAll('#signup-form input');
	const form = document.querySelectorAll('.needs-validation');
	let newUser = {};

	if (!form[0].checkValidity()) {
		form[0].classList.add('was-validated');
		return;
	}

	fields.forEach((field) => {
		newUser[field.name] = field.value;
	});

	//Validate password
	if (newUser.password != newUser.confirmPassword) {
		document.getElementById('password-match').classList.remove('d-none');
		return;
	} else {
		document.getElementById('password-match').classList.add('d-none');
		delete newUser.confirmPassword;
	}

	const userRecord = await signupFirebase(newUser);
	console.log(userRecord);
});
