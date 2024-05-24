import React, { FC } from 'react';
import Text from 'components/ui/Text';
import styles from './CartText.module.scss';

const CartText: FC = () => {
  return (
    <Text color="primary" view="p-44" className={styles.text}>
      Ваша корзина пуста
    </Text>
  );
};

export default CartText;
