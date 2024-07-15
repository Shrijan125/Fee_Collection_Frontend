import React, { useState, useRef, useEffect } from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import FormBox from './FormBox';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../api/adminRequests';
import axios from 'axios';
import { months } from '../data';
import CheckBox from './CheckBox';
import Button from './Button';
import Receipt from './Receipt/receipt';
import { ClipLoader } from 'react-spinners';
const FeeCollection = () => {
  const dues = useRef([]);
  const [formData, setFormData] = useState({
    admno: '',
    description: '',
    name: '',
    grade: '',
    section: '',
    tutFee: '',
    annDevChargeP: false,
    exam1P: false,
    exam2P: false,
    stat1P: false,
    annDevCharge: '',
    exam1: '',
    exam2: '',
    stat1: '',
    stat2: '',
    stat2P: '',
    feeForMonth: [],
    prevDues: '',
    discount: '',
    receiptNo: '',
    labCharge: '',
  });

  const [annFee, setAnnFee] = useState(false);
  const [exm1, setexm1] = useState(false);
  const [exm2, setexm2] = useState(false);
  const [stat1, setstat1] = useState(false);
  const [stat2, setstat2] = useState(false);
  const [amount, setAmount] = useState('');
  const [fine, setFine] = useState('');
  const [txnno, settxnno] = useState('');
  const [bankName, setBankName] = useState('');
  const [print, setPrint] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetFormData = () => {
    setFormData({
      admno: '',
      description: '',
      name: '',
      grade: '',
      section: '',
      tutFee: '',
      feeForMonth: [],
      annDevChargeP: false,
      exam1P: false,
      exam2P: false,
      stat1P: false,
      stat2P: false,
      stat2: '',
      annDevCharge: '',
      exam1: '',
      exam2: '',
      stat1: '',
      prevDues: '',
      discount: '',
      receiptNo: '',
      labCharge:''
    });
    setAnnFee(false);
    setexm1(false);
    setexm2(false);
    setstat1(false);
    setstat2(false);
    setAmount('');
    setFine('');
    setBankName('');
    settxnno('');
  };

  useEffect(() => {
    if (annFee)
      setAmount(amount =>
        (
          parseInt(amount || 0) + parseInt(formData?.annDevCharge || 0)
        ).toString()
      );
    if (!annFee && amount != '')
      setAmount(amount =>
        (
          parseInt(amount || 0) - parseInt(formData?.annDevCharge || 0)
        ).toString()
      );
  }, [annFee]);

  useEffect(() => {
    if (exm1)
      setAmount(amount =>
        (parseInt(amount || 0) + parseInt(formData?.exam1 || 0)).toString()
      );
    if (!exm1 && amount != '')
      setAmount(amount =>
        (parseInt(amount || 0) - parseInt(formData?.exam1 || 0)).toString()
      );
  }, [exm1]);

  useEffect(() => {
    if (exm2)
      setAmount(amount =>
        (parseInt(amount || 0) + parseInt(formData?.exam2 || 0)).toString()
      );
    if (!exm2 && amount != '')
      setAmount(amount =>
        (parseInt(amount || 0) - parseInt(formData?.exam2 || 0)).toString()
      );
  }, [exm2]);

  useEffect(() => {
    if (stat1)
      setAmount(amount =>
        (parseInt(amount || 0) + parseInt(formData?.stat1 || 0)).toString()
      );
    if (!stat1 && amount != '')
      setAmount(amount =>
        (parseInt(amount || 0) - parseInt(formData?.stat1 || 0)).toString()
      );
  }, [stat1]);

  useEffect(() => {
    if (stat2)
      setAmount(amount =>
        (parseInt(amount || 0) + parseInt(formData?.stat2 || 0)).toString()
      );
    if (!stat2 && amount != '')
      setAmount(amount =>
        (parseInt(amount || 0) - parseInt(formData?.stat2 || 0)).toString()
      );
  }, [stat2]);

  useEffect(() => {
    if (formData?.feeForMonth.length === 0) {
      setAmount('');
      setFine('');
      setAnnFee(false);
      setexm1(false);
      setexm2(false);
      setstat1(false);
      setstat2(false);
      return;
    }
    var monthsUrl = '';
    formData?.feeForMonth.forEach(element => {
      monthsUrl = monthsUrl.concat(`&months=${element.value}`);
    });
    const fee=(parseInt(formData?.labCharge || 0)+parseInt(formData?.tutFee || 0)).toString();
    const url =
      BASE_URL + `/admin/calculateFee?tutfee=${fee}${monthsUrl}`;
    axios
      .get(url, { withCredentials: true })
      .then(data => {
        setAmount(data?.data?.data?.totalFee);
        setFine(data?.data?.data?.fine);
        if (annFee)
          setAmount(amount =>
            (
              parseInt(amount || 0) + parseInt(formData?.annDevCharge || 0)
            ).toString()
          );
        if (exm1)
          setAmount(amount =>
            (parseInt(amount || 0) + parseInt(formData?.exam1 || 0)).toString()
          );
        if (exm2)
          setAmount(amount =>
            (parseInt(amount || 0) + parseInt(formData?.exam2 || 0)).toString()
          );
        if (stat1)
          setAmount(amount =>
            (parseInt(amount || 0) + parseInt(formData?.stat1 || 0)).toString()
          );
        if (stat2)
          setAmount(amount =>
            (parseInt(amount || 0) + parseInt(formData?.stat2 || 0)).toString()
          );
      })
      .catch(error => {
        setAmount('');
        setFine('');
        toast.error('Failed to calculate Fee', { position: 'top-right' });
      });
  }, [formData?.feeForMonth]);

  const handleChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.admno || !formData.admno) {
      toast.error('Admno is required!', { position: 'top-right' });
      resetFormData();
      return;
    }
    if (!formData?.feeForMonth || formData?.feeForMonth.length === 0) {
      toast.error('Please select month', { position: 'top-right' });
      return;
    }
    setLoading(true);
    const url = BASE_URL + '/admin/collectFee';
    var month = formData?.feeForMonth?.map(element => element?.value);
    month = month.map(element => {
      element = parseInt(element);
      if (element === 3 || element === 4) return (element - 3).toString();
      else if (element >= 6 && element <= 11) return (element - 4).toString();
      else return (element + 8).toString();
    });
    const data = {
      admno: formData?.admno,
      month,
      amount,
      receiptNo: formData?.receiptNo,
      examFee1: exm1 || formData?.exam1P,
      examFee2: exm2 || formData?.exam2P,
      statFee1: stat1 || formData?.stat1P,
      statFee2: stat2 || formData?.stat2P,
      annDevChrg: annFee || formData?.annDevChargeP,
      description: formData?.description,
      utrNo: txnno,
      lateFine: fine,
      discount: formData?.discount,
      dues: formData?.prevDues,
      bankName: bankName,
    };
    try {
      await axios.post(url, data, { withCredentials: true });
      setPrint(false);
      setLoading(false);
      toast.success('Transaction Complete!', { position: 'top-right' });
      resetFormData();
    } catch (error) {
      setLoading(false);
      toast.error('Transaction Failed!', { position: 'top-right' });
    }
  };

  const handlePrint = () => {
    window.print();
    setPrint(true);
  };

  const onClickHandler = async () => {
    dues.current = [];
    resetFormData();
    if (formData.admno === null || formData.admno.length === 0) {
      toast.error('Admission Number is required', { position: 'top-right' });
      resetFormData();
      return;
    }
    const url = BASE_URL + `/admin/getFeeDetails?admno=${formData?.admno}`;
    try {
      const { data } = await axios.get(url, { withCredentials: true });
      const FeeDetails = data.data;
      const feeObj = {
        admno: FeeDetails?.findFeeDetails?.student?.admno,
        description: FeeDetails?.findFeeDetails?.description,
        name: FeeDetails?.findFeeDetails?.student?.Name,
        grade: FeeDetails?.findFeeDetails?.student?.grade,
        section: FeeDetails?.findFeeDetails?.student?.section,
        tutFee: FeeDetails?.getFees?.TuitionFee,
        annDevChargeP: FeeDetails?.findFeeDetails?.annDevChrg,
        exam1P: FeeDetails?.findFeeDetails?.examFee1,
        exam2P: FeeDetails?.findFeeDetails?.examFee2,
        stat1P: FeeDetails?.findFeeDetails?.statFee1,
        annDevCharge: FeeDetails?.getFees?.AnnualCharge,
        exam1: FeeDetails?.getFees?.ExamFee,
        exam2: FeeDetails?.getFees?.ExamFee,
        stat1: FeeDetails?.getFees?.StationaryFee,
        stat2: FeeDetails?.getFees?.StationaryFee,
        stat2P: FeeDetails?.findFeeDetails?.statFee2,
        prevDues: FeeDetails?.findFeeDetails?.dues,
        discount: FeeDetails?.findFeeDetails?.discount,
        receiptNo: FeeDetails?.receiptNumber?.count,
        labCharge:FeeDetails?.getFees?.LabCharge
      };

      for (let i = 0; i <= 9; i++) {
        if (FeeDetails?.findFeeDetails?.MonthlyDues[i] === true) {
          let indextoFind;
          if (i === 0 || i === 1) indextoFind = i + 3;
          else if (i >= 2 && i <= 7) indextoFind = i + 4;
          else indextoFind = i - 8;
          const foundMonth = months.find(
            month => month.value === indextoFind.toString()
          );
          if (foundMonth) {
            dues.current.push(foundMonth);
          }
        }
      }
      setFormData(prevState => ({
        ...prevState,
        ...feeObj,
      }));
    } catch (error) {
      const status = error?.response?.status;
      resetFormData();
      if (status == 404)
        toast.error('Student Not Found', { position: 'top-right' });
      else toast.error('Something went wrong', { position: 'top-right' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark ml-96 print:ml-0 print:bg-none">
      <div className="grid grid-cols-4 gap-2 print:hidden">
        <ButtonWithIcon
          src={'/assets/search.png'}
          onClickHandler={onClickHandler}
          label={'Admission No.'}
          value={formData.admno}
          setValue={value => handleChange('admno', value)}
        />
        <FormBox
          label={'Name'}
          disabled
          value={formData.name}
          setField={value => handleChange('name', value)}
        />
        <FormBox
          label={'Class'}
          disabled
          value={formData.grade}
          setField={value => handleChange('grade', value)}
        />
        <FormBox
          label={'Section'}
          disabled
          value={formData.section}
          setField={value => handleChange('section', value)}
        />
        <FormBox
          label={'Tuition & Lab Fee'}
          disabled
          value={(parseInt(formData?.labCharge || 0)+parseInt(formData?.tutFee || 0)).toString()}
          setField={value => handleChange('tutFee', value)}
        />
        <FormBox
          label={`Ann.Dev Chrg (Rs. ${formData?.annDevCharge})`}
          disabled
          value={
            formData?.annDevCharge === ''
              ? ''
              : formData?.annDevChargeP
                ? 'Paid'
                : 'Unpaid'
          }
          setField={value => handleChange('annDevChargeP', value)}
        />
        <FormBox
          label={`ExmFee (Aug) (Rs. ${formData?.exam1})`}
          disabled
          value={
            formData.exam1 === '' ? '' : formData?.exam1P ? 'Paid' : 'Unpaid'
          }
          setField={value => handleChange('exam1', value)}
        />
        <FormBox
          label={`ExmFee (Dec) (Rs. ${formData?.exam2})`}
          disabled
          value={
            formData.exam2 === '' ? '' : formData?.exam2P ? 'Paid' : 'Unpaid'
          }
          setField={value => handleChange('exam2', value)}
        />
        <FormBox
          label={`StatFee(Apr) (Rs.${formData?.stat1})`}
          disabled
          value={
            formData.stat1 === '0'
              ? 'N/A'
              : formData.stat1 === ''
                ? ''
                : formData.stat1P
                  ? 'Paid'
                  : 'Unpaid'
          }
          setField={value => handleChange('stat1P', value)}
        />
        <FormBox
          label={`StatFee(Oct) (Rs.${formData?.stat2})`}
          disabled
          value={
            formData.stat2 === '0'
              ? 'N/A'
              : formData.stat2 === ''
                ? ''
                : formData.stat2P
                  ? 'Paid'
                  : 'Unpaid'
          }
          setField={value => handleChange('stat2P', value)}
        />
        <FormBox
          label={'Prev. Dues'}
          value={formData.prevDues}
          setField={value => handleChange('prevDues', value)}
        />
        <FormBox
          label={'Discount'}
          value={formData.discount}
          setField={value => handleChange('discount', value)}
        />
        <div className="flex flex-col items-start justify-center mt-5">
          <label className={`text-2xl font-bold text-light`} rel="Grade">
            Months
          </label>
          <Select
            styles={{
              control: baseStyles => ({
                ...baseStyles,
                fontSize: '26px',
                width: '264px',
                marginTop: '4px',
              }),
            }}
            placeholder={'Select Month'}
            defaultValue={formData?.feeForMonth}
            onChange={value => handleChange('feeForMonth', value)}
            options={dues.current}
            isMulti={true}
            value={formData?.feeForMonth}
          />
        </div>
        <FormBox
          label={'Receipt No.'}
          disabled
          value={formData.receiptNo}
          setField={value => handleChange('receiptNo', value)}
        />
        <div className="flex flex-col items-start justify-center w-full col-span-2 mt-5">
          <label className="text-2xl font-bold text-light" rel="adminPassword">
            Description
          </label>
          <input
            className="w-full p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar"
            type="text"
            name="adminPassword"
            value={formData.description}
            onChange={e => handleChange('description', e.target.value)}
          />
        </div>
        <FormBox label={'Late Fine'} disabled value={fine} setField={setFine} />
        <FormBox label={'Total Amount'} value={amount} setField={setAmount} />
        <FormBox
          label={'Utr/Txn./Chq. No.'}
          value={txnno}
          setField={settxnno}
        />
        <FormBox label={'Bank Name'} value={bankName} setField={setBankName} />
      </div>
      <div className="grid grid-cols-5 gap-8">
        {!formData.annDevChargeP && (
          <div className="mt-5 print:hidden">
            <CheckBox
              label={'Annual Fee'}
              value={annFee}
              setField={setAnnFee}
            ></CheckBox>
          </div>
        )}
        {!formData.exam1P && (
          <div className="mt-5 print:hidden">
            <CheckBox
              label={'Exam Fee(Aug)'}
              value={exm1}
              setField={setexm1}
            ></CheckBox>
          </div>
        )}
        {!formData.exam2P && (
          <div className="mt-5 print:hidden">
            <CheckBox
              label={'Exam Fee(Dec)'}
              value={exm2}
              setField={setexm2}
            ></CheckBox>
          </div>
        )}
        {(formData.stat1 === '' ||
          (formData.stat1 !== '0' && !formData.stat1P)) && (
          <div className="mt-5 print:hidden">
            <CheckBox
              label={'Stat. Fee(Apr)'}
              value={stat1}
              setField={setstat1}
            ></CheckBox>
          </div>
        )}
        {(formData.stat2 === '' ||
          (formData.stat2 !== '0' && !formData.stat2P)) && (
          <div className="mt-5 print:hidden">
            <CheckBox
              label={'Stat. Fee(Oct)'}
              value={stat2}
              setField={setstat2}
            ></CheckBox>
          </div>
        )}
      </div>
      <div className="flex gap-4 print:hidden">
        <div className="flex justify-center w-full gap-4">
          <button
            type="button"
            className="p-3 mt-5 text-2xl font-bold transition-all duration-300 delay-150 border rounded-md border-appBar text-appBar bg-light hover:ease-in-out hover:cursor-pointer hover:bg-inactive "
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
        {print ? (
          loading ? (
            <div className="flex justify-center mt-5">
              {' '}
              <ClipLoader color="#F9F7F7" className="flex justify-center" />
            </div>
          ) : (
            <Button onClick={handleSubmit} text={'Save'}></Button>
          )
        ) : null}
      </div>
      <Receipt
        admno={formData?.admno}
        dues={formData?.prevDues}
        grade={formData?.grade}
        name={formData?.name}
        receiptNumber={formData?.receiptNo}
        section={formData?.section}
        totalAmount={amount}
        tutFee={formData?.tutFee}
        months={formData?.feeForMonth}
        latefine={fine}
        discount={formData?.discount}
        labcharge={formData?.labCharge}
        statFee1={formData?.stat1}
        statFee1P={formData?.stat1P?false:stat1}
        statFee2={formData?.stat2}
        statFee2P={formData?.stat2P?false:stat2}
        examFee1={formData?.exam1}
        examFee1P={formData?.exam1P?false:exm1}
        examFee2={formData?.exam2}
        examFee2P={formData?.exam2P?false:exm2}
        annualFee={formData?.annDevCharge}
        annualFeeP={formData?.annDevChargeP?false:annFee}
      ></Receipt>
    </div>
  );
};

export default FeeCollection;
