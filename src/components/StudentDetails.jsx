import React, { useState } from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import toast, { Toaster } from 'react-hot-toast';
import FormBox from './FormBox';
import Select from 'react-select';
import { grades } from '../data';
import { BASE_URL } from '../api/adminRequests';
import axios from 'axios';
import Button from './Button';
const StudentDetails = () => {
  const [admno, setAdmno] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [grade, setGrade] = useState({});
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [present, setPresent] = useState(true);

  const submitHandler = async () => {
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
      return;
    }
    if (phone.length < 10 || (altPhone && altPhone.length < 10)) {
      toast.error('Invalid Phone Number', { position: 'top-right' });
      return;
    }
    if (!grade) {
      toast.error('Please select a class', { position: 'top-right' });
      return;
    }
    const url = BASE_URL + '/admin/updateStudent';
    try {
      await axios.put(
        url,
        {
          admno,
          firstName,
          ...(lastName.length > 0 && { lastName }),
          grade: grade.value,
          ...(middleName.length > 0 && { middleName }),
          phone,
          ...(altPhone.length > 0 && { alternatePhone: altPhone }),
        },
        { withCredentials: true }
      );
      toast.success('Student Updated Successfully!', { position: 'top-right' });
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 409) {
        toast.error('Student with that admission does not exist', {
          position: 'top-right',
        });
      } else if (statusCode === 404) {
        toast.error('All fields are required', { position: 'top-right' });
      } else if (statusCode === 400) {
        toast.error('Failed to update student', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    }
  };
  const handleDelete = async () => {
    if (!admno || admno.length === 0) {
      toast.error('Admission No. is required', { position: 'top-right' });
      return;
    }
    const url = BASE_URL + '/admin/inactivateStudent';
    try {
      await axios.post(url, { admno }, { withCredentials: true });
      toast.success('Student deleted Successfully', { position: 'top-right' });
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 409) {
        toast.error('Failed to inactivate student', {
          position: 'top-right',
        });
      } else if (statusCode === 404) {
        toast.error('Student not found', { position: 'top-right' });
      } else if (statusCode === 400) {
        toast.error('Failed to delete student', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    }
  };

  const onClickHandler = async () => {
    if (admno == null || admno.length === 0) {
      toast.error('Admission Number is required', { position: 'top-right' });
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setGrade({});
      setPhone('');
      setAltPhone('');
      setPresent(true);

      return;
    }
    const url = BASE_URL + `/admin/getallstudent?admno=${admno}`;
    axios
      .get(url, { withCredentials: true })
      .then(data => {
        const result = data?.data?.data;
        setPresent(result?.present);
        setFirstName(result?.studentExists?.firstName);
        if (result?.studentExists?.lastName != null)
          setLastName(result?.studentExists?.lastName);
        if (result?.studentExists?.middleName != null)
          setMiddleName(result?.studentExists?.middleName);
        setGrade({
          ...grade,
          ...{
            label: result?.studentExists?.grade,
            value: result?.studentExists?.grade,
          },
        });
        setPhone(result?.studentExists?.phone);
        if (result?.studentExists?.alternatePhone)
          setAltPhone(result?.studentExists?.alternatePhone);
      })
      .catch(error => {
        const status = error?.response?.status;
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setGrade({});
        setPhone('');
        setAltPhone('');
        setPresent(true);
        if (status === 404)
          toast.error('Student Not Found', { position: 'top-right' });
        else toast.error('Something went wrong', { position: 'top-right' });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark ml-96">
      <div className="grid grid-cols-2 gap-5 justify-items-center">
        <ButtonWithIcon
          src={'src/assets/search.png'}
          onClickHandler={onClickHandler}
          label={'Admission No.'}
          value={admno}
          setValue={setAdmno}
        ></ButtonWithIcon>
        <FormBox
          label={'First Name'}
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
        <FormBox label={'Phone'} setField={setPhone} value={phone}></FormBox>
        <FormBox
          label={'Alternate Phone'}
          setField={setAltPhone}
          value={altPhone}
        ></FormBox>
        <div className="flex flex-col items-start justify-center mt-5">
          <label className={`text-2xl font-bold text-light`} rel="Grade">
            Grade
          </label>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: '26px',
                width: '264px',
              }),
            }}
            placeholder={'Select Class'}
            defaultValue={grade}
            onChange={setGrade}
            options={grades}
            value={grade}
          ></Select>
        </div>
      </div>
      {!present && (
        <span className="mt-3 text-xl font-bold text-light">
          *No Longer Present
        </span>
      )}
      <div className="flex justify-center w-full gap-4">
        {present && <Button text={'Update'} onClick={submitHandler}></Button>}
        {present && (
          <button
            type="button"
            className="p-3 mt-5 text-2xl font-bold text-red-600 transition-all duration-300 delay-150 border border-red-600 rounded-md bg-light hover:ease-in-out hover:cursor-pointer hover:bg-red-300 "
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default StudentDetails;
