import React, { FC } from 'react';
import Text from 'components/ui/Text';
import styles from './AboutPage.module.scss';

const AboutPage: FC = () => {
  return (
    <div className={styles.about}>
      <Text color="primary" view="p-26" weight="normal" align="center" className={styles.about__text}>
        So, here's my E-Commerce project for KTS - the brainchild of a frontend-developer who wanted to mix exploring
        new skills with some positive atmosphere.
      </Text>

      <Text color="accent" view="p-22" weight="medium" align="center">
        @gitUserNameAlex
      </Text>
    </div>
  );
};

export default AboutPage;
