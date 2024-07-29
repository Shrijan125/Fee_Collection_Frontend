import React, { useState } from 'react';
import FormBox from './FormBox';
import Button from './Button';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../api/adminRequests';
import axios from 'axios';
import { grades, avlgender } from '../data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddStudent = () => {
  const [grade, setgrade] = useState(null);
  const [admno, setAdmno] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [checkaadhar, setCheckAadhar] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [hostel, setHostel] = useState(false);
  const [transport, setTransport] = useState(false);
  const [feeWaiver, setFeeWaiver] = useState(false);
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [DOB, setDOB] = useState(null);
  const [section, setSection] = useState('');
  async function onClickHandler() {
    setLoading(true);
    if (
      !grade ||
      !gender ||
      !DOB ||
      admno === '' ||
      name === '' ||
      phone === '' ||
      bloodGroup === '' ||
      address === '' ||
      aadhar === '' ||
      checkaadhar === '' ||
      fathersName === '' ||
      mothersName === '' ||
      section === ''
    ) {
      toast.error('Please fill the mandatory fields', {
        position: 'top-right',
      });
      setLoading(false);
      return;
    }
    if (aadhar !== checkaadhar) {
      toast.error('Aadhar Number does not match', {
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
    const url = BASE_URL + '/admin/createStudent';
    const data = {
      Name: name,
      admno,
      DOB,
      grade: grade?.value,
      phone,
      fathersName,
      bloodGroup,
      mothersName,
      hostelFacility: hostel,
      TransportFacility: transport,
      feeWaiver: feeWaiver,
      Aadhar: aadhar,
      Address: address,
      section,
      Gender: gender?.value,
      ...(altPhone && { alternatePhone: altPhone }),
    };
    try {
      await axios.post(url, data, { withCredentials: true });

      toast.success('Student Added Successfully!', { position: 'top-right' });
      setLoading(false);
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 409) {
        toast.error('Student with that admission number already exists', {
          position: 'top-right',
        });
      } else if (statusCode === 404) {
        toast.error('All fields are required', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full mt-16 mb-10 overflow-y-auto sm:mt-10 xl:ml-64 print:ml-0 print:bg-none">
      <div className="flex flex-col md:grid md:grid-cols-2 lg:gap-2 lg:mx-4 lg:grid-cols-3 md:gap-2 print:hidden">
        <FormBox
          label={'Admission No.'}
          required={true}
          value={admno}
          setField={setAdmno}
        ></FormBox>
        <FormBox
          label={'Name'}
          required={true}
          value={name}
          setField={setName}
        ></FormBox>
        <FormBox
          label={"Father's Name"}
          value={fathersName}
          required
          setField={setFathersName}
        ></FormBox>
        <FormBox
          label={"Mother's Name"}
          value={mothersName}
          setField={setMothersName}
          required
        ></FormBox>
        <div className="flex flex-col items-start justify-center w-full mt-3 sm:mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            htmlFor="Gender"
          >
            Gender *
          </label>
          <Select
            styles={{
              input: (basestyles, state) => ({
                ...basestyles,
                padding: 6,
              }),
            }}
            className="w-full text-sm border rounded-md outline-none sm:text-xl border-appBar"
            placeholder={'Select Gender'}
            defaultValue={gender}
            onChange={setGender}
            options={avlgender}
            value={gender}
            name="Gender"
          ></Select>
        </div>
        <FormBox
          label={'Blood Group'}
          required={true}
          value={bloodGroup}
          setField={setBloodGroup}
        ></FormBox>
        <FormBox
          label={'Aadhar'}
          required={true}
          value={aadhar}
          setField={setAadhar}
        ></FormBox>
        <div className="flex flex-col items-start justify-center mt-3 sm:mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            htmlFor="re-aadhar"
          >
            Re-enter Aadhar*
          </label>
          <input
            className="p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar"
            type="password"
            name="re-aadhar"
            value={checkaadhar}
            onChange={e => {
              setCheckAadhar(e.target.value);
            }}
            onCopy={e => e.preventDefault()}
            onCut={e => e.preventDefault()}
            onPaste={e => e.preventDefault()}
          ></input>
        </div>
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
        <div className="flex flex-col items-start justify-center w-full mt-3 sm:mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            htmlFor="Grade"
          >
            Class*
          </label>
          <Select
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                padding: 6,
              }),
            }}
            className="w-full text-sm border rounded-md outline-none sm:text-xl border-appBar"
            name="Grade"
            placeholder={'Select Class'}
            defaultValue={grade}
            onChange={setgrade}
            options={grades}
            value={grade}
          ></Select>
        </div>
        <FormBox
          required
          label={'Section'}
          value={section}
          setField={setSection}
        ></FormBox>
        <div className="flex flex-col items-start justify-center w-full mt-3 sm:mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            rel="DOB"
          >
            DOB*
          </label>
          <DatePicker
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            name="DOB"
            calendarIconClassName="text-xl right-2   items-center mt-2 hover:bg-inactive rounded-md hover:ease-in-out"
            className="p-3 text-xl font-bold border rounded-md outline-none h-14 text-appBar"
            showIcon
            toggleCalendarOnIconClick
            selected={DOB}
            onChange={date => setDOB(date)}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full mt-5 sm:col-span-2">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            htmlFor="Address"
          >
            Address*
          </label>
          <input
            className="w-full p-3 text-sm font-bold border rounded-md outline-none sm:text-xl text-appBar border-appBar"
            name="Address"
            value={address}
            onChange={e => {
              setAddress(e.target.value);
            }}
          ></input>
        </div>

        <div className="flex flex-col items-center w-full col-span-2 gap-4 text-center sm:gap-5 sm:items-start sm:justify-around sm:flex-row">
          <div className="flex items-center justify-center mt-2">
            <label
              className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
              htmlFor="hostelFacility"
            >
              Hostel Facility
            </label>
            <input
              className="w-6 h-6 ml-3 bg-gray-100 border-gray-300 text-appBar rounded-8 focus:ring-appBar"
              type="checkbox"
              id="hostelFacility"
              name="hostelFacility"
              checked={hostel}
              onChange={e => {
                setHostel(e.target.checked);
              }}
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <label
              className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
              htmlFor="transport"
            >
              Transport
            </label>
            <input
              className="w-6 h-6 ml-3 text-blue-600 bg-gray-100 border-gray-300 rounded-8 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              id="transport"
              name="transport"
              checked={transport}
              onChange={e => {
                setTransport(e.target.checked);
              }}
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <label
              className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
              htmlFor="feewaiver"
            >
              Fee Waiver
            </label>
            <input
              className="w-6 h-6 ml-3 text-blue-600 bg-gray-100 border-gray-300 rounded-8 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              id="feewaiver"
              name="feewaiver"
              checked={feeWaiver}
              onChange={e => {
                setFeeWaiver(e.target.checked);
              }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center mt-5">
          {' '}
          <ClipLoader color="#F9F7F7" className="flex justify-center" />
        </div>
      ) : (
        <Button text={'Submit'} onClick={onClickHandler}></Button>
      )}
    </div>
  );
};

export default AddStudent;
