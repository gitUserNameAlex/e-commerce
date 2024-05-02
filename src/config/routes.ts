import AboutPage from '@/App/pages/AboutPage';
import CategoriesPage from '@/App/pages/CategoriesPage';
import MainPage from '@/App/pages/MainPage';
import ProductPage from '@/App/pages/ProductPage';

export const appRoutes = [
  { path: '*', component: MainPage },
  { path: '/', component: MainPage },
  { path: '/categories', component: CategoriesPage },
  { path: '/about-us', component: AboutPage },
  { path: '/products-item', component: ProductPage },
];
