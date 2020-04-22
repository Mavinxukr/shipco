const generateAction = namespace => ({
  request: `${namespace}/request`,
  success: `${namespace}/success`,
  error: `${namespace}/error`,
  save: `${namespace}/save`,
  update: `${namespace}/update`,
  delete: `${namespace}/delete`,
});

export const currentUser = generateAction('currentUser');
export const overview = generateAction('overview');
export const notifications = generateAction('notifications');
export const baseClient = generateAction('baseClient');
export const client = generateAction('client');
export const currentClient = generateAction('currentClient');
export const auto = generateAction('auto');
export const autoClient = generateAction('autoClient');
export const autoId = generateAction('autoId');
export const parts = generateAction('parts');
export const clientParts = generateAction('clientParts');
export const shipping = generateAction('shipping');
export const clientShipping = generateAction('clientShipping');
export const dismanting = generateAction('dismanting');
export const clientDismanting = generateAction('clientDismanting');
export const autoByContainer = generateAction('autoByContainer');
export const invoices = generateAction('invoices');
export const clientInvoices = generateAction('clientInvoices');
export const groups = generateAction('groups');
