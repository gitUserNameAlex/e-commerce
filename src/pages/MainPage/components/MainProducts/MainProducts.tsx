import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import ProductsStore from 'store/ProductsStore';
import { IProduct } from 'types/interfaces';
import styles from './MainProducts.module.scss';

interface MainProductsProps {
  store: ProductsStore;
}

const MainProducts: FC<MainProductsProps> = observer(({ store }) => {
  //переход на отдельный товар
  const navigate = useNavigate();
  const handleCard = (productID: number, categoryID: number) => {
    navigate(`/products-item?productID=${productID}&categoryID=${categoryID}`);
  };
  //переход на отдельный товар

  return (
    <div className={styles.products}>
      {store.currentProducts.map((item: IProduct) => (
        <Card
          key={item.id}
          image={item.images[0]}
          captionSlot={item.category.name}
          title={item.title}
          subtitle={item.description}
          contentSlot={`$${item.price}`}
          actionSlot={<Button>Add to cart</Button>}
          onClick={() => handleCard(item.id, item.category.id)}
        ></Card>
      ))}
    </div>
  );
});

export default MainProducts;
