import { makeObservable, observable, action } from 'mobx';

class ImgNavStore {
  currentImageIndex: number = 0;
  imageCount: number = 0;

  constructor(imageCount: number) {
    makeObservable(this, {
      currentImageIndex: observable,
      imageCount: observable,
      nextImage: action,
      prevImage: action,
      setImageCount: action,
      setCurrentImageIndex: action,
    });

    this.imageCount = imageCount;
  }

  setImageCount(count: number) {
    this.imageCount = count;
  }

  setCurrentImageIndex(index: number) {
    this.currentImageIndex = index;
  }

  nextImage() {
    if (this.imageCount > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageCount;
    }
  }

  prevImage() {
    if (this.imageCount > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.imageCount) % this.imageCount;
    }
  }
}

export default ImgNavStore;
