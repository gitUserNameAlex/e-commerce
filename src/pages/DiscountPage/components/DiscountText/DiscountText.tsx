import React, { FC } from 'react';
import Text from 'components/ui/Text';
import styles from './DiscountText.module.scss';

const DiscountText: FC = () => {
  return (
    <div className={styles.text}>
      <Text view="p-26" color="primary" className={styles.text__greeting}>
        Добрый день! В нашем магазине мы рады предложить вам уникальную возможность сэкономить на покупках. Специально
        для вас мы подготовили эксклюзивное предложение, которое сделает ваши покупки ещё приятнее.
      </Text>
      <Text className={styles.text__why} view="p-24" color="primary">
        Почему стоит выбрать наш магазин?
      </Text>
      <Text className={styles['text__reason-first']} view="p-20" color="primary">
        - Мы предлагаем только качественную продукцию, созданную мастерами с любовью и уважением к традициям.
      </Text>
      <Text className={styles['text__reason-second']} view="p-20" color="primary">
        - В нашем ассортименте вы найдёте товары, которые подчеркнут уникальность и богатую культуру Тулы.
      </Text>
      <Text className={styles['text__reason-third']} view="p-20" color="primary">
        - Мы ценим каждого клиента и стараемся сделать покупки в нашем магазине максимально удобными и выгодными.
      </Text>
    </div>
  );
};

export default DiscountText;
