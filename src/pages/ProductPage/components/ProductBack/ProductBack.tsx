import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/ui/Text';
import ArrowBackIcon from 'components/ui/icons/ArrowBackIcon';
import { appRoutes } from 'config/routes';
import styles from './ProductBack.module.scss';

const ProductBack: FC = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(appRoutes[1].path);
  };

  return (
    <button onClick={handleReturn} className={styles.nav}>
      <ArrowBackIcon width={32} height={32} />
      <Text view="p-20" color="primary" weight="normal">
        Назад
      </Text>
    </button>
  );
};

export default ProductBack;
