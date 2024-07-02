import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import CartStore from 'store/CartStore';
import DiscountStore from 'store/DiscountStore';
import SingleProductStore from 'store/SingleProductStore';
import { IProduct } from 'types/interfaces';
import SwipeButtons from './components/SwipeButtons';
import styles from './ProductItem.module.scss';
interface ProductItemProps {
  store: SingleProductStore;
}

const ProductItem: FC<ProductItemProps> = observer(({ store }) => {
  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, product: IProduct | null) => {
    if (product) {
      CartStore.addToCart(product);
    }
  };

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
        <Text className={styles['product__content-title']} view="p-44" color="primary" weight="bold">
          {store.product?.title}
        </Text>
        <Text className={styles['product__content-description']} color="secondary" weight="normal" view="p-20">
          {store.product?.description}
        </Text>
        <div className={styles['product__content-footer']}>
          <Text className={styles['product__content-price']} color="primary" weight="bold" view="p-44">
            {DiscountStore.hasSpun && store.product?.price !== undefined ? (
              <span>
                {store.formattedPrice}{' '}
                <span style={{ color: '#e62654' }}>
                  ({store.product?.price - 0.01 * store.product?.price * DiscountStore.discount}₽)
                </span>
              </span>
            ) : (
              <span>{store.formattedPrice}</span>
            )}
          </Text>
          <div className={styles['product__content-ui']}>
            <Button className={styles['product__content-buy']} color="accent">
              Купить
            </Button>
            <Button className={styles['product__content-add']} onClick={event => handleAddToCart(event, store.product)}>
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductItem;
