import React, { FC } from 'react';
import Text from 'components/ui/Text';
import AboutIcon from 'components/ui/icons/AboutIcon';
import styles from './AboutPage.module.scss';

const AboutPage: FC = () => {
  return (
    <div className={styles.about}>
      <AboutIcon width={320} height={320} className={styles.about__icon} />

      <Text color="primary" view="p-26" weight="normal" align="center" className={styles.about__text}>
        Добро пожаловать в <span className={styles['about__text-name']}>"Тульский склад"</span> — магазин, который
        перенесет вас в атмосферу древнего Тульского края, славящегося своими уникальными традициями и мастерством. У
        нас вы найдете аутентичные продукты и сувениры, сделанные с душой и любовью.
      </Text>

      <a
        href="https://github.com/gitUserNameAlex"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.about__link}
      >
        <Text color="mark" view="p-22" weight="medium" align="center" className={styles['about__link-author']}>
          @gitUserNameAlex
        </Text>
      </a>
    </div>
  );
};

export default AboutPage;
