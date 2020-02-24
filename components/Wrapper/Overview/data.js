export const dataSlider = [
  {
    id: 1,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current : '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
  {
    id: 2,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current : '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
  {
    id: 3,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current: '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
  {
    id: 4,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current : '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
  {
    id: 5,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current : '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
  {
    id: 6,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current : '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
  {
    id: 7,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current : '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
  {
    id: 8,
    src: '/images/pic.png',
    title: '2013 Volkwagen Jetta Hybrid',
    lot: 'Lot# 40063659',
    current : '$0 CAD',
    location: 'Location: NB - moncton',
    view: 'View Vechicle',
  },
];

export const dataShipping = [
  {
    id: 1,
    title: '2013 Volkwagen Jetta Hybrid',
    idCar: '20 4001 3813 4902',
    firstDate: '05  Jul, 2019',
    secondDate: '10  Aug, 2019',
    from: 'California',
    to: 'Kyiv',
    step: 1,
    car: 'Car on the way to port ',
  },
  {
    id: 2,
    title: '2013 Volkwagen Jetta Hybrid',
    idCar: '20 4001 3813 4902',
    firstDate: '05  Jul, 2019',
    secondDate: '10  Aug, 2019',
    from: 'California',
    to: 'Kyiv',
    step: 2,
    car: 'Car on the way to port ',
  },
  {
    id: 3,
    title: '2013 Volkwagen Jetta Hybrid',
    idCar: '20 4001 3813 4902',
    firstDate: '05  Jul, 2019',
    secondDate: '10  Aug, 2019',
    from: 'California',
    to: 'Kyiv',
    step: 0,
    car: 'Car on the way to port ',
  },
  {
    id: 4,
    title: '2013 Volkwagen Jetta Hybrid',
    idCar: '20 4001 3813 4902',
    firstDate: '05  Jul, 2019',
    secondDate: '10  Aug, 2019',
    from: 'California',
    to: 'Kyiv',
    step: 1,
    car: 'Car on the way to port ',
  },
  {
    id: 5,
    title: '2013 Volkwagen Jetta Hybrid',
    idCar: '20 4001 3813 4902',
    firstDate: '05  Jul, 2019',
    secondDate: '10  Aug, 2019',
    from: 'California',
    to: 'Kyiv',
    step: 1,
    car: 'Car on the way to port ',
  },
];

export const dataTable = [
  {
    id: 22779019,
    date: '28/12/18',
    auto: '2013 Volkwagen Jetta Hybrid',
    client: 'Lorem Ipsum',
    total: 25.000,
    paid: 0.00,
    outstanding: 25.000,
    status: 'Paid',
  },
  {
    id: 22779018,
    date: '28/12/13',
    auto: '2013 Volkwagen Jetta Hybrid',
    client: 'Lorem Ipsum',
    total: 25.000,
    paid: 0.00,
    outstanding: 25.000,
    status: 'Paid',
  },
  {
    id: 22779019,
    date: '28/12/14',
    auto: '2013 Volkwagen Jetta Hybrid',
    client: 'Lorem Ipsum',
    total: 25.000,
    paid: 0.00,
    outstanding: 25.000,
    status: 'Paid',
  },
  {
    id: 22779017,
    date: '28/12/12',
    auto: '2013 Volkwagen Jetta Hybrid',
    client: 'Lorem Ipsum',
    total: 25.000,
    paid: 0.00,
    outstanding: 25.000,
    status: 'Paid',
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
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: 'Client',
        accessor: 'client',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
      {
        Header: 'Paid',
        accessor: 'paid',
      },
      {
        Header: 'Outstanding',
        accessor: 'outstanding',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
  },
];
