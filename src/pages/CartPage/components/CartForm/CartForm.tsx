import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import styles from './CartForm.module.scss';

interface IFormInputs {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Неверный формат почты').required('Поле обязательно'),
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Неверный формат номера')
    .required('Поле обязательно'),
  firstName: yup.string().required('Поле обязательно'),
  lastName: yup.string().required('Поле обязательно'),
});

const CartForm: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setIsSubmitted(true);
    //текст при отправке что скоро свяжемся
    console.log('Form submitted', data);
  };

  return (
    <div className={styles.container}>
      <form className={`${styles.form} ${isSubmitted ? styles.disabled : ''}`} onSubmit={handleSubmit(onSubmit)}>
        <Text color="accent" view="p-20" className={styles.form__title}>
          Оформить доставку
        </Text>

        <div className={styles.form__field}>
          <label htmlFor="email">
            <Text color="secondary" view="p-16" className={styles['form__field-label']}>
              Почта:
            </Text>
          </label>
          <input
            id="email"
            type="email"
            className={errors.email ? styles.form__error : ''}
            {...register('email')}
            disabled={isSubmitted}
          />
          {errors.email && <span className={styles['form__error-message']}>{errors.email.message}</span>}
        </div>

        <div className={styles.form__field}>
          <label htmlFor="phoneNumber">
            <Text color="secondary" view="p-16" className={styles['form__field-label']}>
              Телефон:
            </Text>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            className={errors.phoneNumber ? styles.form__error : ''}
            {...register('phoneNumber')}
            disabled={isSubmitted}
          />
          {errors.phoneNumber && <span className={styles['form__error-message']}>{errors.phoneNumber.message}</span>}
        </div>

        <div className={styles.form__field}>
          <label htmlFor="firstName">
            <Text color="secondary" view="p-16" className={styles['form__field-label']}>
              Имя:
            </Text>
          </label>
          <input
            id="firstName"
            className={errors.firstName ? styles.form__error : ''}
            {...register('firstName')}
            disabled={isSubmitted}
          />
          {errors.firstName && <span className={styles['form__error-message']}>{errors.firstName.message}</span>}
        </div>

        <div className={styles.form__field}>
          <label htmlFor="lastName">
            <Text color="secondary" view="p-16" className={styles['form__field-label']}>
              Фамилия:
            </Text>
          </label>
          <input
            id="lastName"
            className={errors.lastName ? styles.form__error : ''}
            {...register('lastName')}
            disabled={isSubmitted}
          />
          {errors.lastName && <span className={styles['form__error-message']}>{errors.lastName.message}</span>}
        </div>

        <Button className={styles.form__btn} type="submit" disabled={isSubmitted}>
          Оставить заявку
        </Button>
      </form>

      {isSubmitted && (
        <Text color="primary" view="p-22" align="center" className={styles.form__submitted}>
          Ваша заявка успешно отправлена. В ближайшее время мы свяжемся с вами для уточнения деталей доставки
        </Text>
      )}
    </div>
  );
};

export default CartForm;
