import { makeObservable, observable, action, computed } from 'mobx';
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
      totalItems: computed,
    });

    this.loadCart();
  }

  addToCart(product: IProduct) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(productId: number) {
    const existingItem = this.items.find(item => item.product.id === productId);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.items = this.items.filter(item => item.product.id !== productId);
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

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}

export default new CartStore();
