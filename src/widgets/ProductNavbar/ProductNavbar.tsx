import React from 'react'
import { useNavigate } from 'react-router-dom'
import Text from '@/shared/Text'
import styles from './ProductNavbar.module.scss'

const ProductNavbar = () => {
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate('/')
  }

  return (
    <button onClick={handleReturn} className={styles.productPageNav}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
          stroke="black"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text view="p-20" color="primary" weight="normal">
        Назад
      </Text>
    </button>
  )
}

export default ProductNavbar
