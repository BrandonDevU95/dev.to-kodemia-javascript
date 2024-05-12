// Crear elementos
const body = document.querySelector('body');

const createToast = (message) => {
	const toastContainer = document.createElement('div');
	toastContainer.classList.add(
		'toast-container',
		'position-fixed',
		'bottom-0',
		'end-0',
		'p-3'
	);

	const toast = document.createElement('div');
	toast.classList.add('toast', 'align-items-center');
	toast.setAttribute('id', 'toasty');
	toast.setAttribute('role', 'alert');
	toast.setAttribute('aria-live', 'assertive');
	toast.setAttribute('aria-atomic', 'true');

	const toastContent = document.createElement('div');
	toastContent.classList.add('d-flex');

	const toastBody = document.createElement('div');
	toastBody.classList.add('toast-body');
	toastBody.textContent = message;

	const closeButton = document.createElement('button');
	closeButton.setAttribute('type', 'button');
	closeButton.classList.add('btn-close', 'me-2', 'm-auto');
	closeButton.setAttribute('data-bs-dismiss', 'toast');
	closeButton.setAttribute('aria-label', 'Close');

	// Construir estructura del toast
	toastContent.appendChild(toastBody);
	toastContent.appendChild(closeButton);
	toast.appendChild(toastContent);
	toastContainer.appendChild(toast);

	return toastContainer;
};

const showToast = (message) => {
	const toast = createToast(message);
	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
	toastBootstrap.show();
};

export { showToast };
