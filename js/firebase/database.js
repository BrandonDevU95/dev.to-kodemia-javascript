import {
	get,
	getDatabase,
	ref,
	set,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';

import { app } from './config.js';
import { showToast } from '../components/toast.js';

const database = getDatabase(app);

export { database };
