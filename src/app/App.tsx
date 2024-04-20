import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AboutPage from '@/pages/AboutPage'
import CategoriesPage from '@/pages/CategoriesPage'
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import Navbar from '@/widgets/Navbar'
import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/products-item" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
