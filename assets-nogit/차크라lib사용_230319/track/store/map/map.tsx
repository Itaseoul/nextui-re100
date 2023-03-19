import produce, { Draft } from "immer";

type MapState = {
	isDrawerOpen: boolean;
	isTelemetryOpen: boolean;
	isAlertOpen: boolean;
	isGps: boolean;
	map: any;
	geolocate: any;
	isRunInProgress: boolean;
	isPaused: boolean;
};


const SET_DRAWER_STATE = "map/set_drawer_state";
const SET_ALERT_STATE = "map/set_alert_state";
const SET_GPS = "map/set_gps";
const SET_MAP = "map/set_map";
const SET_GEOLOCATE = "map/set_geolocate";
const SET_RUN_STATE = "map/set_run_start";
const SET_PAUSE = "map/set_pause";
const RESET_MAP_STATE = "map/reset_map_state";
const SET_TELEMETRY_STATE = "map/set_telemetry_state";

type SetMapDrawerAction = {
	type: typeof SET_DRAWER_STATE;
	payload: boolean;
};

type SetTelemetryStateAction = {
	type: typeof SET_TELEMETRY_STATE;
	payload: boolean;
};

type SetAlertStateAction = {
	type: typeof SET_ALERT_STATE;
	payload: boolean;
};

type SetRunStateAction = {
	type: typeof SET_RUN_STATE;
	payload: boolean;
};

type SetPauseAction = {
	type: typeof SET_PAUSE;
	payload: boolean;
};

type SetGpsAction = {
	type: typeof SET_GPS;
	payload: boolean;
};

type SetMapAction = {
	type: typeof SET_MAP;
	payload: any;
};

type SetGeolocateAction = {
	type: typeof SET_GEOLOCATE;
	payload: any;
};

type ResetMapStateAction = {
	type: typeof RESET_MAP_STATE;
};

type MapActionTypes =
	| SetMapDrawerAction
	| SetTelemetryStateAction
	| SetAlertStateAction
	| SetRunStateAction
	| SetPauseAction
	| SetGpsAction
	| SetMapAction
	| SetGeolocateAction
	| ResetMapStateAction;

export const setMapDrawer = (payload: boolean): SetMapDrawerAction => ({
	type: SET_DRAWER_STATE,
	payload,
});

export const setTelemetryState = (
	payload: boolean
): SetTelemetryStateAction => ({
	type: SET_TELEMETRY_STATE,
	payload,
});

export const setAlertState = (payload: boolean): SetAlertStateAction => ({
	type: SET_ALERT_STATE,
	payload,
});

export const setRunState = (payload: boolean): SetRunStateAction => ({
	type: SET_RUN_STATE,
	payload,
});

export const setPause = (payload: boolean): SetPauseAction => ({
	type: SET_PAUSE,
	payload,
});

export const setGps = (payload: boolean): SetGpsAction => ({
	type: SET_GPS,
	payload,
});

export const setMap = (payload: any): SetMapAction => ({
	type: SET_MAP,
	payload,
});

export const setGeolocate = (payload: any): SetGeolocateAction => ({
	type: SET_GEOLOCATE,
	payload,
});

export const resetMapState = (): ResetMapStateAction => ({
	type: RESET_MAP_STATE,
});

const initialState: MapState = {
	isDrawerOpen: false,
	isTelemetryOpen: false,
	isAlertOpen: false,
	isGps: false,
	map: null,
	geolocate: null,
	isRunInProgress: false,
	isPaused: false,
};

export function mapReducer(state = initialState, action: MapActionTypes) {
	switch (action.type) {
		case SET_DRAWER_STATE:
			return produce(state, (draft: Draft<MapState>) => {
				draft.isDrawerOpen = action.payload;
			});
		case SET_TELEMETRY_STATE:
			return produce(state, (draft: Draft<MapState>) => {
				draft.isTelemetryOpen = action.payload;
			});
		case SET_GPS:
			return produce(state, (draft: Draft<MapState>) => {
				draft.isGps = action.payload;
			});
		case SET_MAP:
			return produce(state, (draft: Draft<MapState>) => {
				draft.map = action.payload;
			});
		case SET_GEOLOCATE:
			return produce(state, (draft: Draft<MapState>) => {
				draft.geolocate = action.payload;
			});
		case SET_RUN_STATE:
			return produce(state, (draft: Draft<MapState>) => {
				draft.isRunInProgress = action.payload;
			});
		case SET_PAUSE:
			return produce(state, (draft: Draft<MapState>) => {
				draft.isPaused = action.payload;
			});
		case SET_ALERT_STATE:
			return produce(state, (draft: Draft<MapState>) => {
				draft.isAlertOpen = action.payload;
			});
		case RESET_MAP_STATE:
			return initialState;
		default:
			return state;
	}
}
