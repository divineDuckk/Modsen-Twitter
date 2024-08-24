import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  INITIAL_STATE_DAY,
  INITIAL_STATE_MONTH,
  INITIAL_STATE_YEAR,
} from './constants';
import styles from './registration.module.scss';

import { registerWithEmail } from '@/api/registerWithEmail';
import twiiterLogo from '@/assets/twitter-logo.svg';
import { DataInput } from '@/components/DataInput';
import { DropDown } from '@/components/DropDown';
import { DAYS_ARRAY, MONTHS, PROFILE_ROUTE, SIGN_UP_ROUTE } from '@/constants';
import { setUser } from '@/store/slices/userSlice';
import { getFullBirthDate } from '@/utils/functions/getFullBirthDate';
import { getYearsArray } from '@/utils/functions/getYearsArray';


export const Registration = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedMonth, setSelectedMonth] = useState(INITIAL_STATE_MONTH);
  const [selectedDay, setSelectedDay] = useState(INITIAL_STATE_DAY);
  const [selectedYear, setSelectedYear] = useState(INITIAL_STATE_YEAR);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dateInputs = [
    {
      inputValue: name,
      placeholder: 'Name',
      setInputValue: setName,
      type: 'text',
    },
    {
      inputValue: phoneNumber,
      placeholder: 'Phone number',
      setInputValue: setPhoneNumber,
      type: 'tel',
    },
    {
      inputValue: email,
      placeholder: 'Email',
      setInputValue: setEmail,
      type: 'email',
    },
    {
      inputValue: password,
      placeholder: 'Password',
      setInputValue: setPassword,
      type: 'password',
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await registerWithEmail({
      birthDate: getFullBirthDate(selectedDay, selectedMonth, selectedYear),
      email,
      name,
      password,
      phoneNumber,
    });
    dispatch(setUser(user));
    navigate(PROFILE_ROUTE + user?.uid);
  };

  return (
    <div className={styles.registrationWrap}>
      <form onSubmit={handleSubmit} className={styles.registration}>
        <div className={styles.twitterLogoWrap}>
          <img src={twiiterLogo} alt="twiiter logo" />
        </div>
        <h2>Create an account</h2>
        {dateInputs.map(({ inputValue, placeholder, setInputValue, type }) => (
          <DataInput
            key={placeholder}
            inputValue={inputValue}
            placeholder={placeholder}
            setInputValue={setInputValue}
            type={type}
            required
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
