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
            {value[1] === undefined ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header: 'Outstanding',
        accessor: 'outstanding',
        Cell: ({ cell: { value } }) => (
          <>
            <p>{value[0]}</p>
            {value[1] === '' ? <span>-</span> : <p>{value[1]}</p>}
          </>
        ),
      },
      {
        Header: 'Status',
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
    ],
  },
];
