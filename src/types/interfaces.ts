export interface IProduct {
  id: number;
  images: string[];
  category: IProductCategory;
  title: string;
  description: string;
  price: number;
}

export interface IProductCategory {
  id: number;
  name: string;
}

export interface IProductsList {
  products: IProduct[];
}

export type RequestStatus = 'loading' | 'success' | 'error';
