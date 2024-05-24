import { observer } from 'mobx-react-lite';
import queryString from 'query-string';
import React, { FC, useEffect, useState } from 'react';
import NavBack from 'components/shared/NavBack';
import SingleProductStore from 'store/SingleProductStore';
import ProductItem from './components/ProductItem';
import ProductRelated from './components/ProductRelated';
import styles from './ProductPage.module.scss';

const ProductPage: FC = observer(() => {
  const [store] = useState(() => new SingleProductStore());

  useEffect(() => {
    const params = queryString.parse(location.search);
    const productID = params.productID as string;
    const categoryID = parseInt(params.categoryID as string, 10);

    if (productID && categoryID) {
      store.setID(productID, categoryID);
      store.init();
    }
  }, [location.search]);

  return (
    <div className={styles.product}>
      <NavBack />

      <ProductItem store={store} />

      <ProductRelated store={store} />
    </div>
  );
});

export default ProductPage;
