export const columns = (t) => {
  return [
    {
      Header: 'Table',
      columns: [
        {
          Header: t('id'),
          accessor: 'id',
          Cell: ({ cell: { value } }) => <span>{value}</span>,
        },
        {
          Header: t('date'),
          accessor: 'date',
        },
        {
          Header: t('auto'),
          accessor: 'name_car',
          Cell: ({ cell: { value } }) => <span>{value}</span>,
        },
        {
          Header: t('total'),
          accessor: 'total_price',
          Cell: ({ cell: { value } }) => <>$ {value}</>,
        },
        {
          Header: t('paid'),
          accessor: 'paid_price',
          Cell: ({ cell: { value } }) => <>$ {value}</>,
        },
        {
          Header: t('outstanding'),
          accessor: 'outstanding_price',
          Cell: ({ cell: { value } }) => <>$ {value}</>,
        },
        {
          Header: t('status'),
          accessor: 'status',
        },
      ],
    },
  ];
};
