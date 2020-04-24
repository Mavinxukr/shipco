export const stateStatus = [
  { value: '', label: 'All Ports' },
  { value: 'California', label: 'California' },
  { value: 'Texas', label: 'Texas' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'Savannah', label: 'Savannah' },
  { value: 'Montreal', label: 'Montreal' },
];

export const status = [
  {
    value: '',
    label: 'All Status',
  },
  {
    value: 'in_warehouse',
    label: 'in warehouse',
  },
  {
    value: 'in_the_sea',
    label: 'in the sea',
  },
  {
    value: 'at_the_port',
    label: 'at the port',
  },
  {
    value: 'delivered',
    label: 'delivered',
  },
];

export const print = [
  { name: 'Date', id: 'autos.created_at' },
  { name: 'Id', id: 'autos.id' },
  { name: 'Model', id: 'autos.model_name' },
  { name: 'Year', id: 'autos.year' },
  { name: 'Make name', id: 'autos.make_name' },
  { name: 'Lot', id: 'lot_infos.lot_number' },
  { name: 'Point of loading', id: 'ship_infos.point_load_city' },
  { name: 'Container ID', id: 'ship_infos.container_id' },
  { name: 'Point of delivery', id: 'ship_infos.point_delivery_city' },
  { name: 'Total', id: 'invoices.total_price' },
  { name: 'Paid', id: 'invoices.paid_price' },
  { name: 'Outstanding', id: 'invoices.outstanding_price' },
  { name: 'Status', id: 'autos.status' },
];
