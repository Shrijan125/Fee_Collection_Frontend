import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { BASE_URL } from '../../api/adminRequests';
import FormBox from '../FormBox';
import Button from '../Button';
const CollectPayment = () => {
  const [data,setData]=useState([]);
  const [selectedUniform,setSelectedUniform]=useState(null);
  const [quantity,setQuantity]=useState('');
  const [amount,setAmount]=useState('');
  const options=useRef([]);
  useEffect(() => {
    const url = BASE_URL + '/admin/getDressDetails';
    axios
      .get(url, { withCredentials: true })
      .then(response => {
        const rep = response.data.data;
        setData([...data, ...rep]);
        rep.map(element=>{
          options.current.push({label:element.name,value:element.code});
        });
      })
      .catch(error => {
        toast.error('Something went wrong', { position: 'top-right' });
      })
  }, []);

  useEffect(()=>{
  const item=data.find(item => item.code===selectedUniform?.value);
  const price=(parseInt(quantity) || 0) * (item?.price || 0);
  setAmount(price);
  },[selectedUniform,quantity]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen mt-16 mb-10 overflow-y-auto sm:mt-10 xl:ml-64 print:ml-0 print:bg-none">
      <div className='flex items-end gap-10'>
    <div className='flex justify-center w-full gap-5'>
    <div className="flex flex-col items-start justify-center mt-5">
          <label
            className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
            htmlFor="uniform"
          >
            Uniform
          </label>
          <Select
            styles={{
              input: (basestyles, state) => ({
                ...basestyles,
                padding: 6,
              }),
            }}
            className="w-[300px] text-sm border rounded-md outline-none bg-appBar sm:text-xl border-appBar"
            placeholder={'Select Uniform'}
            defaultValue={selectedUniform}
            onChange={setSelectedUniform}
            options={options?.current}
            value={selectedUniform}
            name="uniform"
          />
        </div>
        <FormBox label={'Quantity'} setField={setQuantity} required value={quantity}></FormBox>
        <FormBox label={'Amount'} setField={setAmount} disabled value={amount}></FormBox>
    </div>
    <Button text={'Add'} onClick={()=>{}}></Button>
    </div>
    
    </div>
  )
}

export default CollectPayment