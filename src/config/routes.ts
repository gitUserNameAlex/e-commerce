import AboutPage from 'app/pages/AboutPage';
import CategoriesPage from 'app/pages/CategoriesPage';
import MainPage from 'app/pages/MainPage';
import ProductPage from 'app/pages/ProductPage';

export const appRoutes = [
  { path: '*', component: MainPage },
  { path: '/', component: MainPage },
  { path: '/categories', component: CategoriesPage },
  { path: '/about-us', component: AboutPage },
  { path: '/products-item', component: ProductPage },
];
