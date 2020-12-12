import { thunk, action } from 'easy-peasy';
import getConfig from 'next/config';
import find from 'lodash/find';

const { publicRuntimeConfig: { RETAILERS_ENDPOINT }} = getConfig();

const retailerModel = {
  retailers: [],
  retailer: {
    deliverySurcharge: '',
    deliveryPieceSurcharge: '',
    longDistanceSurcharge: '',
    longDistancePieceSurcharge: ''
  },
  fetchRetailers: thunk(async (actions, payload) => {
    const response = await fetch(RETAILERS_ENDPOINT);
    const { data } = await response.json();
    actions.setRetailers(data);
  }),
  setRetailers: action((state, payload) => {
    state.retailers = payload;
  }),
  updateSelectedRetailer: action((state, payload) => {
    debugger;
    state.retailer = payload;
  }),
  updateRetailer: action((state, payload) => {
    const { key, value } = payload;
    state.retailer[key] = value;
  }),
}

export default retailerModel;
