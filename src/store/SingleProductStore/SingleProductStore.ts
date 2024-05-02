import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { SINGLE_PRODUCT_ENDPOINT, RELATED_PRODUCTS_ENDPOINT } from '@/config/endpoints';
import { IProduct } from '@/types/interfaces';

class SingleProductStore {
  productID: number | null = null;
  categoryID: number | null = null;
  product: IProduct | null = null;
  relatedProducts: IProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setID(productID: number, categoryID: number) {
    this.productID = productID;
    this.categoryID = categoryID;
  }
  async fetchProduct() {
    if (this.productID == null) return;

    try {
      const resp = await axios.get(SINGLE_PRODUCT_ENDPOINT(this.productID));
      runInAction(() => {
        this.product = {
          id: resp.data.id,
          images: resp.data.images,
          category: resp.data.category,
          title: resp.data.title,
          description: resp.data.description,
          price: resp.data.price,
        };
      });
    } catch (err) {
      console.log('Error while fetching product:', err);
    }
  }

  async fetchRelatedProducts() {
    if (this.categoryID == null) return;

    try {
      const resp = await axios.get(RELATED_PRODUCTS_ENDPOINT(this.categoryID));
      runInAction(() => {
        this.relatedProducts = resp.data.map((relatedItem: IProduct) => ({
          id: relatedItem.id,
          images: relatedItem.images,
          category: relatedItem.category,
          title: relatedItem.title,
          description: relatedItem.description,
          price: relatedItem.price,
        }));
      });
    } catch (err) {
      console.log('Error while fetching related products:', err);
    }
  }
}

export default new SingleProductStore();
