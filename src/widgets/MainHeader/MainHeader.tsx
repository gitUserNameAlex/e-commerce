import React from 'react'
import Text from '@/shared/Text'
import styles from './MainHeader.module.scss'

const MainHeader = () => {
  return (
    <div className={styles.mainHeader}>
      <Text weight="bold" className={styles.mainHeaderTitle}>
        Products
      </Text>
      <Text color="secondary" view="p-20" weight="normal">
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
    </div>
  )
}

export default MainHeader
