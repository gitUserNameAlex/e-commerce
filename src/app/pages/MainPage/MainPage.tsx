import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/ui/Text';
import ProductsStore from '@/store/ProductsStore';
import SingleProductStore from '@/store/SingleProductStore';
import MainUI from './components/MainUI';
import ProductsList from './components/ProductsList';
import styles from './MainPage.module.scss';

const MainPage: FC = observer(() => {
  const navigate = useNavigate();

  const handleCard = (productID: number, categoryID: number) => {
    SingleProductStore.setID(productID, categoryID);
    navigate('/products-item');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('search') && !params.get('categories')) {
      ProductsStore.fetchProducts();
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.main__header}>
        <Text weight="bold" className={styles.main__header__title}>
          Products
        </Text>
        <Text color="secondary" view="p-20" weight="normal">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>

      <div className={styles.main__content}>
        <div className={styles.main__content__amount}>
          <Text weight="bold" color="primary" className={styles.main__content__amount__title}>
            Total Product
          </Text>
          <Text weight="bold" color="accent" view="p-20">
            {ProductsStore.totalProducts}
          </Text>
        </div>

        <MainUI />

        <ProductsList
          className={styles.main__content__products__items}
          products={ProductsStore.products}
          onCardClick={handleCard}
        />
      </div>
    </div>
  );
});

export default MainPage;
