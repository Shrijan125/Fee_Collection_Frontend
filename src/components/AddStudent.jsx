import React, { useState } from 'react';
import FormBox from './FormBox';
import Button from './Button';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../api/adminRequests';
import axios from 'axios';
import { grades } from '../data';

const AddStudent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [admno, setAdmno] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function onClickHandler() {
    setLoading(true);
    if (
      !admno ||
      !firstName ||
      admno == '' ||
      firstName == '' ||
      !phone ||
      phone == ''
    ) {
      toast.error('Please fill the mandatory fields', {
        position: 'top-right',
      });
      setLoading(false);
      return;
    }
    if (phone.length < 10 || (altPhone && altPhone.length < 10)) {
      toast.error('Invalid Phone Number', { position: 'top-right' });
      setLoading(false);
      return;
    }
    if (!selectedOption) {
      toast.error('Please select a class', { position: 'top-right' });
      setLoading(false);
      return;
    }
    const url = BASE_URL + '/admin/createStudent';
    try {
      await axios.post(url, {
        admno,
        firstName,
        ...(lastName.length > 0 && { lastName }),
        grade: selectedOption.value,
        ...(middleName.length > 0 && { middleName }),
        phone,
        ...(altPhone.length > 0 && { altPhone }),
      });
      toast.success('Student Added Successfully!', { position: 'top-right' });
      setLoading(false);
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        toast.error('Student with that admission number already exists', {
          position: 'top-right',
        });
      } else if (statusCode === 404) {
        toast.error('All fields are required', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark ml-96">
      <div className="grid grid-cols-2 gap-5 justify-items-center">
        <FormBox
          label={'Admission No.'}
          required={true}
          value={admno}
          setField={setAdmno}
        ></FormBox>
        <FormBox
          label={'First Name'}
          required={true}
          value={firstName}
          setField={setFirstName}
        ></FormBox>
        <FormBox
          label={'Middle Name'}
          value={middleName}
          setField={setMiddleName}
        ></FormBox>
        <FormBox
          label={'Last Name'}
          value={lastName}
          setField={setLastName}
        ></FormBox>

        <FormBox
          label={'Phone Number'}
          required={true}
          value={phone}
          setField={setPhone}
        ></FormBox>
        <FormBox
          label={'Alternate Phone'}
          value={altPhone}
          setField={setAltPhone}
        ></FormBox>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '26px',
              width: '264px',
              marginTop: '5px',
            }),
          }}
          placeholder={'Select Class'}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={grades}
        ></Select>
      </div>
      {loading ? (
        <div className="flex justify-center mt-5">
          {' '}
          <ClipLoader color="#F9F7F7" className="flex justify-center" />
        </div>
      ) : (
        <Button text={'Submit'} onClick={onClickHandler}></Button>
      )}
      <Toaster />
    </div>
  );
};

export default AddStudent;
