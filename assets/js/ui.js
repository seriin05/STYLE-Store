
const productsContainer = document.getElementById('productsContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const categoryFilter = document.getElementById('categoryFilter');


function showLoading(isLoading) {
  if (isLoading) {
    loadingSpinner.classList.remove('d-none');
    productsContainer.innerHTML = '';
    errorMessage.classList.add('d-none');
  } else {
    loadingSpinner.classList.add('d-none');
  }
}


function showError(message = null) {
  if (message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    productsContainer.innerHTML = '';
  } else {
    errorMessage.classList.add('d-none');
  }
}


function renderProducts(products) {
  if (!products || products.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-12 text-center my-5">
        <p class="fs-5 text-muted">Can't Find the product .</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = products.map(product => `
    <div class="col">
      <div class="card h-100 product-card shadow-sm">
        <div class="card-img-wrapper">
          <span class="badge bg-secondary category-badge">${product.category}</span>
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" loading="lazy">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title product-title" title="${product.title}">${product.title}</h5>
          <p class="card-text product-description">${product.description}</p>
          
          <div class="d-flex justify-content-between align-items-center mb-2 mt-auto">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <span class="product-rating">
              <i class="bi bi-star-fill text-warning"></i> ${product.rating}
            </span>
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-outline-dark btn-sm view-details-btn" data-id="${product.id}">
              <i class="bi bi-eye"></i> Details
            </button>
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}">
              <i class="bi bi-cart-plus"></i>  Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}


function renderCategories(categories) {
  const optionsHTML = categories.map(cat => `
    <option value="${cat}">${cat.replace('-', ' ').toUpperCase()}</option>
  `).join('');

  categoryFilter.innerHTML = `<option value="all"> All Categories</option>` + optionsHTML;
}


function renderProductModal(product) {
  const modalContent = document.getElementById('modalContent');
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">${product.title}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row g-3 align-items-center">
        <div class="col-md-6 text-center">
          <img src="${product.images[0] || product.thumbnail}" class="img-fluid rounded modal-product-img" alt="${product.title}">
        </div>
        <div class="col-md-6">
          <span class="badge bg-info text-dark mb-2">${product.category}</span>
          <p class="text-muted">${product.description}</p>
          <p><strong> Brand:</strong> ${product.brand || 'Not Found'}</p>
          <p><strong> Available Stock:</strong> ${product.stock} item</p>
          <div class="d-flex align-items-center gap-3 my-3">
            <span class="fs-3 fw-bold text-success">$${product.price.toFixed(2)}</span>
            <span class="text-warning"><i class="bi bi-star-fill"></i> ${product.rating} / 5</span>
          </div>
          <button class="btn btn-primary w-100 add-to-cart-btn" data-id="${product.id}" data-bs-dismiss="modal">
            <i class="bi bi-cart-plus me-1"></i> Add To Cart
          </button>
        </div>
      </div>
    </div>
  `;
}
