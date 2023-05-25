import * as constants from "../constants/product";

export function getListProductAction(payload) {
  return {
    type: constants.GET_LIST_PRODUCT_REQUEST_START,
    payload,
  };
}
export function handleSearchProduct(payload) {
  return {
    type: constants.SEARCH_PRODUCT_REQUEST_START,
    payload,
  };
}
