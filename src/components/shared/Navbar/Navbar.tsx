import React, { FC } from 'react';
import { Link } from 'react-router-dom';
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
        <LogoIcon />
        <Text color="primary" weight="bold" view="p-18">
          Lalasia
        </Text>
      </div>

      <nav className={styles.navbar__pages}>
        <ul className={styles.navbar__pages__list}>
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link to={item.link} className={styles.navbar__pages__list__link}>
                <Text color="primary" view="p-18" weight="normal">
                  {item.title}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.navbar__personal}>
        <UserIcon />
        <BagIcon />
      </div>
    </div>
  );
};

export default Navbar;
