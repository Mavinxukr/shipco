import Link from 'next/link';

export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ cell: { value } }) => (
          <Link
            href={{
              pathname: '/auto-admin',
              query: {
                idUser: value,
              },
            }}
          >
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
        Header: 'Date of registration',
        accessor: 'date_register',
      },
    ],
  },
];

export const print = [
  { name: 'Id', id: 'clients.id' },
  { name: 'Name', id: 'clients.name' },
  { name: 'Email', id: 'clients.email' },
  { name: 'Phone', id: 'clients.phone' },
  { name: 'Date of registration', id: 'clients.created_at' },
  { name: 'Address', id: 'addresses.name' },
];
