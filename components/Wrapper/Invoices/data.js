import Button from '../../Button/Button';
import IconStar from '../../../assets/svg/viewStar.svg';
import IconStarDisabled from '../../../assets/svg/viewStarDisabled.svg';

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
        Header: t('auto'),
        accessor: 'name_car',
      },
      {
        Header: t('paimentFor'),
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
        Header: t('paid'),
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
        Header: t('status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
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
    ],
  },
];
