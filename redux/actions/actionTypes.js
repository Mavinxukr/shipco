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
