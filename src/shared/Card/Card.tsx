import classNames from 'classnames'
import React from 'react'
import Text from '../Text'
import styles from './Card.module.scss'

export type CardProps = {
  /** Дополнительный classname */
  className?: string
  /** URL изображения */
  image: string
  /** Слот над заголовком */
  captionSlot?: React.ReactNode
  /** Заголовок карточки */
  title: React.ReactNode
  /** Описание карточки */
  subtitle: React.ReactNode
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode
  /** Клик на карточку */
  onClick?: React.MouseEventHandler
  /** Слот для действия */
  actionSlot?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  ...props
}) => {
  const cardClasses = classNames(className, styles.card)

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      <img className={styles.cardImg} src={image} alt="image" />

      <div className={styles.cardContainer}>
        {captionSlot && (
          <Text className={styles.cardCaptionSlot} color="secondary" view="p-14" weight="medium">
            {captionSlot}
          </Text>
        )}
        <Text className={styles.cardTitle} color="primary" view="p-20" weight="medium" tag="h3" maxLines={2}>
          {title}
        </Text>
        <Text className={styles.cardSubtitle} color="secondary" view="p-16" weight="normal" maxLines={3}>
          {subtitle}
        </Text>

        <div className={styles.cardFooter}>
          <div className={styles.cardContentSlot}>{contentSlot}</div>
          <div className={styles.cardActionSlot}>{actionSlot}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
