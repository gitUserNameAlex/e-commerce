import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Button from 'components/ui/Button';
import DiscountStore from 'store/DiscountStore';
import styles from './DiscountWheel.module.scss';

const segments = [30, 5, 10, 15, 20, 25];
const segmentColors = ['#000000', '#6e6faf', '#e62654', '#8a8bd9', '#f35b7e', '#60619e'];

const DiscountWheel: React.FC = observer(() => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [props, api] = useSpring(() => ({
    from: { rotateZ: 0 },
    config: { tension: 100, friction: 100 },
  }));

  const handleSpin = () => {
    if (!isSpinning && !DiscountStore.hasSpun) {
      const newRotation = rotation + 360 * 3 + Math.floor(Math.random() * 360);
      setRotation(newRotation);
      api.start({
        rotateZ: newRotation,
        onRest: () => {
          const segmentIndex = Math.floor((newRotation % 360) / (360 / segments.length));
          const discount = segments[segments.length - 1 - segmentIndex];
          DiscountStore.setDiscount(discount);
          DiscountStore.setHasSpun(true);
          setIsSpinning(false);
        },
      });
      setIsSpinning(true);
    }
  };

  return (
    <div className={styles.wheel}>
      <div className={styles.wheel__marker}></div>
      <animated.div className={styles.wheel__main} style={props}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className={styles['wheel__main-segment']}
            style={{
              backgroundColor: segmentColors[index],
              transform: `rotate(${index * (360 / segments.length)}deg)`,
            }}
          >
            <div className={styles['wheel__main-label']}>{segment}%</div>
          </div>
        ))}
      </animated.div>
      <Button
        className={styles.wheel__btn}
        color="accent"
        onClick={handleSpin}
        disabled={isSpinning || DiscountStore.hasSpun}
      >
        Получить скидку
      </Button>
      {DiscountStore.discount > 0 && <p className={styles.wheel__discount}>Ваша скидка: {DiscountStore.discount}%</p>}
    </div>
  );
});

export default DiscountWheel;
