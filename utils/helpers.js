export const getStatusInNumber = (status) => {
  switch (status) {
    case 'in_warehouse':
      return 0;
    case 'in_the_sea':
      return 1;
    case 'at_the_port':
      return 2;
    case 'delivered':
      return 3;
    default:
      return 0;
  }
};
