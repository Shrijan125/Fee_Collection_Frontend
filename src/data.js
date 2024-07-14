const grades = [
  { value: 'Pre-Nur', label: 'Pre-Nur' },
  { value: 'Nur', label: 'Nur' },
  { value: 'KG-I', label: 'KG-I' },
  { value: 'KG-II', label: 'KG-II' },
  { value: 'I', label: 'I' },
  { value: 'II', label: 'II' },
  { value: 'III', label: 'III' },
  { value: 'IV', label: 'IV' },
  { value: 'V', label: 'V' },
  { value: 'VI', label: 'VI' },
  { value: 'VII', label: 'VII' },
  { value: 'VIII', label: 'VIII' },
  { value: 'IX', label: 'IX' },
  { value: 'X', label: 'X' },
  { value: 'XI', label: 'XI' },
  { value: 'XII', label: 'XII' },
];

const avlgender = [
  { label: 'M', value: 'M' },
  { label: 'F', value: 'F' },
];

const months = [
  
  { value: '3', label: 'APR' },
  { value: '4', label: 'MAY' },
  { value: '5', label: 'JUN' },
  { value: '6', label: 'JUL' },
  { value: '7', label: 'AUG' },
  { value: '8', label: 'SEP' },
  { value: '9', label: 'OCT' },
  { value: '10', label: 'NOV' },
  { value: '11', label: 'DEC' },
  { value: '0', label: 'JAN' },
  { value: '1', label: 'FEB' },
  { value: '2', label: 'MAR' },
];

const csvmonthsHeader = [
  ' ',
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const csvTodayCollectionHeader = [
  'AdmNo',
  'Name',
  'TransID',
  'UTRNo.',
  'Amount',
];
const csvGeneratedDuesHeader = ['AdmNo', 'Name', 'Grade', 'Phone', 'Amount'];
const csvGenerateCollectionHeader = [
  'AdmNo',
  'Name',
  'TransID',
  'UTRNo.',
  'Amount',
  'Date',
];

export {
  grades,
  avlgender,
  months,
  csvmonthsHeader,
  csvTodayCollectionHeader,
  csvGeneratedDuesHeader,
  csvGenerateCollectionHeader,
};
