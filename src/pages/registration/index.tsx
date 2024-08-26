import {
  INITIAL_STATE_DAY,
  INITIAL_STATE_MONTH,
  INITIAL_STATE_YEAR,
} from './constants';
import {
  DAYS_ARRAY,
  EMAIL_REGEXP,
  ERRORS,
  MONTHS,
  PASSWORD_MIN_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEXP,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
} from '@/constants';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { registerWithEmail } from '@/api/registerWithEmail';
import { setUser } from '@/store/slices/userSlice';
import { getFullBirthDate } from '@/utils/functions/getFullBirthDate';
import { getYearsArray } from '@/utils/functions/getYearsArray';
import { DataInput } from '@/components/DataInput';
import { DropDown } from '@/components/DropDown';
import twiiterLogo from '@/assets/twitter-logo.svg';

import styles from './registration.module.scss';
import { FormValues } from './types';

export const Registration: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(INITIAL_STATE_MONTH);
  const [selectedDay, setSelectedDay] = useState(INITIAL_STATE_DAY);
  const [selectedYear, setSelectedYear] = useState(INITIAL_STATE_YEAR);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const dateInputs = [
    {
      name: 'name' as keyof FormValues,
      placeholder: 'Name',
      type: 'text',
      validation: { required: ERRORS.nameRequired },
    },
    {
      name: 'phoneNumber' as keyof FormValues,
      placeholder: 'Phone number',
      type: 'tel',
      validation: {
        pattern: {
          value: PHONE_REGEXP,
          message: ERRORS.phoneError,
        },
        minLength: {
          value: PHONE_MIN_LENGTH,
          message: ERRORS.shortPhone,
        },
      },
    },
    {
      name: 'email' as keyof FormValues,
      placeholder: 'Email',
      type: 'email',
      validation: {
        required: ERRORS.emailRequired,
        pattern: {
          value: EMAIL_REGEXP,
          message: ERRORS.emailError,
        },
      },
    },
    {
      name: 'password' as keyof FormValues,
      placeholder: 'Password',
      type: 'password',
      validation: {
        required: ERRORS.passwordRequired,
        minLength: {
          value: PASSWORD_MIN_LENGTH,
          message: ERRORS.shortPassword,
        },
      },
    },
  ];

  const onSubmit: SubmitHandler<FormValues> = async ({
    email,
    name,
    password,
    phoneNumber,
  }) => {
    if (
      selectedDay !== INITIAL_STATE_DAY &&
      selectedMonth !== INITIAL_STATE_MONTH &&
      selectedYear !== INITIAL_STATE_YEAR
    ) {
      const user = await registerWithEmail({
        birthDate: getFullBirthDate(selectedDay, selectedMonth, selectedYear),
        email,
        name,
        password,
        phoneNumber,
      });
      dispatch(setUser(user));
      navigate(PROFILE_ROUTE + user?.uid);
    }
  };

  return (
    <div className={styles.registrationWrap}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registration}>
        <div className={styles.twitterLogoWrap}>
          <img src={twiiterLogo} alt="twiiter logo" />
        </div>
        <h2>Create an account</h2>
        {dateInputs.map(({ name, placeholder, type, validation }) => (
          <DataInput
            key={name}
            placeholder={placeholder}
            type={type}
            {...register(name, validation)}
            error={errors[name]?.message}
          />
        ))}
        <Link to={SIGN_UP_ROUTE}>Use email</Link>
        <h3>Date of birth</h3>
        <p>
          Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit.
          Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim
          nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra
          dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
        </p>
        <div className={styles.birthInfo}>
          <DropDown
            options={MONTHS}
            setValue={setSelectedMonth}
            value={selectedMonth}
          />
          <div className={styles.daysAndYears}>
            <DropDown
              options={DAYS_ARRAY}
              setValue={setSelectedDay}
              value={selectedDay}
            />
            <DropDown
              options={getYearsArray()}
              setValue={setSelectedYear}
              value={selectedYear}
            />
          </div>
        </div>
        <button className={styles.submitButton} type="submit">
          Next
        </button>
      </form>
    </div>
  );
};
