import React from 'react'
import Text from '@/shared/Text'
import styles from './AboutPage.module.scss'

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <Text color="primary" weight="normal" className={styles.aboutPageText}>
        So, here's my E-Commerce project for KTS - the brainchild of a frontend-developer who wanted to mix exploring
        new skills with some positive atmosphere.
      </Text>

      <Text color="accent" weight="medium" className={styles.aboutPageAuthor}>
        @gitUserNameAlex
      </Text>
    </div>
  )
}

export default AboutPage
