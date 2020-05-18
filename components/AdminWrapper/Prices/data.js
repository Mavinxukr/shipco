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
        Header: 'State',
        accessor: 'country[0].name',
      },
      {
        Header: 'Cities',
        accessor: 'cities[0].name',
      },
      {
        Header: 'Price',
        accessor: 'price',
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
