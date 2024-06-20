import React from 'react'
import { useLocation } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import Button from './Button';
import moment from 'moment';
import { csvGenerateCollectionHeader } from '../data';

const GeneratedCollection = () => {
const location =useLocation();  
const data=location.state.data || [];

async function handlePrint() {
  window.print();
}

const currentDate = moment().format('LL');

return (

  <div className="w-full h-full ml-96 bg-dark print:mx-0 print:bg-none print:flex print:flex-col">
     <h1 className="hidden print:inline print:text-black print:font-semibold print:text-xl print:text-center">
        Akshar Vidya Griha{' '}
        <span>- Date:{currentDate}</span>
      </h1>
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
              <th className="text-3xl border text-light print:text-black print:text-xl print:border-black">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => {
              return (
                <tr key={element[2]}>
                  {element.map((item,index) => {
                    return(
                    <td  key={`${item}-${index}`} className="text-xl text-center transition-all duration-300 'hover:cursor-pointer hover:ease-in-out hover:bg-light hover:border-appBar ' delay-150 border hover:text-appBar text-light print:text-black print:text-xl print:border-black">
                      {item}
                    </td>
                  )})}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center gap-3 mb-10 print:hidden">
          <Button text={'Print'} onClick={handlePrint} ></Button>
           <CSVLink
            data={data}
            headers={csvGenerateCollectionHeader}
            filename={'.csv'}
          >
           <Button text={'Download'}></Button>
          </CSVLink>
        </div>
      </div>
  </div>
);
  
}

export default GeneratedCollection