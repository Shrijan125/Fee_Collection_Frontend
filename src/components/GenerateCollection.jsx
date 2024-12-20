import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../api/adminRequests';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const GenerateCollection = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const currentYear = new Date().getFullYear();
  const januaryFirst = new Date(currentYear, 0, 1);
  januaryFirst.setHours(0, 0, 0, 0);
  const navigate = useNavigate();

  async function onClick() {
    if (!startDate || !endDate) {
      toast.error('Please Select the mandatory fields', {
        position: 'top-right',
      });
      return;
    }
    try {
      const url =
        BASE_URL +
        `/admin/generateCollection?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      const { data } = await axios.get(url, { withCredentials: true });
      const rep = data?.data;
      const x = rep.map(element => {
        const createdAt = moment(element?.createdAt).format('DD/MM/YYYY');
        return [
          element?.student?.admno,
          element?.student?.Name,
          element?.student?.bankName,
          element?.utrNo ? element?.utrNo : '',
          createdAt,
          element?.amount,
        ];
      });

      navigate('/generatedCollection', { state: { data: x } });
    } catch (error) {
      toast.error('Something went wrong', { position: 'top-right' });
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 xl:ml-64">
      <div className="gap-8 sm:flex">
        <div className="flex flex-col items-start justify-center mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            rel="startDate"
          >
            Start Date *
          </label>
          <DatePicker
            maxDate={new Date()}
            minDate={januaryFirst}
            dateFormat="dd/MM/yyyy"
            calendarIconClassName="text-xl right-2  items-center mt-1 hover:bg-inactive rounded-md hover:ease-in-out"
            className="w-full h-12 rounded-md"
            showIcon
            toggleCalendarOnIconClick
            selected={startDate}
            name="startDate"
            onChange={date => setStartDate(date)}
          />
        </div>
        <div className="flex flex-col items-start justify-center mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            rel="endDate"
          >
            End Date *
          </label>
          <DatePicker
            minDate={startDate}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            calendarIconClassName="text-xl right-2  items-center mt-1 hover:bg-inactive rounded-md hover:ease-in-out"
            className="w-full h-12 rounded-md"
            showIcon
            name="endDate"
            toggleCalendarOnIconClick
            selected={endDate}
            onChange={date => setEndDate(date)}
          />
        </div>
      </div>

      <Button text={'Generate'} onClick={onClick}></Button>
    </div>
  );
};

export default GenerateCollection;
