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
        accessor: 'priceable_type',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
  },
];

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
