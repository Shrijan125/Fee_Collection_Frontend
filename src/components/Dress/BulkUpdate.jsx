import React, { useRef } from 'react';
import Button from '../Button';
import { BASE_URL } from '../../api/adminRequests';
import axios from 'axios';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
const BulkUpdate = () => {
    const fileData = useRef([]);
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
  async function handleSubmit() {
    if (fileData?.current.length === 0) {
      toast.error('Please select a file', { position: 'top-right' });
      return;
    }
    const url = BASE_URL + '/admin/updateDressBulk';
    try {
      const { data } = await axios.post(url, fileData?.current, {
        withCredentials: true,
      });
      toast.success('Update Successfull!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to upload data!', { position: 'top-right' });
      return;
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen mx-10 xl:ml-64 sm:mx-5">
      <input
        type="file"
        className="p-3 text-xl font-bold border rounded-md outline-none sm:w-[500px] w-full  bg-light text-appBar border-appBar"
        accept=".xls,.xlsx"
        onChange={handleFileUpload}
      />
      <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row">
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
      <p className="mt-5 text-xl font-bold sm:text-2xl lg:text-3xl text-light">
        <span className="sm:text-2xl lg:text-3xl texl-xl text-appBar">
          Note:{' '}
        </span>
        Please Check the sample file before uploading!
      </p>
    </div>
  );
};

export default BulkUpdate;
