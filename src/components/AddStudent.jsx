import React, { useState } from 'react'
import FormBox from './FormBox';
import Button from './Button';



const AddStudent = () => {
  
    const [admno,setAdmno]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [middleName,setMiddleName]=useState('');
    const [grade,setGrade]=useState('');
    const [phone,setPhone]=useState('');
    const [altPhone,setAltPhone]=useState('');

    return ( 
      <div className='flex flex-col items-center justify-center w-screen h-screen bg-dark ml-96'>
      <div className='grid grid-cols-2 gap-5 justify-items-center'>
          <FormBox  label={'Admission No.'} required={true}  value={admno} setField={setAdmno}></FormBox>
          <FormBox label={'First Name'}  required={true} value={firstName} setField={setFirstName}></FormBox>
          <FormBox label={'Middle Name'} value={middleName} setField={setMiddleName}></FormBox>
          <FormBox label={'Last Name'} value={lastName} setField={setLastName}></FormBox>
          <FormBox label={'Class'}  required={true} value={grade} setField={setGrade}></FormBox>
          <FormBox label={'Phone Number'}  required={true} value={phone} setField={setPhone}></FormBox>
          <FormBox label={'Alternate Phone' } value={altPhone} setField={setAltPhone}></FormBox>
          
       </div> 
       <Button text={'Confirm'}></Button> 
        </div>
  );
}

export default AddStudent