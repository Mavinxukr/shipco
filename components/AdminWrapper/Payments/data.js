export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('ID'),
        accessor: 'id',
      },
      {
        Header:  t('name'),
        accessor: 'name',
      },
      {
        Header: t('applicableType'),
        accessor: 'applicable_type',
      },
      {
        Header: 'Applicable name',
        accessor: 'applicable.name',
      },
      {
        Header: t('daysToPay'),
        accessor: 'due_day',
      },
      {
        Header: t('Actions'),
        accessor: 'actions',
      },
    ],
  },
];

export const city = [
  { value: '1', label: 'California' },
  { value: '2', label: 'Texas' },
  { value: '3', label: 'New Jersey' },
  { value: '4', label: 'Savannah' },
  { value: '5', label: 'Montreal' },
];

export const type = [
  { value: 'group', label: 'groups' },
  { value: 'client', label: 'clients' },
];
