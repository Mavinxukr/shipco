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
        accessor: 'state',
        Cell: ({ cell: { value } }) => (
          <>
            {value.map(item => <p key={item.id}>{item.state}</p>)}
          </>
        ),
      },
      {
        Header: 'Cities',
        accessor: 'cities',
        Cell: ({ cell: { value } }) => (
          <>
            {value.map(item => <p key={item.id}>{item.name}</p>)}
          </>
        ),
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell: { value } }) => (
          <>
            {value.map(item => <p key={item.id}>{item.pivot.price_value}</p>)}
          </>
        ),
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
