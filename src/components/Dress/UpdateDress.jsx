import React, { useState, useEffect, useRef } from 'react';
import { dressDetails } from '../../data';
import Select from 'react-select';
import FormBox from '../FormBox';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../api/adminRequests';
import axios from 'axios';

const UpdateDress = () => {
  const location = useLocation();
  const [dressName, setDressName] = useState(null);
  const [dressPrice, setDressPrice] = useState('');
  const [quantity, setDressQuantity] = useState('');
  const { data } = location.state || {};
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (dressName && dressName != {}) {
      const foundDress = data.find(element => {
        return element.name === dressName?.label;
      });
      setDressPrice(foundDress?.price);
      setDressQuantity(foundDress?.quantity);
    }
  }, [dressName, data]);

  async function onClickHandler() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (dressName === null || dressPrice === '' || quantity === '') {
      toast.error('All fields are mandatory', { position: 'top-right' });
      return;
    }
    try {
      const url = BASE_URL + '/admin/updateDressDetails';
      await axios.put(
        url,
        {
          name: dressName?.label,
          price: dressPrice,
          quantity,
        },
        { withCredentials: true }
      );
      toast.success('Updated Successfully', { position: 'top-right' });
      timeoutRef.current = setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.log(error);
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        toast.error('Failed to Update', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen mt-16 mb-10 sm:mt-10 xl:ml-64 print:ml-0 print:bg-none">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col items-start justify-center mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            htmlFor="name"
          >
            Dress
          </label>
          <Select
            styles={{
              input: (basestyles, state) => ({
                ...basestyles,
                padding: 6,
              }),
            }}
            className="w-[270px]  text-sm border rounded-md outline-none bg-appBar sm:text-xl border-appBar"
            placeholder={'Select Dress'}
            defaultValue={dressName}
            onChange={setDressName}
            options={dressDetails}
            value={dressName}
            name="name"
          />
        </div>
        <FormBox
          label={'Price'}
          setField={setDressPrice}
          value={dressPrice}
        ></FormBox>
        <FormBox
          label={'Quantity'}
          setField={setDressQuantity}
          value={quantity}
        ></FormBox>
      </div>
      <Button onClick={onClickHandler} text={'Update'}></Button>
    </div>
  );
};

export default UpdateDress;
