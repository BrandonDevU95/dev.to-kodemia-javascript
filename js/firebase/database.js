import {
	get,
	getDatabase,
	ref,
	set,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';

import { app } from './config.js';
import { showToast } from '../components/toast.js';

const database = getDatabase(app);

const insertUserRecord = async (uid, user) => {
	try {
		await set(ref(database, `users/${uid}`), user);
		showToast('User record created successfully', 'success');
	} catch (error) {
		showToast('Error creating user record', 'error');
	}
};

export { insertUserRecord, database };
