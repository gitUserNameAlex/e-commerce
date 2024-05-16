import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Text from 'components/ui/Text';
import SingleProductStore from 'store/SingleProductStore';
import { IProduct } from 'types/interfaces';
import styles from './ProductRelated.module.scss';

interface ProductRelatedProps {
  store: SingleProductStore;
}

const ProductRelated: FC<ProductRelatedProps> = observer(({ store }) => {
  const navigate = useNavigate();

  const handleCard = (productID: number, categoryID: number) => {
    store.setID(productID, categoryID);
    store.init();
    navigate(`/products-item?productID=${productID}&categoryID=${categoryID}`);
  };

  return (
    <div className={styles.related}>
      <Text weight="bold" color="primary" view="p-44">
        Related Items
      </Text>
      <div className={styles.related__list}>
        {store.relatedProducts &&
          store.relatedProducts.map((item: IProduct) => (
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
    </div>
  );
});

export default ProductRelated;
