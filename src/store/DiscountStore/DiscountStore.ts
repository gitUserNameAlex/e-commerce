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
  }

  setDiscount(value: number) {
    this.discount = value;
  }

  setHasSpun(value: boolean) {
    this.hasSpun = value;
  }
}

export default new DiscountStore();
