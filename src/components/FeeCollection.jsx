import React, { useEffect, useRef } from 'react';
import FormBox from './FormBox';
import Button from './Button';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import toast, { Toaster } from 'react-hot-toast';
import { months } from '../data';
import Select from 'react-select';
import ButtonWithIcon from './ButtonWithIcon';

const FeeCollection = () => {
  const [admno, setAdmno] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [grade, setGrade] = useState('');
  const [feeForMonth, setFeeForMonth] = useState([]);
  const [amount, setAmount] = useState('');
  const [fine, setFine] = useState('');
  const [note, setNote] = useState('');
  const [utrNo, setUtrNo] = useState('');
  const dues = useRef([]);

  const submitHandler = async () => {
    if (!amount || !admno || feeForMonth.length === 0) {
      toast.error('Please fill the mandatory fields!', {
        position: 'top-right',
      });
      return;
    }
    const url = BASE_URL + `/admin/collectFee`;
    const createMonth = feeForMonth.map(element => element.value);
    try {
      const { data } = await axios.post(url, {
        admno,
        month: createMonth,
        amount,
        description: note,
        utrNo
      });
      toast.success('Transaction Successfull', { position: 'top-right' });
      setAdmno('');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setGrade('');
      setNote('');
      setUtrNo('');
      dues.current = [];
      setFeeForMonth([]);
    } catch (error) {
      const status = error.response.status;

      if (status === 409)
        toast.error('Failed to create Transaction', { position: 'top-right' });
      else if (status === 400)
        toast.error('Failed to collect Fee', { position: 'top-right' });
      else toast.error('Something went wrong', { position: 'top-right' });
    }
    return;
  };

  useEffect(() => {
    if (feeForMonth.length === 0) {
      setAmount('');
      setFine('');
      return;
    }
    var monthsUrl = '';
    feeForMonth.forEach(element => {
      monthsUrl = monthsUrl.concat(`&months=${element.value}`);
    });
    const url = BASE_URL + `/admin/calculateFee?grade=${grade}${monthsUrl}`;
    axios
      .get(url)
      .then(data => {
        setAmount(data.data.data.totalFee);
        setFine(data.data.data.fine);
      })
      .catch(error => {
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setGrade('');
        setFeeForMonth([]);
        setAmount('');
        setFine('');
        setNote('');
        setUtrNo('');
        toast.error('Failed to calculate Fee', { position: 'top-right' });
      });
  }, [feeForMonth]);

  const onClickHandler = async () => {
    dues.current = [];
    if (admno == null || admno.length === 0) {
      toast.error('Admission Number is required', { position: 'top-right' });
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setGrade('');
      setNote('');
      setUtrNo('');
      setFeeForMonth([]);

      return;
    }
    const url = BASE_URL + `/admin/getStudent?admno=${admno}`;
    axios
      .get(url)
      .then(data => {
        const result = data.data.data;
        setFirstName(result.firstName);
        if (result.lastName != null) setLastName(result.lastName);
        if (result.middleName != null) setMiddleName(result.middleName);
        setGrade(result.grade);
        if (result.description != null) setNote(result.description);
        for (let i = 0; i < 12; i++) {
          if (result.dues[i] === true)
            dues.current.push({ label: months[i].label, value: i });
        }
      })
      .catch(error => {
        const status = error.response.status;
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setGrade('');
        setFeeForMonth([]);
        setNote('');
        setUtrNo('');
        if (status == 404)
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
          disabled={true}
          label={'First Name'}
          value={firstName}
          setField={setFirstName}
        ></FormBox>
        <FormBox
          disabled={true}
          label={'Middle Name'}
          value={middleName}
          setField={setMiddleName}
        ></FormBox>
        <FormBox
          disabled={true}
          label={'Last Name'}
          value={lastName}
          setField={setLastName}
        ></FormBox>
        <FormBox
          disabled={true}
          label={'Class'}
          value={grade}
          setField={setGrade}
        ></FormBox>

        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '26px',
              width: '264px',
              marginTop: '50px',
            }),
          }}
          placeholder={'Select Month'}
          defaultValue={feeForMonth}
          onChange={setFeeForMonth}
          options={dues.current}
          isMulti={true}
          value={feeForMonth}
        ></Select>
        <FormBox label={'Amount'} setField={setAmount} value={amount}></FormBox>
        <FormBox label={'UTR NO'} setField={setUtrNo} value={utrNo}></FormBox>
        <div className="flex flex-col items-start justify-center w-full col-span-2 mt-5">
          <label className={`text-2xl font-bold text-light`} rel={''}>
            Description
          </label>
          <textarea
          value={note}
          onChange={(e)=>setNote(e.target.value)}
            className="w-full p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar disabled:bg-inactive"
            placeholder="Something to note...."
          ></textarea>
        </div>
      </div>

      {fine !== 0 && fine !== '' && (
        <span className="mt-3 text-xl font-bold text-light">
          * Late fine applicable: Rs.{fine}
        </span>
      )}
      <Button text={'Submit'} onClick={submitHandler}></Button>
      <Toaster />
    </div>
  );
};

export default FeeCollection;
