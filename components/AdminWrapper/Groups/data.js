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
        Header: 'Clients in the group',
        accessor: 'client',
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

export const print = [
  { name: 'Id', id: 'id' },
  { name: 'Name', id: 'name' },
  { name: 'Price', id: 'price' },
];
