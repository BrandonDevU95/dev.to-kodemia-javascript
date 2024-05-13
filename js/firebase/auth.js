import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

import { app } from './config.js';
import { showToast } from '../components/toast.js';

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

const updateProfileFirebase = async (data) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			try {
				// Usuario autenticado, actualiza el perfil
				updateProfile(user, {
					...data,
				});
				showToast('Profile updated', 'success');
			} catch (error) {
				console.log(error);
				showToast('Something went wrong', 'error');
			}
		} else {
			// Usuario no autenticado
			showToast('You need to be logged in', 'warning');
		}
	});
};

export {
	signUpFirebase,
	signOutFirebase,
	signInFirebase,
	updateProfileFirebase,
	auth,
};
