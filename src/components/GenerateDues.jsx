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
    var start, end;
    const startComp = parseInt(startMonth.value);
    const endComp = parseInt(endMonth.value);

    if (startComp === 3 || startComp === 4) start = (startComp - 3).toString();
    else if (startComp >= 6 && startComp <= 11)
      start = (startComp - 4).toString();
    else start = (startComp + 8).toString();

    if (endComp === 3 || endComp === 4) end = (endComp - 3).toString();
    else if (endComp >= 6 && endComp <= 11) end = (endComp - 4).toString();
    else end = (endComp + 8).toString();

    if (end < start) {
      toast.error('Start Month is greater than end month', {
        position: 'top-right',
      });
      return;
    }

    try {
      setLoading(true);
      const url =
        BASE_URL +
        `/admin/generateDues?startDate=${start}&endDate=${end}&grade=${!grade?.value ? '' : grade.value}`;
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
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 xl:ml-64">
      <div className="flex flex-col items-start justify-center mt-5">
        <label
          className={`font-semibold select-none sm:text-2xl sm:font-bold text-light whitespace-nowrap`}
          htmlFor="startMonth"
        >
          Start Month *
        </label>
        <Select
          styles={{
            input: (basestyles, state) => ({
              ...basestyles,
              padding: 6,
            }),
          }}
          className=" w-[300px] text-sm border rounded-md outline-none sm:text-xl border-appBar"
          name="startMonth"
          placeholder={'Select Month'}
          defaultValue={startMonth}
          onChange={setStartMonth}
          options={months}
          value={startMonth}
        ></Select>
      </div>
      <div className="flex flex-col items-start justify-center mt-5">
        <label
          className={`font-semibold select-none sm:text-2xl sm:font-bold text-light whitespace-nowrap`}
          htmlFor="endMonth"
        >
          End Month *
        </label>
        <Select
          styles={{
            input: (basestyles, state) => ({
              ...basestyles,
              padding: 6,
            }),
          }}
          className="w-[300px] text-sm border rounded-md outline-none sm:text-xl border-appBar"
          name="endMonth"
          placeholder={'Select Month'}
          defaultValue={endMonth}
          onChange={setEndMonth}
          options={months}
          value={endMonth}
        ></Select>
      </div>
      <div className="flex flex-col items-start justify-center mt-5">
        <label
          className={`font-semibold select-none sm:text-2xl sm:font-bold text-light whitespace-nowrap`}
          rel="Grade"
        >
          Grade
        </label>
        <Select
          styles={{
            input: (basestyles, state) => ({
              ...basestyles,
              padding: 6,
            }),
          }}
          className="w-[300px] text-sm border rounded-md outline-none sm:text-xl border-appBar"
          name="Grade"
          placeholder={'Select Grade'}
          defaultValue={endMonth}
          onChange={setGrade}
          options={grades}
          value={grade}
        ></Select>
      </div>
      <Button text={'Generate'} onClick={onCLick}></Button>
    </div>
  );
};

export default GenerateDues;
