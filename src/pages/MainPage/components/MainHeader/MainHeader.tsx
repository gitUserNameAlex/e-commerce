import React, { FC } from 'react';
import Text from 'components/ui/Text';
import styles from './MainHeader.module.scss';

const MainHeader: FC = () => {
  return (
    <div>
      <div className={styles.header}>
        <Text color="primary" weight="bold" view="p-44" className={styles.header__title}>
          Продукты
        </Text>
        <Text color="primary" view="p-20" weight="normal" className={styles.header__text}>
          Мы показываем товары, основанные на последних имеющихся у нас продуктах, если вы хотите увидеть наши старые
          продукты, пожалуйста, введите название товара
        </Text>
      </div>
    </div>
  );
};

export default MainHeader;
