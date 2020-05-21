export const type = [
  { value: 'group', label: 'groups' },
  { value: 'client', label: 'clients' },
];

export const columnsPrice = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'Cities',
        accessor: 'name',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
    ],
  },
];
