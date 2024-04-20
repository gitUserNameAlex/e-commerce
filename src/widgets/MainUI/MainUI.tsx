import React from 'react'
import Button from '@/shared/Button'
import Input from '@/shared/Input'
import ArrowDownIcon from '@/shared/icons/ArrowDownIcon'
import styles from './MainUI.module.scss'

const MainUI = () => {
  return (
    <div className={styles.mainUI}>
      <div className={styles.searchProducts}>
        <Input
          className={styles.mainUISearch}
          value=""
          placeholder="Search product"
          onChange={() => console.log('search check')}
        />
        <Button className={styles.mainUIBtn}>Find now</Button>
      </div>
      <div className={styles.filterProducts}>
        <Input
          className={styles.mainUIFilter}
          value=""
          placeholder="Filter"
          onChange={() => console.log('filter check')}
          afterSlot={<ArrowDownIcon className={styles.mainUIFilterIcon} color="secondary" />}
        />
      </div>
    </div>
  )
}

export default MainUI
