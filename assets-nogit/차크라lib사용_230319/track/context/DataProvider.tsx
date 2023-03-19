import { createContext, memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import firebase from "../firebase/firebase";
import { deleteRun, setFetchedHistory } from "../store/history/history";
import store from "../store/rootreducer";
import { displayToast } from "../utils/helpers";

// const initialState = {
// 	distance: 0,
// 	duration: 0,
// 	startTime: 0,
// };
const dataContext = createContext({});
const { Provider: Data } = dataContext;

function DataProvider(props: any) {
	const user = "andrew"
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	async function deleteChosenRun(key: any) {
		dispatch(deleteRun(key));
		// TODO-check: delete run from firebase(anonymous / logged user data)
		// if (user.isAnonymous) {
		// 	dispatch(deleteRun(key));
		// 	return;
		// }

		// try {
		// 	const docRef = firebase.firestore().collection("users").doc(user.uid);
		// 	await docRef.update({ [key]: firebase.firestore.FieldValue.delete() });
		// 	dispatch(deleteRun(key));
		// } catch ({ message }) {
		// 	alert(message)
		// }
	}

	async function postRun() {
		const user = "andrew";
		// if (user.isAnonymous) {
		// 	return;
		// }

		const { distance, duration, startTime } = store.getState().data;
		const field = {
			[startTime]: {
				distance,
				duration,
				startTime,
			},
		};

		// const docRef = firebase.firestore().collection("users").doc(user.uid);
		// const doc = await docRef.get();
		// if (doc.exists) {
		// 	doc.ref.update(field);
		// } else {
		// 	doc.ref.set(field);
		// }
	}

	useEffect(() => {
		if (user) {
			const getRunHistory: any = async () => {

				// if (user.isAnonymous) {
				// 	setIsLoading(false);
				// 	return;
				// }
				try {
					// const docRef = firebase.firestore().collection("users").doc("andrew");
					// const doc = await docRef.get("andrew");
					// if (doc.exists) {
					// 	dispatch(setFetchedHistory(doc.data()));
					// }
					// setIsLoading(false);
				} catch ({ message }) {
					alert(message)
				}
			}
			getRunHistory();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const value = {
		postRun,
		deleteChosenRun,
		isLoading,
	};

	return <Data value={value}>{props.children}</Data>;
}

export const useData = () => useContext(dataContext);

export default memo(DataProvider);
