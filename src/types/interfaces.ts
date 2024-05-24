export interface IProduct {
  _id: string;
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

export enum RequestStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
