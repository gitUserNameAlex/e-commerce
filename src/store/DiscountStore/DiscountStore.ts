import { makeObservable, observable, action } from 'mobx';

class DiscountStore {
  discount: number = 0;
  hasSpun: boolean = false;

  constructor() {
    makeObservable(this, {
      discount: observable,
      hasSpun: observable,
      setDiscount: action,
      setHasSpun: action,
    });

    this.loadFromLocalStorage();
  }

  setDiscount(value: number) {
    this.discount = value;
    localStorage.setItem('discount', value.toString());
  }

  setHasSpun(value: boolean) {
    this.hasSpun = value;
    localStorage.setItem('hasSpun', value.toString());
  }

  loadFromLocalStorage() {
    const storedDiscount = localStorage.getItem('discount');
    const storedHasSpun = localStorage.getItem('hasSpun');

    if (storedDiscount !== null) {
      this.discount = parseInt(storedDiscount, 10);
    }
    if (storedHasSpun !== null) {
      this.hasSpun = storedHasSpun === 'true';
    }
  }
}

export default new DiscountStore();
