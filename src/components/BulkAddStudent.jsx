import React, { useRef } from 'react';
import Button from './Button';
import * as XLSX from 'xlsx';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../api/adminRequests';
import axios from 'axios';

const BulkAddStudent = () => {
  const fileData = useRef([]);
  async function handleSubmit() {
    if (fileData?.current.length === 0) {
      toast.error('Please select a file', { position: 'top-right' });
      return;
    }
    const url = BASE_URL + '/admin/addBulkStudent';
    try {
      const { data } = await axios.post(url, fileData?.current);
      toast.success('Update Successfull!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to upload data!', { position: 'top-right' });
      return;
    }
  }
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      fileData.current = json;
    };

    reader.readAsArrayBuffer(file);
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen ml-96">
      <input
        type="file"
        className="p-3 text-xl font-bold border rounded-md outline-none bg-light text-appBar border-appBar"
        accept=".xls,.xlsx"
        onChange={handleFileUpload}
      />
      <div className="flex gap-5">
        <div className="flex justify-center w-full gap-4">
          <button
            type="button"
            className="p-3 mt-5 text-2xl font-bold transition-all duration-300 delay-150 border rounded-md border-appBar text-appBar bg-light hover:ease-in-out hover:cursor-pointer hover:bg-inactive "
            onClick={() => {}}
          >
            Download Sample!
          </button>
        </div>
        <Button onClick={handleSubmit} text={'Upload'}></Button>
      </div>
      <p className="mt-5 text-3xl font-bold text-light">
        <span className="text-3xl text-appBar">Note: </span>Please Check the
        sample file before uploading!
      </p>
      <Toaster />
    </div>
  );
};

export default BulkAddStudent;
