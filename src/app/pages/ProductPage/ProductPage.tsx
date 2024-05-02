import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import ArrowBackIcon from '@/components/ui/icons/ArrowBackIcon';
import SingleProductStore from '@/store/SingleProductStore';
import { IProduct } from '@/types/interfaces';
import NavBack from './components/NavBack';
import styles from './ProductPage.module.scss';

const ProductPage: FC = observer(() => {
  const [imgIdx, setImgIdx] = useState<number>(0);

  const navigate = useNavigate();
  const handleReturn = () => {
    navigate('/');
  };

  const { product, relatedProducts } = SingleProductStore;

  const handleCard = (productID: number, categoryID: number) => {
    SingleProductStore.setID(productID, categoryID);
    SingleProductStore.fetchProduct();
  };

  useEffect(() => {
    SingleProductStore.fetchProduct();
    SingleProductStore.fetchRelatedProducts();
  }, []);

  const prevImg = () => {
    if (product?.images.length !== undefined) {
      setImgIdx(prevIdx => (prevIdx === 0 ? product.images.length - 1 : prevIdx - 1));
    }
  };

  const nextImg = () => {
    if (product?.images.length !== undefined) {
      setImgIdx(prevIndex => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  return (
    <div className={styles.product}>
      <button onClick={handleReturn} className={styles.product__nav}>
        <ArrowBackIcon />
        <Text view="p-20" color="primary" weight="normal">
          Назад
        </Text>
      </button>

      <div className={styles.product__item}>
        <div className={styles.product__item__img}>
          <img src={product?.images[imgIdx]} alt="image" />

          {product?.images.length !== undefined && product.images.length > 1 && (
            <NavBack
              className={styles.product__item__img__nav}
              prevImg={prevImg}
              nextImg={nextImg}
              imgIdx={imgIdx}
              imgCount={product.images.length}
            />
          )}
        </div>
        <div className={styles.product__item__content}>
          <Text className={styles.product__item__content__title} color="primary" weight="bold">
            {product?.title}
          </Text>
          <Text className={styles.product__item__content__desc} color="secondary" weight="normal" view="p-20">
            {product?.description}
            {product?.description}
          </Text>
          <Text className={styles.product__item__content__price} color="primary" weight="bold">
            {`$${product?.price}`}
          </Text>
          <div className={styles.product__item__content__ui}>
            <Button className={styles.product__item__content__ui__buy} color="accent">
              Buy Now
            </Button>
            <Button className={styles.product__item__content__ui__add}>Add to Cart</Button>
          </div>
        </div>
      </div>

      <div className={styles.product__related}>
        <Text weight="bold" color="primary" className={styles.product__related__text}>
          Related Items
        </Text>
        <div className={styles.product__related__list}>
          {relatedProducts &&
            relatedProducts.map((item: IProduct) => (
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
    </div>
  );
});

export default ProductPage;
