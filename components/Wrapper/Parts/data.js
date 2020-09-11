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
        Header: 'Parts photo',
        accessor: 'photo',
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
    label: 'All Status',
  },
  {
    id: 2,
    value: 'new',
    label: 'New',
  },
  {
    id: 3,
    value: 'dispatched',
    label: 'Dispatched',
  },
  {
    id: 4,
    value: 'title_delay',
    label: 'Title delay',
  },
  {
    id: 5,
    value: 'ready_to_load',
    label: 'Ready to load',
  },
  {
    id: 6,
    value: 'loaded',
    label: 'Loaded',
  },
  {
    id: 7,
    value: 'shipped',
    label: 'Shipped',
  },
  {
    id: 8,
    value: 'delivered',
    label: 'Delivered',
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
