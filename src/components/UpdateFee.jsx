import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { grades } from '../data';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import FormBox from './FormBox';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';

const UpdateFee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [AdmFee, setAdmFee] = useState('');
  const [AnnualCharge, setAnnualCharge] = useState('');
  const [TuitionFee, setTuitionFee] = useState('');
  const [LabCharge, setLabCharge] = useState('');
  const [ProsReg, setProsReg] = useState('');
  const [StationaryFee, setStationaryFee] = useState('');
  const [ExamFee, setExamFee] = useState('');
  const [TotalFee, setTotalFee] = useState('');
  const timeoutRef = useRef(null);
  async function onClickHandler() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (
      selectedGrade == null ||
      AdmFee == '' ||
      AnnualCharge == '' ||
      TuitionFee == '' ||
      LabCharge == '' ||
      ProsReg == '' ||
      StationaryFee == '' ||
      ExamFee == '' ||
      TotalFee == ''
    ) {
      toast.error('All fields are mandatory', { position: 'top-right' });
      return;
    }
    try {
      const url = BASE_URL + '/admin/updateFee';
      await axios.put(url, {
        grade: selectedGrade?.value,
        ProsReg,
        AdmFee,
        AnnualCharge,
        TuitionFee,
        LabCharge,
        TotalFee,
        StationaryFee,
        ExamFee,
      });
      toast.success('Updated Successfully', { position: 'top-right' });

      timeoutRef.current = setTimeout(() => {
        // navigate(-1);
      }, 1000);
    } catch (error) {
      console.log(error);
      const statusCode = error.response?.status;
      if (statusCode === 404) {
        toast.error('Failed to Update', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    }
  }

  useEffect(() => {
    if (selectedGrade && selectedGrade != '') {
      const foundGrade = data.find(element => {
        return element.grade === selectedGrade?.value;
      });
      setAdmFee(foundGrade.AdmFee);
      setProsReg(foundGrade.ProsReg);
      setAnnualCharge(foundGrade.AnnualCharge);
      setExamFee(foundGrade.ExamFee);
      setLabCharge(foundGrade.LabCharge);
      setStationaryFee(foundGrade.StationaryFee);
      setTuitionFee(foundGrade.TuitionFee);
      setTotalFee(foundGrade.TotalFee);
    }
  }, [selectedGrade, data]);

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
      <div className="grid grid-cols-2 gap-5 justify-items-center">
        <FormBox
          label={'Pros&Reg Fee'}
          value={ProsReg}
          setField={setProsReg}
        ></FormBox>
        <FormBox
          label={'Adm Fee'}
          value={AdmFee}
          setField={setAdmFee}
        ></FormBox>
        <FormBox
          label={'Annual Charge'}
          value={AnnualCharge}
          setField={setAnnualCharge}
        ></FormBox>
        <FormBox
          label={'Tuition Fee'}
          value={TuitionFee}
          setField={setTuitionFee}
        ></FormBox>
        <FormBox
          label={'Lab Charge'}
          value={LabCharge}
          setField={setLabCharge}
        ></FormBox>
        <FormBox
          label={'Stationary Fee'}
          value={StationaryFee}
          setField={setStationaryFee}
        ></FormBox>
        <FormBox
          label={'Exam Fee'}
          value={ExamFee}
          setField={setExamFee}
        ></FormBox>
        <FormBox
          label={'Total Fee'}
          value={TotalFee}
          setField={setTotalFee}
        ></FormBox>
      </div>
      <Button text={'Update'} onClick={onClickHandler}></Button>
      <Toaster />
    </div>
  );
};

export default UpdateFee;
