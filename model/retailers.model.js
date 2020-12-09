import { thunk, action } from 'easy-peasy';
import getConfig from 'next/config';

const { publicRuntimeConfig: { RETAILERS_ENDPOINT }} = getConfig();

const retailerModel = {
  retailers: [],
  
  fetchRetailers: thunk(async (actions, payload) => {
    const response = await fetch(RETAILERS_ENDPOINT);
    const { data } = await response.json();
    actions.setRetailers(data);
  }),
  setRetailers: action((state, payload) => {
    state.retailers = payload;
  })
}

export default retailerModel;
