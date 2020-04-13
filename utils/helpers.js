export const getStatusInNumber = (status) => {
  switch (status) {
    case 'at_loading':
      return 0;
    case 'on_the_way':
      return 1;
    case 'at_unloading':
      return 2;
    case 'finish':
      return 3;
    default:
      return 0;
  }
};
