import { take, race, call, put, cancel, all } from "redux-saga/effects";
import {delay} from 'redux-saga'
import API from "../api";
import * as actions from "../actions";

/*
  1. The weather service requires us to make a search by lat/lng to find its
  weather ID.
  2. We then use that weather ID to get the weather.

  This process is pretty well defined here with a saga.

  call invokes a method
  put dispatches an action
  takeEvery watches actions and executes a function

  Also -- the `*` in function is important; turns it into a "generator"

*/

function* getDroneDetails(action) {
  while (true) {
    const {error, data} = yield call(API.findDroneMetrics);
    if (error) {
      yield put ({type: action.API_ERROR, code: error.code });
      yield cancel();
      return;
    }
    yield put({ type: actions.DRONE_METRICS_DATA_RECEVED, data });
    yield call(delay, 4000)
}

}

function* watchDroneData() {
  while (true) {
    yield take(actions.FETCH_DRONE_DETAILS);
    yield race([
      call(getDroneDetails)
    ]);
  }
}

export default [watchDroneData];
