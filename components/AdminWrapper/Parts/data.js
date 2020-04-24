export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'Catalog number',
        accessor: 'catalog_number',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Auto',
        accessor: 'auto',
      },
      {
        Header: 'Comment',
        accessor: 'comment',
      },
      {
        Header: 'Quality',
        accessor: 'quality',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => <>{value.split('_').join(' ')}</>,
      },

      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
  },
];

export const status = [
  {
    id: 1,
    value: '',
    label: 'all',
  },
  {
    id: 2,
    value: 'in_warehouse',
    label: 'in warehouse',
  },
  {
    id: 3,
    value: 'in_the_sea',
    label: 'in the sea',
  },
  {
    id: 4,
    value: 'at_the_port',
    label: 'at the port',
  },
  {
    id: 5,
    value: 'delivered',
    label: 'delivered',
  },
];

export const statusSelect = [
  {
    id: 1,
    value: 'in_warehouse',
    label: 'in warehouse',
  },
  {
    id: 2,
    value: 'in_the_sea',
    label: 'in the sea',
  },
  {
    id: 3,
    value: 'at_the_port',
    label: 'at the port',
  },
  {
    id: 4,
    value: 'delivered',
    label: 'delivered',
  },
];

export const print = [
  { name: 'Catalog number', id: 'parts.catalog_number' },
  { name: 'Name', id: 'parts.name' },
  { name: 'Auto', id: 'parts.auto' },
  { name: 'Comment', id: 'parts.comment' },
  { name: 'Quality', id: 'parts.quality' },
  { name: 'Status', id: 'parts.status' },
];
