
let allProducts = [];
let filteredProducts = [];


const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const clearCartBtn = document.getElementById('clearCartBtn');


document.addEventListener('DOMContentLoaded', async () => {
  
  updateCartUI();

 
  await initData();


  setupEventListeners();
});


async function initData() {
  showLoading(true);
  try {
   
    const [products, categories] = await Promise.all([
      fetchAllProducts(),
      fetchCategories()
    ]);

    allProducts = products;
    filteredProducts = [...allProducts];

    renderCategories(categories);
    renderProducts(filteredProducts);
  } catch (error) {
    showError('Failed to load products . Please check your internet connection and try again ');
  } finally {
    showLoading(false);
  }
}


function setupEventListeners() {

  searchInput.addEventListener('input', applyFiltersAndSort);
  searchBtn.addEventListener('click', applyFiltersAndSort);


  categoryFilter.addEventListener('change', applyFiltersAndSort);


  sortSelect.addEventListener('change', applyFiltersAndSort);


  document.getElementById('productsContainer').addEventListener('click', async (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const productId = parseInt(target.dataset.id);


    if (target.classList.contains('add-to-cart-btn')) {
      const product = allProducts.find(p => p.id === productId);
      if (product) addToCart(product);
    }

  
    if (target.classList.contains('view-details-btn')) {
      try {
        const productDetails = await fetchProductById(productId);
        renderProductModal(productDetails);
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
      } catch (error) {
        alert('failed to load product detail !');
      }
    }
  });

 
  document.getElementById('cartItemsContainer').addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const productId = parseInt(target.dataset.id);

   
    if (target.classList.contains('quantity-btn')) {
      const action = target.dataset.action;
      updateQuantity(productId, action === 'increase' ? 1 : -1);
    }

 
    if (target.classList.contains('remove-item-btn')) {
      removeFromCart(productId);
    }
  });

  
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all the products?')) {
        clearCart();
      }
    });
  }
}


function applyFiltersAndSort() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  const sortOrder = sortSelect.value;


  filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );


  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === selectedCategory
    );
  }


  if (sortOrder === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

 
  renderProducts(filteredProducts);
}
