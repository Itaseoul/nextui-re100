import { combineReducers, legacy_createStore as createStore } from "redux";
import { dataReducer } from "./data/data";
import { historyReducer } from "./history/history";
import { mapReducer } from "./map/map";

const rootreducer = combineReducers({
	// auth: authReducer,
	data: dataReducer,
	map: mapReducer,
	history: historyReducer,
});

const store = createStore(rootreducer);

export default store;

// https://velog.io/@gusdh2/redux-createStore-%EC%97%90-%EB%B0%91%EC%A4%84%EC%9D%B4-%EA%B7%B8%EC%97%AC%EC%A7%80%EB%8A%94-%EC%9D%B4%EC%9C%A0%EB%8A%94-%EC%99%9C%EC%9D%BC%EA%B9%8C
