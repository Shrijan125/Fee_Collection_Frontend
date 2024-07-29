import React from 'react';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../api/adminRequests';
import axios from 'axios';
import LoadingComponent from '../LoadingComponent';
import toast from 'react-hot-toast';
import Button from '../Button';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';

import DatePrinter from '../DatePrinter/DatePrinter';
const DressDetails = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function clickHandler() {
    navigate('/updateUniform', { state: { data } });
  }

  async function handlePrint() {
    window.print();
  }
  useEffect(() => {
    const url = BASE_URL + '/admin/getDressDetails';
    setLoading(true);
    axios
      .get(url, { withCredentials: true })
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
  return (
    <div className="w-screen h-screen xl:ml-64 k print:ml-0 print:bg-none">
      <DatePrinter></DatePrinter>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div className="mx-6 mt-16 print:mt-0 print:mx-0">
          <table className="w-full border-2 table-fixed border-light print:border-black">
            <thead>
              <tr className=" bg-appBar print:bg-none">
                <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black">
                  Name
                </th>
                <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black">
                  Price
                </th>
                <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.name}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.price}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center gap-3 print:hidden">
            <Button text={'Update'} onClick={clickHandler}></Button>
            <Button text={'Print'} onClick={handlePrint}></Button>
            <CSVLink data={data} filename={'UniformStructure.csv'}>
              <Button text={'Download'}></Button>
            </CSVLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default DressDetails;
