import React, { FC } from 'react';
import SwipeIcon from 'components/ui/icons/SwipeIcon';
import styles from './NavBack.module.scss';

interface NavigationButtonsProps {
  prevImg: () => void;
  nextImg: () => void;
  imgIdx: number;
  imgCount: number;
  className: string;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({ className, prevImg, nextImg, imgIdx, imgCount }) => {
  return (
    <div className={className}>
      <button onClick={prevImg} className={styles.btn} disabled={imgIdx === 0}>
        <SwipeIcon className={styles.btn__icon} />
      </button>
      <button onClick={nextImg} className={styles.btn} disabled={imgIdx === imgCount - 1}>
        <SwipeIcon />
      </button>
    </div>
  );
};

export default NavigationButtons;
