export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('id'),
        accessor: 'id',
      },
      {
        Header: t('name'),
        accessor: 'name',
      },
      {
        Header: t('applicableType'),
        accessor: 'priceable_type',
      },
      {
        Header:  t('actions'),
        accessor: 'actions',
      },
    ],
  },
];

export const type = (t) => [
  { value: 'group', label: 'groups' },
  { value: 'client', label: 'clients' },
];

export const columnsPrice = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('cities'),
        accessor: 'name',
      },
      {
        Header: t('state'),
        accessor: 'state',
      },
      {
        Header: t('price'),
        accessor: 'price',
      },
    ],
  },
];
