import * as actions from "../actions";

const initialState = {
  loading: false,
  metricDetails: {}
};

const getDroneDetails = (state, action) => {
  return { ...state, loading: true};
}
const saveDroneMetricsDetails = (state, action) => {
  return { ...state, loading: false , metricDetails : action.data};
}

const handlers = {
  [actions.FETCH_DRONE_DETAILS]: getDroneDetails,
  [actions.DRONE_METRICS_DATA_RECEVED]: saveDroneMetricsDetails

};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;

  return handler(state, action);
};
