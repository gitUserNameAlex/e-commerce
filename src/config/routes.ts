import AboutPage from 'pages/AboutPage';
import CartPage from 'pages/CartPage';
import DiscountPage from 'pages/DiscountPage';
import MainPage from 'pages/MainPage';
import ProductPage from 'pages/ProductPage';

export const appRoutes = [
  { path: '*', component: MainPage },
  { path: '/', component: MainPage },
  { path: '/discount', component: DiscountPage },
  { path: '/about-us', component: AboutPage },
  { path: '/cart', component: CartPage },
  { path: '/products-item', component: ProductPage },
];
