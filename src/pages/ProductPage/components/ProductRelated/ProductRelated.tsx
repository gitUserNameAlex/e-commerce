import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Text from 'components/ui/Text';
import { PRODUCT_ITEM_URL } from 'config/endpoints';
import DiscountStore from 'store/DiscountStore';
import SingleProductStore from 'store/SingleProductStore';
import { IProduct } from 'types/interfaces';
import styles from './ProductRelated.module.scss';

interface ProductRelatedProps {
  store: SingleProductStore;
}

const ProductRelated: FC<ProductRelatedProps> = observer(({ store }) => {
  const navigate = useNavigate();

  const handleCard = (productID: string, categoryID: number) => {
    store.setID(productID, categoryID);
    store.init();
    navigate(PRODUCT_ITEM_URL(productID, categoryID));
  };

  return (
    <div className={styles.related}>
      <Text weight="bold" color="primary" view="p-44">
        Сопутствующие товары
      </Text>
      <div className={styles.related__list}>
        {store.relatedProducts &&
          store.relatedProducts.map((item: IProduct) => (
            <motion.div
              className={styles.related__motion}
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
                      <span style={{ color: '#e62654' }}>
                        ({item.price - 0.01 * item.price * DiscountStore.discount}₽)
                      </span>
                    </span>
                  ) : (
                    <span>{item.price}₽</span>
                  )
                }
                actionSlot={<Button className={styles['related__card-btn']}>В корзину</Button>}
                onClick={() => handleCard(item._id, item.category.id)}
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
});

export default ProductRelated;
