import React from 'react';
import moment from 'moment';
import Button from './Button';
import { CSVLink } from 'react-csv';
import { csvGeneratedDuesHeader } from '../data';
import { useLocation } from 'react-router-dom';
const GeneratedDues = () => {
  const location = useLocation();
  const data = location.state?.data || [];
  var csvData = [];
  async function handlePrint() {
    window.print();
  }

  const currentDate = moment().format('LL');
  return (
    <div className="w-full h-full xl:ml-64 print:mx-0 print:bg-none print:flex print:flex-col">
      <div className="flex items-center justify-center w-full h-screen text-xl text-white sm:hidden">
        Need a Larger Screen to Display!
      </div>
      <h1 className="hidden print:inline print:text-black print:font-semibold print:text-xl print:text-center">
        Akshar Vidya Griha <span>- Date:{currentDate}</span>
      </h1>
      <div className="hidden mx-6 mt-16 sm:block print:mx-0 print:mt-2">
        <table className="w-full border-2 table-auto border-light print:border-black">
          <thead>
            <tr className="bg-appBar print:bg-none ">
              <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black ">
                AdmNo.
              </th>
              <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black">
                Name
              </th>
              <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black">
                Grade
              </th>
              <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black">
                Phone
              </th>
              <th className="border lg:text-2xl text-light print:text-black print:text-xl print:border-black">
                Due Amount:
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(element => {
              csvData.push([
                element?.admno,
                element?.Name,
                element?.grade,
                element?.phone,
                element?.dues,
              ]);
              if (element?.dues !== 0)
                return (
                  <tr key={element?.id}>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {element?.admno}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {element?.Name}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {element?.grade}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {element?.phone}
                    </td>
                    <td className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {element?.dues}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
        <div className="flex justify-center gap-3 mb-10 print:hidden">
          <Button text={'Print'} onClick={handlePrint}></Button>
          <CSVLink
            data={csvData}
            headers={csvGeneratedDuesHeader}
            filename={`Dues${currentDate}.csv`}
          >
            <Button text={'Download'}></Button>
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default GeneratedDues;
