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
          <Link
            href={{
              pathname: '/auto-admin/auto-open',
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
        accessor: 'auto',
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
                <p>
                  <span>$ {value[0]}</span>
                </p>
                <p>
                  {value[1] && <span>$ {value[1]}</span>}
                </p>
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
                <p>
                  <span>$ {value[0]}</span>
                </p>
                <p>
                  {value[1] && <span>$ {value[1]}</span>}
                </p>
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
        Cell: ({ cell: { value } }) => <p>{value && <span>$ {value}</span>}</p>,
      },
      {
        Header: 'Days to pay',
        accessor: 'client.due_day',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => <>{value.replace('_', ' ')}</>,
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

export const status = [
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

export const print = [
  { name: 'Date', id: 'autos.created_at' },
  { name: 'Id', id: 'autos.id' },
  { name: 'Model', id: 'autos.model_name' },
  { name: 'Year', id: 'autos.year' },
  { name: 'Make name', id: 'autos.make_name' },
  { name: 'Lot', id: 'lot_infos.lot_number' },
  { name: 'Point of loading', id: 'ship_infos.point_load_city' },
  { name: 'Container ID', id: 'ship_infos.container_id' },
  { name: 'Point of delivery', id: 'ship_infos.point_delivery_city' },
  { name: 'Total', id: 'invoices.total_price' },
  { name: 'Paid', id: 'invoices.paid_price' },
  { name: 'Outstanding', id: 'invoices.outstanding_price' },
  { name: 'Status', id: 'autos.status' },
];
