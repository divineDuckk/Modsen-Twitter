import { useState } from 'react';
import { Link } from 'react-router-dom';

import { DataInput } from '@/components/DataInput';
import { DAYS_ARRAY, MONTHS, SIGN_UP_ROUTE } from '@/constants';
import { DropDown } from '@/components/DropDown';
import { getYearsArray } from '@/utils/functions/getYearsArray';
import twiiterLogo from '@/assets/twitter-logo.svg';

import styles from './registration.module.scss';

export const Registration = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className={styles.registrationWrap}>
      <div className={styles.registration}>
        <div className={styles.twitterLogoWrap}>
          <img src={twiiterLogo} alt="twiiter logo" />
        </div>
        <h2>Create an account</h2>
        <DataInput
          inputValue={name}
          placeholder="Name"
          setInputValue={setName}
          type="text"
          required
        />
        <DataInput
          inputValue={phoneNumber}
          placeholder="Phone number"
          setInputValue={setPhoneNumber}
          type="tel"
          required
        />
        <DataInput
          inputValue={email}
          placeholder="Email"
          setInputValue={setEmail}
          type="email"
          required
        />
        <Link to={SIGN_UP_ROUTE}>Use email</Link>
        <h3>Date of birth</h3>
        <p>
          Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit.
          Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim
          nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra
          dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
        </p>
        <div className={styles.birthInfo}>
          <DropDown options={MONTHS} placeholder="Month" />
          <div className={styles.daysAndYears}>
            <DropDown options={DAYS_ARRAY} placeholder="Day" />
            <DropDown options={getYearsArray()} placeholder="Year" />
          </div>
        </div>
      </div>
    </div>
  );
};
