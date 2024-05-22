export const API_BASE_URL = 'http://194.87.92.18:8887';

export const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;

export const CATEGORIES_ENDPOINT = `${API_BASE_URL}/categories`;

export const SINGLE_PRODUCT_ENDPOINT = (productID: string) => `${API_BASE_URL}/products/${productID}`;

export const CERTAIN_CATEGORY_PRODUCTS_ENDPOINT = (categoryID: string) => `${CATEGORIES_ENDPOINT}/${categoryID}`;

export const RELATED_PRODUCTS_ENDPOINT = (categoryID: number) => `${CATEGORIES_ENDPOINT}/${categoryID}/?limit=3`;

export const PRODUCT_ITEM_URL = (productID: string, categoryID: number) =>
  `/products-item?productID=${productID}&categoryID=${categoryID}`;



