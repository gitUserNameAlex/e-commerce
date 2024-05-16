import AboutPage from 'pages/AboutPage';
import CategoriesPage from 'pages/CategoriesPage';
import MainPage from 'pages/MainPage';
import ProductPage from 'pages/ProductPage';

export const appRoutes = [
  { path: '*', component: MainPage },
  { path: '/', component: MainPage },
  { path: '/categories', component: CategoriesPage },
  { path: '/about-us', component: AboutPage },
  { path: '/products-item', component: ProductPage },
];
