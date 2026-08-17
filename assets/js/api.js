
const BASE_URL = 'https://dummyjson.com/products';
const EXTENDED_CATEGORIES = [
  'mens-watches',
  'womens-watches',
  'womens-bags',
  'sunglasses',
  'womens-jewelery',
  'beauty',
  'fragrances',
  'womens-dresses',
  'womens-shoes',
  'mens-shirts',
  'mens-shoes'
];


async function fetchAllProducts() {
  try {
   
    const response = await fetch(`${BASE_URL}?limit=0`);
    if (!response.ok) throw new Error('Error Fetching Data From Server');
    
    const data = await response.json();
    
    const filteredProducts = data.products.filter(product => 
      EXTENDED_CATEGORIES.includes(product.category)
    );

    return filteredProducts;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/category-list`);
    if (!response.ok) throw new Error('Erorr Fetching Catagories');
    
    const categories = await response.json();
    return categories.filter(cat => EXTENDED_CATEGORIES.includes(cat));
  } catch (error) {
    console.error('Categories API Error:', error);
    return EXTENDED_CATEGORIES;
  }
}


async function fetchProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Erorr Finding Product details');
    return await response.json();
  } catch (error) {
    console.error('Single Product API Error:', error);
    throw error;
  }
}
