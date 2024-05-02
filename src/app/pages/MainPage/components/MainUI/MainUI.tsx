import axios from 'axios';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import MultiDropdown, { Option } from '@/components/ui/MultiDropdown';
import { PRODUCTS_ENDPOINT } from '@/config/endpoints';
import ProductsStore from '@/store/ProductsStore';
import { IProduct } from '@/types/interfaces';
import styles from './MainUI.module.scss';

const MainUI: FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      search: searchParams.get('search') || '',
      categories: searchParams.get('categories')?.split(',') || [],
    };
  };

  const handleSearch = async () => {
    navigate(`/?search=${searchQuery}`);
    await fetchProducts(`?title=${searchQuery}`);
  };

  const handleCategoryChange = async (value: Option[]) => {
    setSelectedCategories(value);
    const categoryIDs = value.map(category => category.key);
    navigate(`/?categories=${categoryIDs.join(',')}`);
    await fetchProducts(`?categoryId=${categoryIDs.join('&categoryId=')}`);
  };

  const fetchProducts = async (query = '') => {
    try {
      const resp = await axios.get(`${PRODUCTS_ENDPOINT}${query}`);
      runInAction(() => {
        ProductsStore.products = resp.data.map((product: IProduct) => ({
          id: product.id,
          images: product.images,
          category: product.category,
          title: product.title,
          description: product.description,
          price: product.price,
        }));
      });
    } catch (err) {
      console.log('Error while fetching products:', err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const resp = await axios.get('https://api.escuelajs.co/api/v1/categories');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = resp.data.map((category: any) => ({
        key: category.id.toString(),
        value: category.name,
      }));
      setCategoryOptions(options);
    };

    const { search, categories } = getQueryParams();
    setSearchQuery(search);

    if (search || categories.length > 0) {
      fetchProducts(
        `${search ? `?title=${search}` : ''}${categories.length > 0 ? `&categoryId=${categories.join('&categoryId=')}` : ''}`,
      );
    } else {
      ProductsStore.fetchProducts();
    }
    fetchCategories();
  }, []);

  return (
    <div className={styles.main__ui}>
      <div className={styles.main__ui__search}>
        <Input
          className={styles.main__ui__search__inp}
          value={searchQuery}
          placeholder="Search product"
          onChange={setSearchQuery}
        />
        <Button className={styles.main__ui__search__btn} onClick={handleSearch}>
          Find now
        </Button>
      </div>
      <div className={styles.main__ui__filter}>
        <MultiDropdown
          className={styles.main__ui__filter__inp}
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleCategoryChange}
          getTitle={value => (value.length === 0 ? 'Filter' : value.map(v => v.value).join(', '))}
        />
      </div>
    </div>
  );
});

export default MainUI;
