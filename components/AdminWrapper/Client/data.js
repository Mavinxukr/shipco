import Link from 'next/link';

export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('Date purchased'),
        accessor: 'created_at',
      },
      {
        Header: t('ID'),
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
        Header: t('Images'),
        accessor: 'image.link',
        Cell: ({ cell: { value } }) => (
          <img src={value || '/images/no-preview-available.png'} alt={value} />
        ),
      },
      {
        Header: t('Client id'),
        accessor: 'client.id',
      },
      {
        Header: t('Model'),
        accessor: 'auto',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: t('Lot'),
        accessor: 'lot_info.lot_number',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: t('VIN number'),
        accessor: 'lot_info.vin_code',
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: t('Point of loading'),
        accessor: 'ship_info.point_load',
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <>
                <p>{value[0]}</p>
              </>
            ) : (
              <>{value}</>
            )}
          </>
        ),
      },
      {
        Header: t('Container ID'),
        accessor: 'ship_info.container_id',
      },
      {
        Header: t('Point of delivery'),
        accessor: 'ship_info.point_delivery',
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <>
                <p>{value[0]}</p>
              </>
            ) : (
              <>{value}</>
            )}
          </>
        ),
      },
      {
        Header: t('Payment for'),
        accessor: 'paiment',
      },
      {
        Header: t('Total'),
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
        Header: t('Paid'),
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
        Header: t('Outstanding'),
        accessor: 'invoice.outstanding_price',
        Cell: ({ cell: { value } }) => <p>{value && <span>$ {value}</span>}</p>,
      },
      {
        Header: t('Status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => <>{value.split('_').join(' ')}</>,
      },
      {
        Header: t('Key'),
        accessor: 'feature_info.key',
      },
      {
        Header: t('Auction'),
        accessor: 'auction',
      },
      {
        Header: t('Damage status'),
        accessor: 'ship_info.damage_status',
        Cell: ({ cell: { value } }) => <>{value && value.split('_').join(' ')}</>,
      },
    ],
  },
];

export const auctions = [
  { value: 'Antique', label: 'Antique' },
  { value: 'AutoBidMaster', label: 'AutoBidMaster' },
  { value: 'Manheim', label: 'Manheim' },
  { value: 'EZ Auto Auction', label: 'EZ Auto Auction' },
  { value: 'AMCbid', label: 'AMCbid' },
];

export const popularCars = [
  { value: 'Toyota Camry', label: 'Toyota Camry' },
  { value: 'Toyota Corolla', label: 'Toyota Corolla' },
  { value: 'Honda Civic', label: 'Honda Civic' },
  { value: 'Nissan Altima', label: 'Nissan Altima' },
  { value: 'Honda Accord', label: 'Honda Accord' },
  { value: 'Hyundai Elantra', label: 'Hyundai Elantra' },
  { value: 'Nissan Sentra', label: 'Nissan Sentra' },
  { value: 'Ford Fusion', label: 'Ford Fusion' },
  { value: 'Chevrolet Cruze', label: 'Chevrolet Cruze' },
  { value: 'Hyundai Sonata', label: 'Hyundai Sonata' },
  { value: 'Ford Focus', label: 'Ford Focus' },
  { value: 'Chevrolet Malibu', label: 'Chevrolet Malibu' },
  { value: 'Nissan Versa', label: 'Nissan Versa' },
  { value: 'Subaru Impreza', label: 'Subaru Impreza' },
  { value: 'Kia Forte', label: 'Kia Forte' },
  { value: 'Kia Optima', label: 'Kia Optima' },
  { value: 'Volkswagen Jetta', label: 'Volkswagen Jetta' },
  { value: 'Ford Mustang', label: 'Ford Mustang' },
  { value: 'Chevrolet Impala', label: 'Chevrolet Impala' },
  { value: 'Kia Soul', label: 'Kia Soul' },
];

export const city = [
  { value: '1', label: 'California' },
  { value: '2', label: 'Texas' },
  { value: '3', label: 'New Jersey' },
  { value: '4', label: 'Savannah' },
  { value: '5', label: 'Montreal' },
];

export const cityselect = [
  { value: '', label: 'Point of loading' },
  { value: 'California', label: 'California' },
  { value: 'Texas', label: 'Texas' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'Savannah', label: 'Savannah' },
  { value: 'Montreal', label: 'Montreal' },
];

export const stateStatus = [
  {
    value: '',
    label: 'All Status',
  },
  {
    value: 'dispatched',
    label: 'Dispatched',
  },
  {
    value: 'title_delay',
    label: 'Title delay',
  },
  {
    value: 'ready_to_load',
    label: 'Ready to load',
  },
  {
    value: 'loaded',
    label: 'Loaded',
  },
  {
    value: 'shipped',
    label: 'Shipped',
  },
  {
    value: 'delivered',
    label: 'Delivered',
  },
];

export const status = [
  {
    value: 'dispatched',
    label: 'Dispatched',
  },
  {
    value: 'title_delay',
    label: 'Title delay',
  },
  {
    value: 'ready_to_load',
    label: 'Ready to load',
  },
  {
    value: 'loaded',
    label: 'Loaded',
  },
  {
    value: 'shipped',
    label: 'Shipped',
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
  { name: 'Lot', id: 'lot_infos.lot_number' },
  { name: 'VIN', id: 'lot_infos.vin_code' },
  { name: 'Point of loading', id: 'ship_infos.point_load_city' },
  { name: 'Container ID', id: 'ship_infos.container_id' },
  { name: 'Point of delivery', id: 'ship_infos.point_delivery_city' },
  { name: 'Total', id: 'invoices.total_price' },
  { name: 'Paid', id: 'invoices.paid_price' },
  { name: 'Outstanding', id: 'invoices.outstanding_price' },
  { name: 'Status', id: 'autos.status' },
  { name: 'Key', id: 'feature_infos.key' },
  { name: 'Auction', id: 'autos.auction' },
  { name: 'Damage status', id: 'ship_infos.damage_status' },
];

export const damageStatus = [
  {
    label: 'Damage status',
    value: '',
  },
  {
    label: 'Case closed',
    value: 'case_closed',
  },
  {
    id: 2,
    label: 'Under unvestigation',
    value: 'under_unvestigation',
  },
  {
    id: 3,
    label: 'Compensation given',
    value: 'compensation_given',
  },
];

export const statusRadio = [
  {
    id: 1,
    text: 'Yes',
  },
  {
    id: 0,
    text: 'No',
  },
];
