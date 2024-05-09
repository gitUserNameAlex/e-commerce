import { observer } from 'mobx-react-lite';
import queryString from 'query-string';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import ProductsStore from 'store/ProductsStore';
import { IProduct, IProductsList } from 'types/interfaces';
import styles from './ProductsList.module.scss';

const ProductsList: FC<IProductsList> = observer(({ className, onCardClick }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    const currentPage = parseInt(params.page as string, 10) || 0;
    ProductsStore.setPage(currentPage);
  }, []);

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    params.page = ProductsStore.currentPage.toString();
    const newQueryString = queryString.stringify(params);
    navigate(`?${newQueryString}`);
  }, [ProductsStore.currentPage, navigate]);

  const handlePageChange = (page: number) => {
    ProductsStore.setPage(page);
  };

  return (
    <div className={styles.main__content__products}>
      <div className={className}>
        {ProductsStore.currentProducts.map((item: IProduct) => (
          <Card
            key={item.id}
            image={item.images[0]}
            captionSlot={item.category.name}
            title={item.title}
            subtitle={item.description}
            contentSlot={`$${item.price}`}
            actionSlot={<Button>Add to cart</Button>}
            onClick={() => onCardClick(item.id, item.category.id)}
          ></Card>
        ))}
      </div>
      <div className={styles.main__content__products__nav}>
        <Button
          onClick={() => handlePageChange(ProductsStore.currentPage - 1)}
          disabled={ProductsStore.currentPage === 0}
        >
          &lt;
        </Button>
        {ProductsStore.visiblePages.map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={index}
              onClick={() => handlePageChange(page - 1)}
              disabled={ProductsStore.currentPage === page - 1}
              style={{ margin: '0 5px' }}
            >
              {page}
            </Button>
          ) : (
            <span key={index} style={{ margin: '0 5px' }}>
              ...
            </span>
          ),
        )}
        <Button
          onClick={() => handlePageChange(ProductsStore.currentPage + 1)}
          disabled={ProductsStore.currentPage === ProductsStore.pageCount - 1}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
});

export default ProductsList;
