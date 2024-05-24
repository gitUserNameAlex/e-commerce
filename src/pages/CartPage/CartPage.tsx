import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import NavBack from 'components/shared/NavBack';
import CartStore from 'store/CartStore';
import CartForm from './components/CartForm';
import CartProducts from './components/CartProducts';
import CartText from './components/CartText';

import styles from './CartPage.module.scss';

const CartPage: FC = observer(() => {
  return (
    <div className={styles.cart}>
      <NavBack />

      {CartStore.items.length > 0 ? (
        <div className={styles.cart__content}>
          <CartProducts />
          <CartForm />
        </div>
      ) : (
        <CartText />
      )}
    </div>
  );
});

export default CartPage;
