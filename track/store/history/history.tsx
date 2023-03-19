import produce from "immer";

const SET_RUN_HISTORY = "history/set_run_history";
const DELETE_RUN = "history/delete_run";
const SET_FETCHED_HISTORY = "history/set_fetched_history";

export const setRunHistory = ([key, value]: any) => ({
	type: SET_RUN_HISTORY,
	payload: [key, value],
});

export const deleteRun = (payload: any) => ({
	type: DELETE_RUN,
	payload,
});

export const setFetchedHistory = (payload: any) => ({
	type: SET_FETCHED_HISTORY,
	payload,
});

const historyState = {
	runs: {},
};

export function historyReducer(state = historyState, action: any) {
	switch (action.type) {
		case SET_RUN_HISTORY:
			return produce(state, (draft: any) => {
				draft.runs[action.payload[0]] = action.payload[1];
			});
		case DELETE_RUN:
			return produce(state, (draft: any) => {
				delete draft.runs[action.payload];
			});
		case SET_FETCHED_HISTORY:
			return produce(state, (draft) => {
				draft.runs = action.payload;
			});
		default:
			return state;
	}
}
