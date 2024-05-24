import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import DiscountText from './components/DiscountText';
import DiscountWheel from './components/DiscountWheel';
import styles from './DiscountPage.module.scss';

const DiscountPage: FC = observer(() => {
  return (
    <div className={styles.discount}>
      <DiscountText />
      <DiscountWheel />
    </div>
  );
});

export default DiscountPage;
