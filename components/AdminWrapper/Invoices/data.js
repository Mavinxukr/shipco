import IconStar from '../../../assets/svg/viewStar.svg';
import IconStarDisabled from '../../../assets/svg/viewStarDisabled.svg';
import Button from '../../Button/Button';

export const columns = (t) => [
  {
    Header: 'Table',
    columns: [
      {
        Header: t('id'),
        accessor: 'id',
      },
      {
        Header: t('date'),
        accessor: 'date',
      },
      {
        Header:  t('clientId'),
        accessor: 'client_id',
      },
      {
        Header: t('vin'),
        accessor: 'vin',
      },
      {
        Header: t('auto'),
        accessor: 'name_car',
      },
      {
        Header: t('paymentFor'),
        accessor: 'paiment_for',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: t('total'),
        accessor: 'total',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            {!value[1] ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header:  t('paid'),
        accessor: 'paid',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            {!value[1] ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header: t('outstanding'),
        accessor: 'outstanding',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            {!value[1] ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header:  t('status'),
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
              {t('viewInvoice')}
            </Button>
            {value.length <= 1 ? (
              <Button disabled target="_blank" customBtn="Invoices-viewBtn">
                <IconStarDisabled className="Invoices-star" />
                {t('viewInvoice')}
              </Button>
            ) : (
              <Button
                target="_blank"
                href={value[1].link}
                customBtn="Invoices-viewBtn"
              >
                <IconStar className="Invoices-star" />
                {t('viewInvoice')}
              </Button>
            )}
          </>
        ),
      },
      {
        Header: t('daysPastDue'),
        accessor: 'due_day',
      },
    ],
  },
];

export const print = (t) => [
  { name: t('date'), id: 'invoices.created_at' },
  { name: t('id'), id: 'invoices.id' },
  { name: t('clientId'), id: 'invoices.client_id' },
  { name: t('vin'), id: 'invoices.vin' },
  { name: t('auto'), id: 'invoices.name_car' },
  { name: t('total'), id: 'invoices.total_price' },
  { name: t('paid'), id: 'invoices.paid_price' },
  { name: t('outstanding'), id: 'invoices.outstanding_price' },
  { name: t('status'), id: 'invoices.status_shipping' },
  { name: t('daysPastDue'), id: 'invoices.due_day' },
];
