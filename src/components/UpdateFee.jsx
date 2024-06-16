import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { grades } from '../data';
import { useLocation, useNavigate } from 'react-router-dom';
import { months } from '../data';
import FormBox from './FormBox';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';

const UpdateFee = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [amount, setAmount] = useState('');
  const [amountArray, setAmountArray] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  async function onClickHandler() {
    setLoading(true);
    if (
      selectedGrade == null ||
      selectedMonth == null ||
      amount == null ||
      amount === '' ||
      amountArray == null ||
      amountArray.length === 0
    ) {
      toast.error('All fields are mandatory', { position: 'top-right' });
      setLoading(false);
      return;
    }
    try {
      const url = BASE_URL + '/admin/updateFee';
      await axios.put(url, {
        grade: selectedGrade.value,
        amount,
        month: selectedMonth?.value,
      });
      toast.success('Updated Successfully', { position: 'top-right' });

      timeoutRef.current = setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      const statusCode = error.response?.status;
      if (statusCode === 404) {
        toast.error('Failed to Update', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (selectedGrade) {
      const foundGrade = data.find(
        element => element.grade === selectedGrade.value
      );
      setAmountArray(foundGrade ? foundGrade.amount : null);
    } else {
      setAmountArray(null);
    }
  }, [selectedGrade, data]);

  useEffect(() => {
    if (amountArray && selectedMonth) {
      setAmount(amountArray[selectedMonth?.value] || '');
    } else {
      setAmount('');
    }
  }, [selectedMonth, amountArray]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark ml-96 print:hidden">
      <Select
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            fontSize: '26px',
            width: '264px',
            marginTop: '5px',
          }),
        }}
        placeholder={'Select Class'}
        defaultValue={selectedGrade}
        onChange={setSelectedGrade}
        options={grades}
      />
      <Select
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            fontSize: '26px',
            width: '264px',
            marginTop: '20px',
          }),
        }}
        placeholder={'Select Month'}
        defaultValue={selectedMonth}
        onChange={setSelectedMonth}
        options={months}
      />
      <FormBox label={'Amount'} setField={setAmount} value={amount} />
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-5 ">
          <ClipLoader color="#F9F7F7" className="flex justify-center" />
        </div>
      ) : (
        <Button text={'Update'} onClick={onClickHandler} />
      )}
      <Toaster />
    </div>
  );
};

export default UpdateFee;
