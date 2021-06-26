import { SUCCESS_SUFFIX } from "redux-axios-middleware";


const LIST_ESSAIS = 'LIST_ESSAIS';


const essaisReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_ESSAIS + SUCCESS_SUFFIX:
      return action.payload.data;

    default:
      return state;
  }
};

export default essaisReducer;

export const allBooks = () => ({
  type: LIST_ESSAIS,
  payload: {
    request: {
      url: '/demo/books',
    },
  },
});
