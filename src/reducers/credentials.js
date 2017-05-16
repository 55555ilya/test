export const credentials = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'REMOVE_TOKEN':
      return {};
    default:
      return state
  }
};
