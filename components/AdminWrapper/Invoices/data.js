import IconStar from '../../../assets/svg/viewStar.svg';
import IconStarDisabled from '../../../assets/svg/viewStarDisabled.svg';
import Button from '../../Button/Button';

export const dataTable = [
  {
    id: 22779018,
    date: '28/12/13',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', ''],
    total: [25000],
    paid: [0.0],
    outstanding: ['25,000.00', ''],
    status: ['Paid', 'Unpaide'],
    view: [
      'https://www.prikol.ru/wp-content/uploads/2017/10/kartinki-04102017-001.jpg',
      '',
    ],
  },
  {
    id: 22779019,
    date: '28/12/18',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', 'Shipping charge invoice'],
    total: [25000, 250000],
    paid: [0.0, 0.0],
    outstanding: ['25,000.00', '10,000.00'],
    status: ['Paid', 'Paid'],
    view: [
      'https://mixnews.lv/wp-content/uploads/2019/11/22/1574367889_0042-e1574430618761.jpg',
      'https://www.prikol.ru/wp-content/uploads/2017/10/kartinki-04102017-001.jpg',
    ],
  },
  {
    id: 22779019,
    date: '28/12/14',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', 'Shipping charge invoice'],
    total: [25000, 250000],
    paid: [0.0, 0.0],
    outstanding: ['25,000.00', '10,000.00'],
    status: ['Paid', 'Paid'],
    view: [
      'https://mixnews.lv/wp-content/uploads/2019/11/22/1574367889_0042-e1574430618761.jpg',
      'https://mixnews.lv/wp-content/uploads/2019/11/22/1574367889_0042-e1574430618761.jpg',
    ],
  },
  {
    id: 22779017,
    date: '28/12/12',
    auto: '2013 Volkwagen Jetta Hybrid',
    paiment: ['Auction invoice', 'Shipping charge invoice'],
    total: [25000, 250000],
    paid: [0.0, 0.0],
    outstanding: ['25,000.00', '10,000.00'],
    status: ['Paid', 'Paid'],
    view: [
      'https://mixnews.lv/wp-content/uploads/2019/11/22/1574367889_0042-e1574430618761.jpg',
      'https://mixnews.lv/wp-content/uploads/2019/11/22/1574367889_0042-e1574430618761.jpg',
    ],
  },
];

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
        accessor: 'auto',
      },
      {
        Header: 'Paiment for',
        accessor: 'paiment',
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
            <p>{value[1]}</p>
          </>
        ),
      },
      {
        Header: '',
        accessor: 'view',
        Cell: ({ cell: { value } }) => (
          <>
            <Button target="_blank" href={value[0]} customBtn="Invoices-viewBtn">
              <IconStar className="Invoices-star" />
              View Invoice
            </Button>
            {value[1] === '' ? (
              <Button disabled target="_blank" href={value[1]} customBtn="Invoices-viewBtn">
                <IconStarDisabled className="Invoices-star" />
                View Invoice
              </Button>
            ) : (
              <Button target="_blank" href={value[1]} customBtn="Invoices-viewBtn">
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
