export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;

export const CATEGORIES_ENDPOINT = `${API_BASE_URL}/categories`;

export const SINGLE_PRODUCT_ENDPOINT = (productID: number) => `${API_BASE_URL}/products/${productID}`;

export const CERTAIN_CATEGORY_PRODUCTS_ENDPOINT = (categoryID: string) =>
  `${CATEGORIES_ENDPOINT}/${categoryID}/products`;

export const RELATED_PRODUCTS_ENDPOINT = (categoryID: number) =>
  `${CATEGORIES_ENDPOINT}/${categoryID}/products/?offset=0&limit=3`;

export const PRODUCT_ITEM_URL = (productID: number, categoryID: number) =>
  `/products-item?productID=${productID}&categoryID=${categoryID}`;
