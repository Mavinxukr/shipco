export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Auto',
        accessor: 'name_car',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: 'Total',
        accessor: 'total_price',
      },
      {
        Header: 'Paid',
        accessor: 'paid_price',
      },
      {
        Header: 'Outstanding',
        accessor: 'outstanding_price',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
  },
];
