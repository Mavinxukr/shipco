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
        accessor: 'price[0].pivot.price_value',
      },
      {
        Header: 'Clients in the group',
        accessor: 'clients[0].clients.name',
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
