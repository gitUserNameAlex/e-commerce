import React from 'react'
import { Link } from 'react-router-dom'
import Text from '../Text'
import styles from './NavbarLinks.module.scss'

const NavbarLinks = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navListLink}>
            <Text color="primary" view="p-18" weight="normal">
              Products
            </Text>
          </Link>
        </li>
        <li>
          <Link to="/categories" className={styles.navListLink}>
            <Text color="primary" view="p-18" weight="normal">
              Categories
            </Text>
          </Link>
        </li>
        <li>
          <Link to="/about-us" className={styles.navListLink}>
            <Text color="primary" view="p-18" weight="normal">
              About us
            </Text>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavbarLinks
