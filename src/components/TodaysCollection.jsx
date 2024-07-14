import React, { useState, useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import moment from 'moment';
import Button from './Button';
import { CSVLink } from 'react-csv';
import { BASE_URL } from '../api/adminRequests';
import axios from 'axios';
import { csvTodayCollectionHeader } from '../data';
import toast, { Toaster } from 'react-hot-toast';
const TodaysCollection = () => {
  const [data, setData] = useState([]);

  async function handlePrint() {
    window.print();
  }
  useEffect(() => {
    setLoading(true);
    const url = BASE_URL + '/admin/gettodayscollection';

    axios
      .get(url, { withCredentials: true })
      .then(response => {
        const rep = response.data.data;
        const x = rep.map(element => [
          element?.student?.admno,
          element?.student?.firstName,
          element?._id,
          element?.utrNo ? element?.utrNo : '',
          element?.amount,
        ]);
        setData([...data, ...x]);
      })
      .catch(error => {
        toast.error('Something went wrong', { position: 'top-right' });
        setLoading(false);
      });
    setLoading(false);
  }, []);
  const currentDate = moment().format('LL');
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-full ml-96 bg-dark print:mx-0 print:bg-none print:flex print:flex-col">
      <h1 className="hidden print:inline print:text-black print:font-semibold print:text-xl print:text-center">
        Akshar Vidya Griha <span>- Date:{currentDate}</span>
      </h1>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div className="mx-6 mt-16 print:mx-0 print:mt-2">
          <table className="w-full border-2 table-auto border-light print:border-black">
            <thead>
              <tr className="bg-appBar print:bg-none ">
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black ">
                  AdmNo.
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Name
                </th>

                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  TransID
                </th>

                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  UTRNo.
                </th>
                <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(element => {
                return (
                  <tr key={element[2]}>
                    {element.map((item, index) => {
                      return (
                        <td
                          key={`${item}-${index}`}
                          className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black"
                        >
                          {item}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center gap-3 mb-10 print:hidden">
            <Button text={'Print'} onClick={handlePrint}></Button>
            <CSVLink
              data={data}
              headers={csvTodayCollectionHeader}
              filename={'.csv'}
            >
              <Button text={'Download'}></Button>
            </CSVLink>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default TodaysCollection;
