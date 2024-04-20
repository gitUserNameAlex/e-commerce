import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Button from '@/shared/Button'
import Card from '@/shared/Card'
import Text from '@/shared/Text'
import ArrowProductIcon from '@/shared/icons/ArrowProductIcon'
import { IProduct } from '@/types/interfaces'
import ProductNavbar from '@/widgets/ProductNavbar'
import styles from './ProductPage.module.scss'

const ProductPage = () => {
  const location = useLocation()
  const { productID, categoryID } = location.state

  const PRODUCT_API = `https://api.escuelajs.co/api/v1/products/${productID}`
  const RELATED_PRODUCTS_API = `https://api.escuelajs.co/api/v1/categories/${categoryID}/products?offset=0&limit=3`

  const [product, setProduct] = useState<IProduct>()
  const [related, setRelated] = useState<IProduct[]>()
  const [imgIdx, setImgIdx] = useState<number>(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get(PRODUCT_API)
        const productData: IProduct = {
          id: resp.data.id,
          images: resp.data.images,
          category: resp.data.category,
          title: resp.data.title,
          description: resp.data.description,
          price: resp.data.price,
        }
        setProduct(productData)
      } catch (err) {
        console.log('Error while fetching poducts:', err)
      }
    }

    fetchProduct()
  }, [])

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const resp = await axios.get(RELATED_PRODUCTS_API)
        const relatedData = resp.data.map((relatedItem: IProduct) => ({
          id: relatedItem.id,
          images: relatedItem.images,
          category: relatedItem.category,
          title: relatedItem.title,
          description: relatedItem.description,
          price: relatedItem.price,
        }))
        setRelated(relatedData)
      } catch (err) {
        console.log('Error while fetching related products:', err)
      }
    }

    fetchRelated()
  }, [])

  const prevImg = () => {
    if (product?.images.length !== undefined) {
      setImgIdx(prevIdx => (prevIdx === 0 ? product.images.length - 1 : prevIdx - 1))
    }
  }

  const nextImg = () => {
    if (product?.images.length !== undefined) {
      setImgIdx(prevIndex => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  return (
    <div className={styles.productPage}>
      <ProductNavbar />

      <div className={styles.product}>
        <div className={styles.productImgContainer}>
          <img className={styles.productImg} src={product?.images[imgIdx]} alt="image" />
          <div className={styles.productImgNav}>
            <button onClick={prevImg} className={styles.productImgNavItem} disabled={imgIdx === 0 ? true : false}>
              <ArrowProductIcon className={styles.productImgNavItemLeft} />
            </button>
            <button onClick={nextImg} className={styles.productImgNavItem} disabled={imgIdx === 2 ? true : false}>
              <ArrowProductIcon />
            </button>
          </div>
        </div>
        <div className={styles.productContent}>
          <Text className={styles.productTitle} color="primary" weight="bold">
            {product?.title}
          </Text>
          <Text className={styles.productDescription} color="secondary" weight="normal" view="p-20">
            {product?.description}
          </Text>
          <Text className={styles.productPrice} color="primary" weight="bold">
            {`$${product?.price}`}
          </Text>
          <div className={styles.productUI}>
            <Button className={styles.productUIBuy} color="accent">
              Buy Now
            </Button>
            <Button className={styles.productUIAdd}>Add to Cart</Button>
          </div>
        </div>
      </div>

      <div className={styles.relatedProducts}>
        <Text weight="bold" color="primary" className={styles.relatedProductsText}>
          Related Items
        </Text>
        <div className={styles.relatedProductsList}>
          {related &&
            related.map((item: IProduct) => (
              <Card
                key={item.id}
                image={item.images[0]}
                captionSlot={item.category.name}
                title={item.title}
                subtitle={item.description}
                contentSlot={`$${item.price}`}
                actionSlot={<Button>Add to cart</Button>}
                // onClick={() => handleCard(item.id, item.category.id)}
              ></Card>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
