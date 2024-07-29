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

const dressDetails = [
  { value: 'FS20NB', label: 'Full Seater (20) NB' },
  { value: 'FS20B', label: 'Full Seater (20) BIS' },
  { value: 'FS22NB', label: 'Full Seater (22) NB' },
  { value: 'FS22B', label: 'Full Seater (22) BIS' },
  { value: 'FS24NB', label: 'Full Seater (24) NB' },
  { value: 'FS24B', label: 'Full Seater (24) BIS' },
  { value: 'FS26NB', label: 'Full Seater (26) NB' },
  { value: 'FS26B', label: 'Full Seater (26) BIS' },
  { value: 'FS28NB', label: 'Full Seater (28) NB' },
  { value: 'FS28B', label: 'Full Seater (28) BIS' },
  { value: 'FS30NB', label: 'Full Seater (30) NB' },
  { value: 'FS30B', label: 'Full Seater (30) BIS' },
  { value: 'FS32NB', label: 'Full Seater (32) NB' },
  { value: 'FS32B', label: 'Full Seater (32) BIS' },
  { value: 'FS34NB', label: 'Full Seater (34) NB' },
  { value: 'FS34B', label: 'Full Seater (34) BIS' },
  { value: 'FS36NB', label: 'Full Seater (36) NB' },
  { value: 'FS36B', label: 'Full Seater (36) BIS' },
  { value: 'FS38NB', label: 'Full Seater (38) NB' },
  { value: 'FS38B', label: 'Full Seater (38) BIS' },
  { value: 'FS40NB', label: 'Full Seater (40) NB' },
  { value: 'FS40B', label: 'Full Seater (40) BIS' },
  { value: 'FS42NB', label: 'Full Seater (42) NB' },
  { value: 'FS42B', label: 'Full Seater (42) BIS' },
];

const avlgender = [
  { label: 'M', value: 'M' },
  { label: 'F', value: 'F' },
];

const months = [
  { value: '3', label: 'APR' },
  { value: '4', label: 'MAY & JUN' },
  { value: '6', label: 'JUL' },
  { value: '7', label: 'AUG' },
  { value: '8', label: 'SEP' },
  { value: '9', label: 'OCT' },
  { value: '10', label: 'NOV' },
  { value: '11', label: 'DEC' },
  { value: '0', label: 'JAN' },
  { value: '1', label: 'FEB & MAR' },
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
  'Bank',
  'Utr/Txn/Chq/No.',
  'Amount',
];
const csvGeneratedDuesHeader = ['AdmNo', 'Name', 'Grade', 'Phone', 'Amount'];
const csvGenerateCollectionHeader = [
  'AdmNo',
  'Name',
  'Bank',
  'UTRNo.',
  'Date',
  'Utr/Txn./Chq. No.',
  'Amount',
];

export {
  grades,
  avlgender,
  months,
  csvmonthsHeader,
  csvTodayCollectionHeader,
  csvGeneratedDuesHeader,
  csvGenerateCollectionHeader,
  dressDetails,
};
