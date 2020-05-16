export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Applicable type',
        accessor: 'applicable_type',
      },
      {
        Header: 'Applicable name',
        accessor: 'applicable.name',
      },
      {
        Header: 'Days to pay',
        accessor: 'due_day',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
  },
];

export const city = [
  { value: '1', label: 'California' },
  { value: '2', label: 'Texas' },
  { value: '3', label: 'New Jersey' },
  { value: '4', label: 'Savannah' },
  { value: '5', label: 'Montreal' },
];

export const type = [
  { value: 'group', label: 'groups' },
  { value: 'client', label: 'clients' },
];
