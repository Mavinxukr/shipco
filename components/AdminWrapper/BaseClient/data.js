import Link from 'next/link';

export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ cell: { value } }) => (
          <Link href={{
            pathname: '/client',
            query: {
              idUser: value,
            },
          }}>
            <a>
              <span>{value}</span>
            </a>
          </Link>
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email Address',
        accessor: 'email',
        Cell: ({ cell: { value } }) => <a href={`mailto:${value}`}>{value}</a>,
      },
      {
        Header: 'Phone number',
        accessor: 'phone',
      },
      {
        Header: 'Address',
        accessor: 'full_address',
      },
      {
        Header: 'Payment Information',
        accessor: 'card_number',
      },

      {
        Header: 'Date of registration',
        accessor: 'date_register',
      },
    ],
  },
];
