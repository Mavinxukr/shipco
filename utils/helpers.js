import qs from 'query-string';
import { parserRequest } from '../services/parser';
import { API_DOMAIN_ADMIN } from '../enums/api';

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

export const getIdsArr = arr => arr.map(item => item.value);

export const printData = ({
  params, table, setSelected, setPrintPopup, selected,
}) => {
  if (selected.length !== 0) {
    parserRequest(
      params,
      table,
    );
    window.open(
      `${API_DOMAIN_ADMIN}parser/${table}?${qs.stringify({
        fields: selected.join(),
      })}`,
    );
    setSelected([]);
    setPrintPopup(false);
  }
};
