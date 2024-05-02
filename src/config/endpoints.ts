export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;
export const SINGLE_PRODUCT_ENDPOINT = (productID: number) => `${API_BASE_URL}/products/${productID}`;
export const RELATED_PRODUCTS_ENDPOINT = (categoryID: number) =>
  `${API_BASE_URL}/categories/${categoryID}/products?offset=0&limit=3`;
