import { makeObservable, observable, action } from 'mobx';
import { IProduct } from 'types/interfaces';

class CartStore {
  items: { product: IProduct; quantity: number }[] = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      addToCart: action,
      removeFromCart: action,
      loadCart: action,
      saveCart: action,
    });

    this.loadCart();
  }

  addToCart(product: IProduct) {
    const existingItem = this.items.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(productId: string) {
    const existingItem = this.items.find(item => item.product._id === productId);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.items = this.items.filter(item => item.product._id !== productId);
      }
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    }
  }
}

export default new CartStore();
