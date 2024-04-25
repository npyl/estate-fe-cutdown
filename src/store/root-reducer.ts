import { combineReducers } from "@reduxjs/toolkit";

import { reducer as customerFiltersReducer } from "../slices/customer/filters";
import { reducer as customerMiscReducer } from "../slices/customer/misc";
import { reducer as filtersReducer } from "../slices/filters";
import { reducer as logReducer } from "../slices/log";
import { reducer as securityReducer } from "../slices/security";

export const rootReducer = combineReducers({
  // property
  filters: filtersReducer,
  // customer
  customerMisc: customerMiscReducer,
  customerFilters: customerFiltersReducer,
  // general
  securitySlice: securityReducer,
  logsFilters: logReducer,
});
