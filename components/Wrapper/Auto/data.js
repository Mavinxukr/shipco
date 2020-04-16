import Link from 'next/link';

export const stateOptions = [
  { value: '', label: 'All' },
  { value: 'California', label: 'California' },
  { value: 'Texas', label: 'Texas' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'Savannah', label: 'Savannah' },
  { value: 'Montreal', label: 'Montreal' },
];

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
              pathname: '/auto/auto-new',
              query: {
                idAuto: value,
              },
            }}
          >
            <a>{value}</a>
          </Link>
        ),
      },
      {
        Header: 'Images',
        accessor: 'image.link',
        Cell: ({ cell: { value } }) => (
          <img src={value || '/images/no-preview-available.png'} alt={value} />
        ),
      },
      {
        Header: 'Date',
        accessor: 'created_at',
      },
      {
        Header: 'Model',
        accessor: 'auto',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: 'Lot',
        accessor: 'lot_info.lot_number',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: 'VIN id',
        accessor: 'lot_info.vin_code',
      },
      {
        Header: 'Point of loading',
        accessor: 'ship_info.point_load[0]',
      },
      {
        Header: 'Loren',
        accessor: 'loren1',
      },
      {
        Header: 'Loren',
        accessor: 'loren2',
      },
      {
        Header: 'Loren',
        accessor: 'loren3',
      },
      {
        Header: 'Lorem Ipsum',
        accessor: 'loren4',
      },
      {
        Header: 'Loren',
        accessor: 'loren5',
      },
      {
        Header: 'Loren',
        accessor: 'loren6',
      },
      {
        Header: 'Lorem Ipsum',
        accessor: 'loren7',
      },
      {
        Header: 'Loren',
        accessor: 'loren8',
      },
    ],
  },
];

export const filter = [
  {
    id: 1,
    title: 'All',
    num: 575,
  },
  {
    id: 2,
    title: 'Ad the Terminal',
    num: 25,
  },
  {
    id: 3,
    title: 'Lorem Ipsum',
    num: 9,
  },
  {
    id: 4,
    title: 'New',
    num: 9,
  },
  {
    id: 5,
    title: 'Lorem Ipsum',
    num: 478,
  },
];
