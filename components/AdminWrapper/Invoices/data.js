import IconStar from '../../../assets/svg/viewStar.svg';
import IconStarDisabled from '../../../assets/svg/viewStarDisabled.svg';
import Button from '../../Button/Button';

export const columns = [
  {
    Header: 'Table',
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Client ID',
        accessor: 'client_id',
      },
      {
        Header: 'VIN',
        accessor: 'vin',
      },
      {
        Header: 'Auto',
        accessor: 'name_car',
      },
      {
        Header: 'Paiment for',
        accessor: 'paiment_for',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            {!value[1] ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header: 'Paid',
        accessor: 'paid',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            {!value[1] ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header: 'Outstanding',
        accessor: 'outstanding',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            {!value[1] ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0] || '-'}</p>
            <p>{value[1] || '-'}</p>
          </>
        ),
      },
      {
        Header: '',
        accessor: 'documents',
        Cell: ({ cell: { value } }) => (
          <>
            <Button
              target="_blank"
              href={value[0].link}
              customBtn="Invoices-viewBtn"
            >
              <IconStar className="Invoices-star" />
              View Invoice
            </Button>
            {value.length <= 1 ? (
              <Button disabled target="_blank" customBtn="Invoices-viewBtn">
                <IconStarDisabled className="Invoices-star" />
                View Invoice
              </Button>
            ) : (
              <Button
                target="_blank"
                href={value[1].link}
                customBtn="Invoices-viewBtn"
              >
                <IconStar className="Invoices-star" />
                View Invoice
              </Button>
            )}
          </>
        ),
      },
      {
        Header: 'Days past due',
        accessor: 'due_day',
      },
    ],
  },
];

export const print = [
  { name: 'Date', id: 'invoices.created_at' },
  { name: 'Id', id: 'invoices.id' },
  { name: 'Client Id', id: 'invoices.client_id' },
  { name: 'VIN', id: 'invoices.vin' },
  { name: 'Auto', id: 'invoices.name_car' },
  { name: 'Total', id: 'invoices.total_price' },
  { name: 'Paid', id: 'invoices.paid_price' },
  { name: 'Outstanding', id: 'invoices.outstanding_price' },
  { name: 'Status', id: 'invoices.status_shipping' },
  { name: 'Days past due', id: 'invoices.due_day' },
];

export const firstStatus = [
  {
    label: 'not due yet',
    value: 'not due yet',
  },
  {
    label: 'past due',
    value: 'past due',
  },
  {
    label: 'not paid',
    value: 'not paid',
  },
  {
    label: 'paid',
    value: 'paid',
  },
];
export const secondStatus = [
  {
    label: 'not paid',
    value: 'not paid',
  },
  {
    label: 'paid',
    value: 'paid',
  },
  {
    label: 'relist',
    value: 'relist',
  },
  {
    label: 'refund',
    value: 'refund',
  },
];

export const firstStatusSelect = [
  {
    label: 'Auction status',
    value: '',
  },
  {
    label: 'not due yet',
    value: 'not due yet',
  },
  {
    label: 'past due',
    value: 'past due',
  },
  {
    label: 'not paid',
    value: 'not paid',
  },
  {
    label: 'paid',
    value: 'paid',
  },
];
export const secondStatusSelect = [
  {
    label: 'Shipping status',
    value: '',
  },
  {
    label: 'not paid',
    value: 'not paid',
  },
  {
    label: 'paid',
    value: 'paid',
  },
  {
    label: 'relist',
    value: 'relist',
  },
  {
    label: 'refund',
    value: 'refund',
  },
];
