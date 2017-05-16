import * as actionType from '../constants/actionTypes'

export const categories = (state = [], action) => {
  switch (action.type) {
    case actionType.ADD_CATEGORY:
      return [
          ...state,
          {
            _id: action.category_id,
            title: action.text,
            items: []
          }
        ]
      ;
    case actionType.ADD_ITEM:
      return state.map((category, index) => {
        if (category._id === action.category_id) {
          return {
            ...category,
            items: [
              ...category.items,
              {
                _id: action.item_id,
                title: action.text
              }
            ]
          }
        }
        return category
      });
    case actionType.UPDATE_CATEGORY:
      return state.map((category, index) => {
        if (category._id === action.category_id) {
          return {
            ...category,
            title: action.text
          }
        }
        return category
      });
    case actionType.UPDATE_ITEM:
      return state.map((category) => {
        if (category._id === action.category_id) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item._id === action.item_id) {
                return {
                  ...item,
                  title: action.text
                }
              }
              return item
            })
          }
        }
        return category
      });
    case actionType.REMOVE_ITEM:
      return state.map((category, index) => {
        if (category._id === action.category_id) {
          return {
            ...category,
            items: category.items.filter((item) =>
              (item._id !== action.item_id)
            )
          }
        }
        return category
      });
    case actionType.FETCH_DATA:
      return action.data;
    case actionType.REMOVE_CATEGORY:
      return state.filter((category) =>
        (category._id !== action.category_id)
      );
    default:
      return state
  }
};
