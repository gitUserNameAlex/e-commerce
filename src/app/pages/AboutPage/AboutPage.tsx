import React, { FC } from 'react';
import Text from 'components/ui/Text';
import styles from './AboutPage.module.scss';

const AboutPage: FC = () => {
  return (
    <div className={styles.about}>
      <Text color="primary" weight="normal" className={styles.about__text}>
        So, here's my E-Commerce project for KTS - the brainchild of a frontend-developer who wanted to mix exploring
        new skills with some positive atmosphere.
      </Text>

      <Text color="accent" weight="medium" className={styles.about__author}>
        @gitUserNameAlex
      </Text>
    </div>
  );
};

export default AboutPage;
