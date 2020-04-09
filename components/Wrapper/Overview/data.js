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
        Cell: ({ cell: { value } }) => <>$ {value}</>,
      },
      {
        Header: 'Paid',
        accessor: 'paid_price',
        Cell: ({ cell: { value } }) => <>$ {value}</>,
      },
      {
        Header: 'Outstanding',
        accessor: 'outstanding_price',
        Cell: ({ cell: { value } }) => <>$ {value}</>,
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
  },
];
