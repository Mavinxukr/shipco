export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('ID'),
        accessor: 'id',
      },
      {
        Header: t('ClientID'),
        accessor: 'client_id',
      },
      {
        Header: t("Catalog number"),
        accessor: 'catalog_number',
      },
      {
        Header: t('VINnumber'),
        accessor: 'vin',
        Cell: ({ cell: { value } }) => <>{value}</>,
      },
      {
        Header: t('Container'),
        accessor: 'container',
      },
      {
        Header: t('Deliverydate'),
        accessor: 'delivery_date',
      },
      {
        Header: t('Name'),
        accessor: 'name',
      },
      {
        Header: t('Auto'),
        accessor: 'auto',
      },
      // {
      //   Header: 'Comment',
      //   accessor: 'comment',
      // },
      {
        Header: t('Quality'),
        accessor: 'quality',
      },
      {
        Header: t('Status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => <>{value.split('_').join(' ')|| 'New' }</>,
      },
      {
        Header: t('Actions'),
        accessor: 'actions',
      },
    ],
  },
];

export const status = (t) => [
  {
    id: 1,
    value: '',
    label: 'all',
  },
  {
    id: 2,
    value: 'in_warehouse',
    label: t('inWarehouse')
  },
  {
    id: 3,
    value: 'in_the_sea',
    label: t('inTheSea')
  },
  {
    id: 4,
    value: 'at_the_port',
    label: t('atThePort')
  },
  {
    id: 5,
    value: 'delivered',
    label: t('delivered')
  },
];

export const statusSelect = (t) => [
  {
    id: 1,
    value: 'in_warehouse',
    label: t('inWarehouse')
  },
  {
    id: 2,
    value: 'in_the_sea',
    label: t('inTheSea')
  },
  {
    id: 3,
    value: 'at_the_port',
    label: t('atThePort')
  },
  {
    id: 4,
    value: 'delivered',
    label: t('delivered')
  },
];

export const print = (t) => [
  { name: t('Catalog number'), id: 'parts.catalog_number' },
  { name: t('Name'), id: 'parts.name' },
  { name: t('Auto'), id: 'parts.auto' },
  { name: 'Comment', id: 'parts.comment' },
  { name: t('Quality'), id: 'parts.quality' },
  { name: t('Status'), id: 'parts.status' },
];
