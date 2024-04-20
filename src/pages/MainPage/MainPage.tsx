import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/shared/Button'
import Card from '@/shared/Card'
import Text from '@/shared/Text'
import { IProduct } from '@/types/interfaces'
import { IProductCategory } from '@/types/interfaces'
import MainHeader from '@/widgets/MainHeader'
import MainUI from '@/widgets/MainUI/MainUI'
import styles from './MainPage.module.scss'

const PRODUCTS_API = 'https://api.escuelajs.co/api/v1/products'

const MainPage = () => {
  const [products, setProducts] = useState<IProduct[]>()

  const navigate = useNavigate()

  const handleCard = (productID: number, categoryID: number) => {
    navigate('/products-item', { state: { productID, categoryID } })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await axios.get(PRODUCTS_API)
        const productsData = resp.data.map((product: IProduct) => ({
          id: product.id,
          images: product.images,
          category: product.category,
          title: product.title,
          description: product.description,
          price: product.price,
        }))
        setProducts(productsData)
      } catch (err) {
        console.log('Error while fetching poducts:', err)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className={styles.mainPage}>
      <MainHeader />

      <MainUI />

      <div className={styles.mainContent}>
        <div className={styles.productsListText}>
          <Text weight="bold" color="primary" className={styles.productsListTitle}>
            Total Product
          </Text>
          <Text weight="bold" color="accent" view="p-20">
            {products?.length}
          </Text>
        </div>

        <div className={styles.productsList}>
          {products &&
            products.map((item: IProduct) => (
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
  )
}

export default MainPage
