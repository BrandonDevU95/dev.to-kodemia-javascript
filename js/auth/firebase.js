// Import the functions you need from the SDKs you need

import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
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

const signUpFirebase = async (user) => {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			user.email,
			user.password
		);
		return userCredentials;
	} catch (error) {
		switch (error.code) {
			case 'auth/email-already-in-use':
				showToast('Email alredy in use', 'error');
				break;
			case 'auth/invalid-email':
				showToast('Invalid Email', 'error');
				break;
			case 'auth/weak-password':
				showToast('Password is too weak', 'error');
				break;
			case 'auth/operation-not-allowed':
				showToast('Operation not allowed', 'error');
				break;
			default:
				showToast('Something went wrong', 'error');
				break;
		}
	}
};

const signInFirebase = async (user) => {
	try {
		const userCredentials = await signInWithEmailAndPassword(
			auth,
			user.email,
			user.password
		);
		return userCredentials;
	} catch (error) {
		switch (error.code) {
			case 'auth/user-not-found':
				showToast('User not found', 'warning');
				break;
			case 'auth/wrong-password':
				showToast('Wrong password', 'warning');
				break;
			case 'auth/missing-email':
				showToast('Email is required', 'warning');
				break;
			case 'auth/invalid-login-credentials':
				showToast('Invalid credentials', 'warning');
				break;
			default:
				showToast('Something went wrong', 'error');
				break;
		}
	}
};

const signOutFirebase = async () => {
	try {
		await signOut(auth);
		showToast('Goodbye!', 'success', '../../index.html');
	} catch (error) {
		showToast('Something went wrong', 'error');
	}
};

const authState = () => {
	onAuthStateChanged(auth, (user) => {
		console.log(user);
	});
};

export { signUpFirebase, authState, signOutFirebase, signInFirebase };
