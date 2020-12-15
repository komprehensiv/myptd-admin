import { thunk, action } from 'easy-peasy';
import getConfig from 'next/config';
import find from 'lodash/find';

const { publicRuntimeConfig: { RETAILERS_ENDPOINT, UPDATE_RETAILER_ENDPOINT, CREATE_RETAILER_ENDPOINT, DELETE_RETAILER_ENDPOINT }} = getConfig();
const getEmptyRetailer = () => {
  return {
    name: '',
    deliverySurcharge: '',
    deliveryPieceSurcharge: '',
    longDistanceDeliverySurcharge: '',
    longDistancePieceSurcharge: ''
  };
};

const retailerModel = {
  updateSuccessful: null,
  retailers: [],
  retailer: getEmptyRetailer(),
  fetchRetailers: thunk(async (actions, payload) => {
    const response = await fetch(RETAILERS_ENDPOINT);
    const { data } = await response.json();
    actions.setRetailers(data);
  }),
  setRetailers: action((state, payload) => {
    state.retailers = payload;
  }),
  updateSelectedRetailer: action((state, payload) => {
    state.retailer = payload;
  }),
  resetRetailer: action((state, payload) => {
    state.retailer = payload.isUpdate ? find(state.retailers, { id: state.retailer.id }) : getEmptyRetailer() ;
  }),
  clearRetailer: action((state, payload) => {
    state.retailer = { id: null, ...getEmptyRetailer() };
  }),
  updateRetailer: action((state, payload) => {
    const { key, value } = payload;
    state.retailer[key] = value;
  }),
  saveRetailer: thunk(async (actions, payload, { getState }) => {
    const { isUpdate } = payload;
    const { retailer } = getState();
    const body = JSON.stringify({ ...retailer });
    const endpoint = isUpdate ? UPDATE_RETAILER_ENDPOINT : CREATE_RETAILER_ENDPOINT;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    const { message, data } = await response.json();
    actions.fetchRetailers();
    actions.clearRetailer();
    actions.setUpdateSuccessfulStatus(true);
  }),
  deleteRetailer: thunk(async (actions, payload) => {
    const body = JSON.stringify({ id: payload });
    const endpoint = DELETE_RETAILER_ENDPOINT;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    const { message, data } = await response.json();
    actions.fetchRetailers();
    actions.clearRetailer();
    actions.setUpdateSuccessfulStatus(true);
  }),
  setUpdateSuccessfulStatus: action((state, payload) => {
    state.updateSuccessful = payload;
  })
}

export default retailerModel;
