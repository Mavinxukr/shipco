export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('catalogNumber'),
        accessor: 'catalog_number',
      },
      {
        Header: t('name'),
        accessor: 'name',
      },
      {
        Header: t('auto'),
        accessor: 'auto',
      },
      {
        Header: t('comment'),
        accessor: 'comment',
      },
      {
        Header: t('quality'),
        accessor: 'quality',
      },
      {
        Header: t('status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => <>{value.split('_').join(' ')}</>,
      },
      {
        Header: t('partsPhoto'),
        accessor: 'photo',
      },
      // {
      //   Header:  t('actions'),
      //   accessor: 'actions',
      // },
    ],
  },
];

export const status = (t) => [
  {
    id: 1,
    value: '',
    label: t('all'),
  },
  {
    id: 2,
    value: 'in_warehouse',
    label: t('inWarehouse'),
  },
  {
    id: 3,
    value: 'in_the_sea',
    label: t('inTheSea'),
  },
  {
    id: 4,
    value: 'at_the_port',
    label: t('atThePort'),
  },
  {
    id: 5,
    value: 'delivered',
    label: t('delivered'),
  },
];

export const statusSelect = (t) => [
  {
    id: 1,
    value: 'in_warehouse',
    label: t('inWarehouse'),
  },
  {
    id: 2,
    value: 'in_the_sea',
    label: t('inTheSea'),
  },
  {
    id: 3,
    value: 'at_the_port',
    label: t('atThePort'),
  },
  {
    id: 4,
    value: 'delivered',
    label: t('delivered'),
  },
];
