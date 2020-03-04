export const dataTable = [
  {
    id: 22779019,
    date: '28/12/18',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', 'Shipping charge invoice'],
    total: [25000, 250000],
    paid: [0.00, 0.00],
    outstanding: ['25,000.00', '10,000.00'],
    status: ['Paid', 'Paid'],
  },
  {
    id: 22779018,
    date: '28/12/13',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', 'Shipping charge invoice'],
    total: [25000, 250000],
    paid: [0.00, 0.00],
    outstanding: ['25,000.00', '10,000.00'],
    status: ['Paid', 'Paid'],
  },
  {
    id: 22779019,
    date: '28/12/14',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', 'Shipping charge invoice'],
    total: [25000, 250000],
    paid: [0.00, 0.00],
    outstanding: ['25,000.00', '10,000.00'],
    status: ['Paid', 'Paid'],
  },
  {
    id: 22779017,
    date: '28/12/12',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', 'Shipping charge invoice'],
    total: [25000, 250000],
    paid: [0.00, 0.00],
    outstanding: ['25,000.00', '10,000.00'],
    status: ['Paid', 'Paid'],
  },

];

export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Auto',
        accessor: 'auto',
      },
      {
        Header: 'Paiment for',
        accessor: 'paiment',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: 'Paid',
        accessor: 'paid',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: 'Outstanding',
        accessor: 'outstanding',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: '',
        accessor: 'view',
      },
    ],
  },
];
