export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('ID'),
        accessor: 'id',
      },
      {
        Header: t('Name'),
        accessor: 'name',
      },
      {
        Header: t('Clientsingroup'),
        accessor: 'clients',
        Cell: ({ cell: { value } }) => (
          <>
            {value.map(itemName => <span key={itemName.clients.id}>{itemName.clients.name},{' '}</span>)}
          </>
        ),
      },
      {
        Header:  t('Daystopay'),
        accessor: 'due_day',
      },
      {
        Header: t('Actions'),
        accessor: 'actions',
      },
    ],
  },
];

export const print = (t) => [
  { name: t('ID'), id: 'id' },
  { name: t('Name'), id: 'name' },
  { name: t('price'), id: 'price' },
];
