import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Text from 'components/ui/Text';
import BagIcon from 'components/ui/icons/BagIcon';
import LogoIcon from 'components/ui/icons/LogoIcon';
import UserIcon from 'components/ui/icons/UserIcon';
import { menu } from './config/menu';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <NavLink to={'/'}>
          <LogoIcon width={68} height={68} />
        </NavLink>
      </div>

      <nav className={styles.navbar__pages}>
        <ul className={styles['navbar__pages-list']}>
          {menu.map((item, idx) => (
            <li key={idx}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles['navbar__pages-link']} ${styles['navbar__pages-link--active']}`
                    : styles['navbar__pages-link']
                }
                to={item.link}
              >
                <Text color="accent" view="p-18" weight="normal">
                  {item.title}
                </Text>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.navbar__personal}>
        <UserIcon className={styles['navbar__personal-icon']} width={30} height={30} />
        <BagIcon className={styles['navbar__personal-icon']} width={30} height={30} />
      </div>
    </div>
  );
};

export default Navbar;
