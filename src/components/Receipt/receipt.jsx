import moment from 'moment';
import React from 'react';

const Receipt = ({
  receiptNumber,
  name,
  admno,
  grade,
  section,
  months,
  tutFee,
  dues,
  totalAmount,
  latefine,
  discount,
}) => {
  return (
    <div className="hidden print:gap-2 print:h-screen print:grid-cols-2 print:w-screen print:grid">
      <div className="flex flex-col w-full border h-1/2">
        <div className="mx-2">Office Copy</div>
        <div className="mx-2 mt-5 text-xl font-bold text-center ">
          Akshar Vidya Griha
        </div>
        <h1 className="font-bold text-center ">Payment Receipt</h1>

        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold">Receipt Number:</span>
            {receiptNumber}
          </div>
          <div>
            <span className="font-bold">Date:</span>{' '}
            {moment().format('DD-MM-YYYY')}
          </div>
        </div>
        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold">Name:</span>
            {name}
          </div>
          <div>
            <span className="font-bold">Admn No.:</span> {admno}
          </div>
        </div>
        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold text-right">Class:</span>
            {grade}
          </div>
          <div>
            <span className="font-bold">Sec:</span> {section}
          </div>
        </div>
        <h1 className="font-bold text-center">Fee Particulars</h1>
        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold text-right">Months: </span>
            {months?.map(element => element?.label).join(', ')}
          </div>
        </div>
        <div className="flex items-center justify-between mx-2">
          <h1 className="font-bold text-center">Headers</h1>
          <h1 className="font-bold text-center">Paid</h1>
        </div>
        <div className="flex items-center justify-between mx-2">
          <span>Tuition Fee:</span>
          <div>{tutFee === '' ? `\u20B90` : `\u20B9${tutFee}`}</div>
        </div>
        {dues !== '' && (
          <div className="flex items-center justify-between mx-2">
            <span>Dues:</span>
            <div>{`\u20B9${dues}`}</div>
          </div>
        )}
        {latefine !== '' && (
          <div className="flex items-center justify-between mx-2">
            <span>Late Fine:</span>
            <div>{`\u20B9${latefine}`}</div>
          </div>
        )}
        {discount !== '' && (
          <div className="flex items-center justify-between mx-2">
            <span>Discount:</span>
            <div>{`\u20B9${discount}`}</div>
          </div>
        )}
        <div className="flex items-center justify-between mx-2">
          <span>Total Amount:</span>
          <div>{totalAmount === '' ? `\u20B90` : `\u20B9${totalAmount}`}</div>
        </div>
        <div className="flex items-end justify-end mx-2 mt-10">
          Signature: ________________________
        </div>
      </div>
      <div className="flex flex-col w-full border h-1/2">
        <div className="mx-2">Parent's Copy</div>
        <div className="mx-2 mt-5 text-xl font-bold text-center ">
          Akshar Vidya Griha
        </div>
        <h1 className="font-bold text-center ">Payment Receipt</h1>

        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold">Receipt Number:</span>
            {receiptNumber}
          </div>
          <div>
            <span className="font-bold">Date:</span>{' '}
            {moment().format('DD-MM-YYYY')}
          </div>
        </div>
        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold">Name:</span>
            {name}
          </div>
          <div>
            <span className="font-bold">Admn No.:</span> {admno}
          </div>
        </div>
        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold text-right">Class:</span>
            {grade}
          </div>
          <div>
            <span className="font-bold">Sec:</span> {section}
          </div>
        </div>
        <h1 className="font-bold text-center">Fee Particulars</h1>
        <div className="flex items-center justify-between mx-2">
          <div>
            <span className="font-bold text-right">Months: </span>
            {months?.map(element => element?.label).join(', ')}
          </div>
        </div>
        <div className="flex items-center justify-between mx-2">
          <h1 className="font-bold text-center">Headers</h1>
          <h1 className="font-bold text-center">Paid</h1>
        </div>
        <div className="flex items-center justify-between mx-2">
          <span>Tuition Fee:</span>
          <div>{tutFee === '' ? `\u20B90` : `\u20B9${tutFee}`}</div>
        </div>
        {dues !== '' && (
          <div className="flex items-center justify-between mx-2">
            <span>Dues:</span>
            <div>{`\u20B9${dues}`}</div>
          </div>
        )}
        {latefine !== '' && (
          <div className="flex items-center justify-between mx-2">
            <span>Late Fine:</span>
            <div>{`\u20B9${latefine}`}</div>
          </div>
        )}
        {discount !== '' && (
          <div className="flex items-center justify-between mx-2">
            <span>Discount:</span>
            <div>{`\u20B9${discount}`}</div>
          </div>
        )}
        <div className="flex items-center justify-between mx-2">
          <span>Total Amount:</span>
          <div>{totalAmount === '' ? `\u20B90` : `\u20B9${totalAmount}`}</div>
        </div>
        <div className="flex items-end justify-end mx-2 mt-10">
          Signature: ________________________
        </div>
      </div>
    </div>
  );
};

export default Receipt;
