import React, { FC } from 'react';
import SwipeIcon from 'components/ui/icons/SwipeIcon';
import styles from './SwipeButtons.module.scss';

interface SwipeButtonsProps {
  prevImg: VoidFunction;
  nextImg: VoidFunction;
  imgIdx: number;
  imgCount: number;
}
const SwipeButtons: FC<SwipeButtonsProps> = ({ prevImg, nextImg, imgIdx, imgCount }) => {
  return (
    <div className={styles.nav}>
      <button onClick={prevImg} className={styles.nav__btn} disabled={imgIdx === 0}>
        <SwipeIcon width={31} height={31} />
      </button>
      <button onClick={nextImg} className={styles.nav__btn} disabled={imgIdx === imgCount - 1}>
        <SwipeIcon width={31} height={31} className={styles['nav__btn-icon']} />
      </button>
    </div>
  );
};

export default SwipeButtons;
