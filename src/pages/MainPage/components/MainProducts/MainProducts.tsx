import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import CartStore from 'store/CartStore';
import DiscountStore from 'store/DiscountStore';
import ProductsStore from 'store/ProductsStore';

import { IProduct } from 'types/interfaces';
import styles from './MainProducts.module.scss';

interface MainProductsProps {
  store: ProductsStore;
}

const MainProducts: FC<MainProductsProps> = observer(({ store }) => {
  const navigate = useNavigate();

  const handleCard = (productID: string, categoryID: number) => {
    navigate(`/products-item?productID=${productID}&categoryID=${categoryID}`);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, product: IProduct) => {
    event.stopPropagation();
    CartStore.addToCart(product);
  };

  return (
    <div className={styles.products}>
      {store.currentProducts.map((item: IProduct) => (
        <motion.div
          className={styles.products__motion}
          key={item._id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.05 }}
        >
          <Card
            image={item.images[0]}
            captionSlot={item.category.name}
            title={item.title}
            subtitle={item.description}
            contentSlot={
              DiscountStore.hasSpun ? (
                <span>
                  {item.price}₽{' '}
                  <span style={{ color: '#e62654' }}>({item.price - 0.01 * item.price * DiscountStore.discount}₽)</span>
                </span>
              ) : (
                <span>{item.price}₽</span>
              )
            }
            actionSlot={
              <Button className={styles.products__btn} onClick={event => handleAddToCart(event, item)}>
                В корзину
              </Button>
            }
            onClick={() => handleCard(item._id, item.category.id)}
          />
        </motion.div>
      ))}
    </div>
  );
});

export default MainProducts;
