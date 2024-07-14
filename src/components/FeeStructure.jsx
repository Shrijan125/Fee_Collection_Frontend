import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from './LoadingComponent';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';

const FeeStructure = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function clickHandler() {
    navigate('/updatefee', { state: { data } });
  }

  useEffect(() => {
    const url = BASE_URL + '/admin/getFeeStructure';
    setLoading(true);
    axios
      .get(url)
      .then(response => {
        const rep = response.data.data;
        setData([...data, ...rep]);
      })
      .catch(error => {
        toast.error('Something went wrong', { position: 'top-right' });
      })
      .finally(setLoading(false));
    setLoading(false);
  }, []);

  async function handlePrint() {
    window.print();
  }

  return (
    <div className="w-screen h-screen ml-96 bg-dark print:ml-0 print:bg-none">
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div className="mx-6 mt-16 print:mx-0">
          <table className="w-full border-2 table-fixed border-light print:border-black">
            <thead>
              <tr className=" bg-appBar print:bg-none">
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Class
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black ">
                  Prosp & RegFee
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Adm Fee
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Annual Charge
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Tuition Fee
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Lab Charge
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Stat.Fee
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Exam Fee
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Total Fee
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                return (
                  <tr key={item.grade}>
                    <td className="text-3xl text-center border bg-appBar print:bg-none text-light print:text-black print:text-xl print:border-black ">
                      {item.grade}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.ProsReg}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.AdmFee}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.AnnualCharge}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.TuitionFee}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.LabCharge}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.StationaryFee}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.ExamFee}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.TotalFee}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center gap-3 print:hidden">
            <Button text={'Update'} onClick={clickHandler}></Button>
            <Button text={'Print'} onClick={handlePrint}></Button>
            <CSVLink
              data={data}
              // headers={csvmonthsHeader}
              filename={'FeeStructure.csv'}
            >
              <Button text={'Download'}></Button>
            </CSVLink>
          </div>
          <p className="mt-5 text-2xl text-center text-light print:text-black">
            <span className="text-3xl text-appBar">Note:</span> Stationary Fee
            and Exam Fee are not part of total fee.
          </p>
          <Toaster />
        </div>
      )}
    </div>
  );
};
export default FeeStructure;
