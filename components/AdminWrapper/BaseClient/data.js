import Link from 'next/link';

export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t("ID"),
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
        Header: t("Name"),
        accessor: 'name',
      },
      {
        Header: t("EmailAddress"),
        accessor: 'email',
        Cell: ({ cell: { value } }) => <a href={`mailto:${value}`}>{value}</a>,
      },
      {
        Header: t("Phonenumber"),
        accessor: 'phone',
      },
      {
        Header: t("Address"),
        accessor: 'full_address',
      },
      {
        Header: t("DateOfegistration"),
        accessor: 'date_register',
      },
    ],
  },
];

export const print = (t) => [
  { name: t("ID"), id: 'clients.id' },
  { name: t("Name"), id: 'clients.name' },
  { name: t("EmailAddress"), id: 'clients.email' },
  { name: t("Phonenumber"), id: 'clients.phone' },
  { name: t("DateOfegistration"), id: 'clients.created_at' },
  { name: t("Address"), id: 'addresses.name' },
];
