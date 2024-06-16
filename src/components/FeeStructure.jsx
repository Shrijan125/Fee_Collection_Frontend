import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from './LoadingComponent';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { csvmonthsHeader } from '../data';

const FeeStructure = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [csvdata, setCsvData] = useState([]);

  const navigate = useNavigate();

  function clickHandler() {
    navigate('/updatefee', { state: { data } });
  }

  useEffect(() => {
    const url = BASE_URL + '/admin/getFeeStructure';

    axios
      .get(url)
      .then(response => {
        const rep = response.data.data;
        const reqarr = rep.map(element => element.amount);
        const grade = rep.map(element => element.grade);
        for (let i = 0; i < reqarr.length; i++) {
          reqarr[i].unshift(grade[i]);
        }
        setData(response.data.data);
        setCsvData(response.data.data.map(item => item.amount));
        setLoading(false);
      })
      .catch(error => {
        toast.error('Something went wrong', { position: 'top-right' });
        setLoading(false);
      });
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
              <tr className="bg-appBar print:bg-none ">
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black"></th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black ">
                  JAN
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  FEB
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  MAR
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  APR
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  MAY
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  JUN
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  JUL
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  AUG
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  SEP
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  OCT
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  NOV
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  DEC
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                const trimmedData = item.amount.slice(1, item.amount.length);
                return (
                  <tr key={item.grade}>
                    <td className="text-3xl font-bold text-center border text-light bg-appBar print:text-black print:text-xl print:bg-none print:border-black">
                      {item.grade}
                    </td>
                    {trimmedData.map((arr, index) => {
                      return (
                        <td
                          className="text-xl text-center transition-all duration-300 delay-150 border text-light hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar hover:text-appBar print:text-black print:text-xl print:border-black"
                          key={`${item.grade}-${index}`} // Unique key combining grade and index
                        >
                          {arr}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center gap-3 print:hidden">
            <Button text={'Update'} onClick={clickHandler}></Button>
            <Button text={'Print'} onClick={handlePrint}></Button>
            <CSVLink
              data={csvdata}
              headers={csvmonthsHeader}
              filename={'FeeStructure.csv'}
            >
              <Button text={'Download'}></Button>
            </CSVLink>
          </div>
        </div>
      )}
    </div>
  );
};
export default FeeStructure;
