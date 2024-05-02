export interface IProduct {
  id: number;
  images: string[]; //image
  category: IProductCategory;
  title: string; //title
  description: string; //subtitle
  price: number; //contentSlot
}

interface IProductCategory {
  id: number;
  name: string;
}

export interface IProductsList {
  className: string;
  products: IProduct[];
  onCardClick: (productID: number, categoryID: number) => void;
}
