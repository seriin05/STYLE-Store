
const CART_STORAGE_KEY = 'style_store_cart';


let cart = loadCartFromStorage();


function loadCartFromStorage() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
}


function saveCartToStorage() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}


function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
}


function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
}


function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCartToStorage();
    updateCartUI();
  }
}


function clearCart() {
  cart = [];
  saveCartToStorage();
  updateCartUI();
}


function calculateTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}


function calculateTotalCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}


function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotal = document.getElementById('cartTotal');
  const cartBadgeDesktop = document.getElementById('cartBadgeDesktop');
  const cartBadgeMobile = document.getElementById('cartBadgeMobile');


  const totalCount = calculateTotalCount();
  if (cartBadgeDesktop) cartBadgeDesktop.textContent = totalCount;
  if (cartBadgeMobile) cartBadgeMobile.textContent = totalCount;


  if (cartTotal) cartTotal.textContent = `$${calculateTotal().toFixed(2)}`;


  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-msg">
        <i class="bi bi-cart-x"></i>
        <p class="mb-0">Cart Is Empty !</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-2">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div>
          <h6 class="mb-0 text-truncate" style="max-width: 130px;" title="${item.title}">${item.title}</h6>
          <small class="text-success fw-bold">$${item.price.toFixed(2)}</small>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-outline-secondary quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span class="btn btn-light disabled px-2 fw-bold text-dark">${item.quantity}</span>
          <button class="btn btn-outline-secondary quantity-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
        
        <button class="btn btn-sm btn-outline-danger remove-item-btn" data-id="${item.id}" title="delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}
