const BOOKMAK_BASE_URL =
	'https://kodemia-devto-default-rtdb.firebaseio.com/bookmarks';

const saveBookmarkUser = async (username, postId) => {
	let response = await fetch(`${BOOKMAK_BASE_URL}/.json`, {
		method: 'POST',
		body: JSON.stringify({ username, postId }),
	});
	let data = await response.json();
	return data;
};

const deleteBookmark = async (postId) => {
	//Primero deberia buscar el postId y traerme el id del bookmark

	const bookmarkId = await getBookmarkIdByPost(postId);

	let response = await fetch(`${BOOKMAK_BASE_URL}/${bookmarkId}.json`, {
		method: 'DELETE',
	});
	let data = await response.json();
	return data;
};

const getBookmarkIdByPost = async (postId) => {
	let response = await fetch(`${BOOKMAK_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let bookmarksArray = keys.map((key) => ({ ...data[key], key }));

	const bookmark = bookmarksArray.find(
		(bookmark) => bookmark.postId === postId
	);

	return bookmark.key;
};

export { saveBookmarkUser, deleteBookmark, getBookmarkIdByPost };
