import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import SingleProductStore from 'store/SingleProductStore';
import SwipeButtons from './components/SwipeButtons';
import styles from './ProductItem.module.scss';

interface ProductItemProps {
  store: SingleProductStore;
}

const ProductItem: FC<ProductItemProps> = observer(({ store }) => {
  return (
    <div className={styles.product}>
      <div className={styles.product__img}>
        <img src={store.product?.images[store.imgNavStore?.currentImageIndex || 0]} alt="image" />

        {store.product?.images.length !== undefined && store.product.images.length > 1 && (
          <SwipeButtons
            imgIdx={store.imgNavStore?.currentImageIndex || 0}
            imgCount={store.product.images.length}
            prevImg={() => store.imgNavStore?.prevImage()}
            nextImg={() => store.imgNavStore?.nextImage()}
          />
        )}
      </div>
      <div className={styles.product__content}>
        <Text view="p-44" color="primary" weight="bold">
          {store.product?.title}
        </Text>
        <Text className={styles['product__content-description']} color="secondary" weight="normal" view="p-20">
          {store.product?.description}
        </Text>
        <Text className={styles['product__content-price']} color="primary" weight="bold" view="p-44">
          {store.formattedPrice}
        </Text>
        <div className={styles['product__content-ui']}>
          <Button color="accent">Buy Now</Button>
          <Button className={styles['product__content-add']}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
});

export default ProductItem;
