export const type = [
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
