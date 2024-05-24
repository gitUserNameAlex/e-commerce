import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Text from 'components/ui/Text';
import CartStore from 'store/CartStore';
import DiscountStore from 'store/DiscountStore';
import { IProduct } from 'types/interfaces';
import styles from './CartProducts.module.scss';

const CartProducts: FC = observer(() => {
  const handleRemoveFromCart = (productId: string) => {
    CartStore.removeFromCart(productId);
  };

  return (
    <div className={styles.list}>
      {CartStore.items.map(({ product, quantity }) => (
        <Card
          className={styles.list__item}
          key={product._id}
          image={product.images[0]}
          captionSlot={product.category.name}
          title={product.title}
          subtitle={product.description}
          contentSlot={
            DiscountStore.hasSpun ? (
              <span>
                {product.price}₽{' '}
                <span style={{ color: '#e62654' }}>
                  ({product.price - 0.01 * product.price * DiscountStore.discount}₽)
                </span>
              </span>
            ) : (
              <span>{product.price}₽</span>
            )
          }
          actionSlot={
            <>
              <Text color="accent" view="p-14" align="center" className={styles['list__item-text']}>
                Количество: {quantity}
              </Text>
              <Button className={styles['list__item-btn']} onClick={() => handleRemoveFromCart(product._id)}>
                Удалить
              </Button>
            </>
          }
        />
      ))}
    </div>
  );
});

export default CartProducts;
