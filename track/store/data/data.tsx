import produce, { Draft } from "immer";

interface SetDistanceAction {
	type: typeof SET_DISTANCE;
	payload: string;
}

interface ResetDataStateAction {
	type: typeof RESET_DATA_STATE;
}

interface SetDurationAction {
	type: typeof SET_DURATION;
	payload: number;
}

interface SetStartTimeAction {
	type: typeof SET_START_TIME;
	payload: number;
}

interface SetCoordsAction {
	type: typeof SET_COORDS;
	payload: any;
}

type DataActionTypes =
	| SetDistanceAction
	| ResetDataStateAction
	| SetDurationAction
	| SetStartTimeAction
	| SetCoordsAction;

interface DataState {
	distance: string;
	duration: number;
	startTime: number;
	coords: any[];
}

const SET_DISTANCE = "data/set_telemetry";
const SET_DURATION = "data/set_running_time";
const SET_START_TIME = "data/set_start_time";
const SET_COORDS = "data/set_coords";
const RESET_DATA_STATE = "data/reset_data_state";

export const setDistance = (payload: string): SetDistanceAction => ({
	type: SET_DISTANCE,
	payload,
});

export const resetDataState = (): ResetDataStateAction => ({
	type: RESET_DATA_STATE,
});

export const setDuration = (payload: number): SetDurationAction => ({
	type: SET_DURATION,
	payload,
});

export const setStartTime = (payload: number): SetStartTimeAction => ({
	type: SET_START_TIME,
	payload,
});

export const setCoords = (payload: any): SetCoordsAction => ({
	type: SET_COORDS,
	payload,
});

const dataState: DataState = {
	distance: "0.00",
	duration: 0,
	startTime: 0,
	coords: [],
};

export const dataReducer = (state = dataState, action: DataActionTypes): DataState => {
	switch (action.type) {
		case SET_DISTANCE:
			return produce(state, (draft: Draft<DataState>) => {
				draft.distance = action.payload;
			});
		case SET_DURATION:
			return produce(state, (draft: Draft<DataState>) => {
				draft.duration = action.payload;
			});
		case SET_START_TIME:
			return produce(state, (draft: Draft<DataState>) => {
				draft.startTime = action.payload;
			});
		case SET_COORDS:
			return produce(state, (draft: Draft<DataState>) => {
				draft.coords.push(action.payload);
			});
		case RESET_DATA_STATE:
			return dataState;
		default:
			return state;
	}
};