import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import ProductsStore from 'store/ProductsStore';
import MainHeader from './components/MainHeader';
import MainNav from './components/MainNav';
import MainProducts from './components/MainProducts';
import MainUI from './components/MainUI';
import styles from './MainPage.module.scss';

const MainPage: FC = observer(() => {
  const [store] = useState(() => new ProductsStore());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('search') && !params.get('category')) {
      store.fetchProducts();
    }
  }, [store]);

  return (
    <div className={styles.main}>
      <MainHeader />

      <div className={styles.main__content}>
        <MainUI store={store} />

        <MainProducts store={store} />

        <MainNav store={store} />
      </div>
    </div>
  );
});

export default MainPage;
