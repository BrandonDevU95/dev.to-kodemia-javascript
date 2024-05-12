// Import the functions you need from the SDKs you need

import {
	createUserWithEmailAndPassword,
	getAuth,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { showToast } from '../components/toast.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCyIfXSzs07eT1Yn5iuTvsyRpk8a93Hi4c',
	authDomain: 'kodemia-devto.firebaseapp.com',
	databaseURL: 'https://kodemia-devto-default-rtdb.firebaseio.com',
	projectId: 'kodemia-devto',
	storageBucket: 'kodemia-devto.appspot.com',
	messagingSenderId: '239903884694',
	appId: '1:239903884694:web:20594aa21b081e7bdb09b7',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupFirebase = async (newUser) => {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			newUser.email,
			newUser.password
		);
		return userCredentials;
	} catch (error) {
		switch (error.code) {
			case 'auth/email-already-in-use':
				showToast('El correo ya está en uso', 'error');
				break;
			case 'auth/invalid-email':
				showToast('El correo no es válido', 'error');
				break;
			case 'auth/weak-password':
				showToast('La contraseña es muy débil', 'error');
				break;
			case 'auth/operation-not-allowed':
				showToast('Operación no permitida', 'error');
				break;
			default:
				showToast('Error al registrar el usuario', 'error');
				break;
		}
	}
};

export { signupFirebase };
