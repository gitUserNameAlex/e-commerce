import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLinks from '@/shared/NavbarLinks'
import Text from '@/shared/Text'
import BagIcon from '@/shared/icons/BagIcon'
import LogoIcon from '@/shared/icons/LogoIcon'
import UserIcon from '@/shared/icons/UserIcon'
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <LogoIcon />
        <Text color="primary" weight="bold" view="p-18">
          Lalasia
        </Text>
      </div>

      <NavbarLinks />

      <div className={styles.navbarRight}>
        <BagIcon />
        <UserIcon />
      </div>
    </div>
  )
}

export default Navbar
