import React from 'react';
import moment from 'moment';
const DatePrinter = () => {
  const currentDate = moment().format('LL');
  return (
    <h1 className="hidden print:block print:text-black print:font-semibold print:text-xl print:text-center">
      Akshar Vidya Griha <span>- Date:{currentDate}</span>
    </h1>
  );
};

export default DatePrinter;
