import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
	// ...
	// The value of `databaseURL` depends on the location of the database

	databaseURL: 'https://kodemia-devto-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
