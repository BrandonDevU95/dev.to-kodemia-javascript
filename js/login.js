import { auth, signInFirebase } from '../js/firebase/auth.js';

import { showToast } from '../js/components/toast.js';

auth.onAuthStateChanged((user) => {
	if (user) window.location.href = '../home.html';
});

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', async (event) => {
	const fields = document.querySelectorAll('#login-form input');
	const form = document.querySelectorAll('.needs-validation');
	const userObject = {};

	if (!form[0].checkValidity()) {
		event.preventDefault();
		event.stopPropagation();
		form[0].classList.add('was-validated');
		return;
	}

	fields.forEach((field) => {
		if (field.type === 'checkbox') {
			userObject[field.name] = field.checked;
		} else {
			userObject[field.name] = field.value;
		}
	});

	const userRecord = await signInFirebase(userObject);
	if (!userRecord) return;
	showToast(`Welcome ${userRecord.user.email}!`, 'success', '../home.html');
});
