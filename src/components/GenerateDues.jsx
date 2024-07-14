import React, { useState } from 'react';
import Select from 'react-select';
import { grades, months } from '../data';
import Button from './Button';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../api/adminRequests';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GenerateDues = () => {
  const date = new Date();
  const index = date.getMonth();
  const [startMonth, setStartMonth] = useState({});
  const [endMonth, setEndMonth] = useState({});
  const [grade, setGrade] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function onCLick() {
    if (!startMonth?.value || !endMonth?.value) {
      toast.error('Please provide the mandatory fields', {
        position: 'top-right',
      });
      return;
    }
    if (endMonth.value < startMonth.value) {
      toast.error('Start Month is greater than end month', {
        position: 'top-right',
      });
      return;
    }

    try {
      setLoading(true);
      const url =
        BASE_URL +
        `/admin/generateDues?startDate=${startMonth.value}&endDate=${endMonth.value}&grade=${!grade?.value ? '' : grade.value}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setLoading(false);
      navigate('/generatedDues', { state: { data: data?.data } });
    } catch (error) {
      toast.error('Something went wrong', { position: 'top-right' });
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 ml-96 bg-dark">
      <div className="flex flex-col items-start justify-center mt-5">
        <label className={`text-2xl font-bold text-light`} rel="Grade">
          Start Month *
        </label>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '26px',
              width: '264px',
              marginTop: '10px',
            }),
          }}
          placeholder={'Select Month'}
          defaultValue={startMonth}
          onChange={setStartMonth}
          options={months.slice(0, index)}
          value={startMonth}
        ></Select>
      </div>
      <div className="flex flex-col items-start justify-center mt-5">
        <label className={`text-2xl font-bold text-light`} rel="Grade">
          End Month *
        </label>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '26px',
              width: '264px',
              marginTop: '10px',
            }),
          }}
          placeholder={'Select Month'}
          defaultValue={endMonth}
          onChange={setEndMonth}
          options={months.slice(0, index)}
          value={endMonth}
        ></Select>
      </div>
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
              marginTop: '10px',
            }),
          }}
          placeholder={'Select Grade'}
          defaultValue={endMonth}
          onChange={setGrade}
          options={grades}
          value={grade}
        ></Select>
      </div>
      <Button text={'Generate'} onClick={onCLick}></Button>
      <Toaster />
    </div>
  );
};

export default GenerateDues;
