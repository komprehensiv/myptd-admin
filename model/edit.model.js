import { action } from 'easy-peasy';

const editModel = {
  editType: 'update',

  setEditType: action((state, payload) => {
    state.editType = payload;
  })
}

export default editModel;
