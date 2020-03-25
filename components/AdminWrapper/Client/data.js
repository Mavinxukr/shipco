import Link from 'next/link';

export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'Date',
        accessor: 'created_at',
      },
      {
        Header: 'Product',
        accessor: 'product',
        Cell: ({ cell: { value } }) => <>Auto{value}</>,
      },
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ cell: { value } }) => (
          <Link href={{
            pathname: '/auto-open',
            query: {
              idAuto: value,
            },
          }}
          >
            <a>
              <span>{value}</span>
            </a>
          </Link>
        ),
      },
      {
        Header: 'Model',
        accessor: 'model_name',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: 'Lot',
        accessor: 'lot_info.lot_number',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: 'Point of loading',
        accessor: 'ship_info.point_load',
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <>
                <p>{value[0]}</p>
                <p>{value[1]}</p>
              </>
            ) : (
              <>{value}</>
            )}
          </>
        ),
      },
      {
        Header: 'Container ID',
        accessor: 'ship_info.container_id',
      },
      {
        Header: 'Point of delivery',
        accessor: 'ship_info.point_delivery',
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <>
                <p>{value[0]}</p>
                <p>{value[1]}</p>
              </>
            ) : (
              <>{value}</>
            )}
          </>
        ),
      },
      {
        Header: 'Paiment for',
        accessor: 'paiment',
      },
      {
        Header: 'Total',
        accessor: 'invoice.total',
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <>
                <p><span>{value[0]}</span></p>
                <p><span>{value[1]}</span></p>
              </>
            ) : (
              <>{value}</>
            )}
          </>
        ),
      },
      {
        Header: 'Paid',
        accessor: 'invoice.paid',
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <>
                <p><span>{value[0]}</span></p>
                <p><span>{value[1]}</span></p>
              </>
            ) : (
              <>{value}</>
            )}
          </>
        ),
      },
      {
        Header: 'Outstanding',
        accessor: 'invoice.outstanding_price',
        Cell: ({ cell: { value } }) => <p>{value && (<span>{value}</span>)}</p>,
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
  },
];

export const stateStatus = [
  {
    value: '',
    label: 'All Status',
  },
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'not_approved',
    label: 'Not approved',
  },
  {
    value: 'delivered',
    label: 'Delivered',
  },
];
