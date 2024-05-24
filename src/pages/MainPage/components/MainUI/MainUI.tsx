import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import MultiDropdown, { Option } from 'components/ui/MultiDropdown';
import Text from 'components/ui/Text';
import { CATEGORIES_ENDPOINT } from 'config/endpoints';
import ProductsStore from 'store/ProductsStore';
import styles from './MainUI.module.scss';

interface MainUIProps {
  store: ProductsStore;
}

const MainUI: FC<MainUIProps> = observer(({ store }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(CATEGORIES_ENDPOINT);
      setCategories(
        resp.data.map((category: { id: number; name: string }) => ({
          key: category.id.toString(),
          value: category.name,
        })),
      );
    } catch (err) {
      console.log('Error while fetching categories:', err);
    }
  };

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      search: searchParams.get('search') || '',
      categories: searchParams.getAll('category') || [],
    };
  };

  const handleSearch = async () => {
    const categoryQuery = selectedCategories.map(cat => `category=${cat.key}`).join('&');
    navigate(`/?search=${searchQuery}&${categoryQuery}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    navigate('/');
    fetchInitialProducts('', []);
  };

  const fetchInitialProducts = async (search: string, categoryIds: string[]) => {
    if (categoryIds.length > 0) {
      await store.fetchProductsByCategory(categoryIds);
    } else {
      await store.fetchProducts(search ? `?title=${search}` : '');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const { search, categories: categoryIds } = getQueryParams();
    setSearchQuery(search);

    const initialSelectedCategories = categoryIds.map(categoryId => {
      const category = categories.find(cat => cat.key === categoryId);
      return { key: categoryId, value: category ? category.value : '' };
    });

    setSelectedCategories(initialSelectedCategories);
    fetchInitialProducts(search, categoryIds);
  }, [location.search, categories.length]);

  return (
    <div className={styles.ui}>
      <div className={styles.ui__search}>
        <Input
          className={styles['ui__search-inp']}
          value={searchQuery}
          placeholder="Найти продукт"
          onChange={setSearchQuery}
        />
      </div>
      <div className={styles.ui__filter}>
        <MultiDropdown
          className={styles['ui__filter-inp']}
          options={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
          getTitle={value => (value.length === 0 ? 'Фильтр' : value.map(v => v.value).join(', '))}
        />
        <div className={styles['ui__filter-container']}>
          <Button className={styles['ui__clear-btn']} onClick={handleClearSearch}>
            Очистить
          </Button>
          <Button className={styles['ui__filter-btn']} onClick={handleSearch}>
            Найти
          </Button>
        </div>
      </div>

      <div className={styles.ui__text}>
        <Text weight="bold" color="primary" view="p-30">
          Всего продуктов:
        </Text>
        <Text weight="bold" color="mark" view="p-30">
          {store.totalProducts}
        </Text>
      </div>
    </div>
  );
});

export default MainUI;
