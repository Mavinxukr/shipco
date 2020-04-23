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
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Due day',
        accessor: 'due_day',
      },
      {
        Header: 'Cities',
        accessor: 'cities[0].name',
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
