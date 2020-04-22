import * as actionTypes from './actionTypes';

export const getGroups = params => ({
  type: actionTypes.groups.request,
  params,
});

export const deleteGroups = (params, id) => ({
  type: actionTypes.groups.delete,
  params,
  id,
});

export const addNewGroups = (params, body) => ({
  type: actionTypes.groups.save,
  params,
  body,
});

export const updateGroups = (params, body, id) => ({
  type: actionTypes.groups.update,
  params,
  body,
  id,
});

export const getGroupsSuccess = body => ({
  type: actionTypes.groups.success,
  body,
});

export const getGroupsError = error => ({
  type: actionTypes.groups.error,
  error,
});
