import { observer } from 'mobx-react-lite';
import queryString from 'query-string';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import ProductsStore from 'store/ProductsStore';
import styles from './MainNav.module.scss';

interface MainNavProps {
  store: ProductsStore;
}

const MainNav: FC<MainNavProps> = observer(({ store }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    const currentPage = parseInt(params.page as string, 10) || 0;
    store.pagination.setPage(currentPage);
  }, [store.pagination]);

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    params.page = store.pagination.currentPage.toString();
    const newQueryString = queryString.stringify(params);
    navigate(`?${newQueryString}`);
  }, [store.pagination.currentPage, navigate]);

  const handlePageChange = (page: number) => {
    store.pagination.setPage(page);
  };

  return (
    <div className={styles.nav}>
      <Button
        className={styles.nav__btn}
        onClick={() => handlePageChange(store.pagination.currentPage - 1)}
        disabled={store.pagination.currentPage === 0}
      >
        &lt;
      </Button>
      {store.pagination.visiblePages.map((page, index) =>
        typeof page === 'number' ? (
          <Button
            className={styles.nav__btn}
            key={index}
            onClick={() => handlePageChange(page - 1)}
            disabled={store.pagination.currentPage === page - 1}
          >
            {page}
          </Button>
        ) : (
          <span className={styles['nav__btn-expand']} key={index}>
            ...
          </span>
        ),
      )}
      <Button
        className={styles.nav__btn}
        onClick={() => handlePageChange(store.pagination.currentPage + 1)}
        disabled={store.pagination.currentPage === store.pagination.pageCount - 1}
      >
        &gt;
      </Button>
    </div>
  );
});

export default MainNav;
