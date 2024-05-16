import axios from 'axios';
import { makeObservable, observable, action, runInAction, computed } from 'mobx';
import { SINGLE_PRODUCT_ENDPOINT, RELATED_PRODUCTS_ENDPOINT } from 'config/endpoints';
import ImgNavStore from 'store/ImgNavStore';
import { IProduct, RequestStatus } from 'types/interfaces';

class SingleProductStore {
  productID: number | null = null;
  categoryID: number | null = null;
  product: IProduct | null = null;
  relatedProducts: IProduct[] = [];
  productRequestStatus: RequestStatus = 'loading';
  relatedRequestStatus: RequestStatus = 'loading';
  imgNavStore: ImgNavStore | null = null;

  constructor() {
    makeObservable(this, {
      productID: observable,
      categoryID: observable,
      product: observable,
      relatedProducts: observable,
      productRequestStatus: observable,
      relatedRequestStatus: observable,
      setID: action,
      fetchProduct: action,
      fetchRelatedProducts: action,
      init: action,
      formattedPrice: computed,
    });
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
        this.productRequestStatus = 'success';
        this.imgNavStore = new ImgNavStore(this.product.images.length);
      });
    } catch (err) {
      runInAction(() => {
        this.productRequestStatus = 'error';
      });
    }
  }

  async fetchRelatedProducts() {
    if (this.categoryID == null) return;

    try {
      const resp = await axios.get(`${RELATED_PRODUCTS_ENDPOINT(this.categoryID)}?offset=0&limit=3`);
      runInAction(() => {
        this.relatedProducts = resp.data.map((relatedItem: IProduct) => ({
          id: relatedItem.id,
          images: relatedItem.images,
          category: relatedItem.category,
          title: relatedItem.title,
          description: relatedItem.description,
          price: relatedItem.price,
        }));
        this.relatedRequestStatus = 'success';
      });
    } catch (err) {
      runInAction(() => {
        this.relatedRequestStatus = 'error';
      });
    }
  }

  init() {
    this.fetchProduct();
    this.fetchRelatedProducts();
  }

  get formattedPrice(): string {
    return `$${this.product?.price}`;
  }
}

export default SingleProductStore;
