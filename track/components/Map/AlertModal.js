import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	Button,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../context/DataProvider";
import { resetDataState } from "../../store/data/data";
import { setRunHistory } from "../../store/history/history";
import { resetMapState, setAlertState } from "../../store/map/map";
import { displayToast } from "../../utils/helpers";

function AlertModal({ timer, stopwatch }) {
	const bg = useColorModeValue("green.400", "green.900");
	const color = useColorModeValue("green.900", "green.400");
	const { postRun } = useData();
	const { isAlertOpen, map, geolocate, isRunInProgress } = useSelector((state) => state.map);
	const { distance, duration, startTime } = useSelector((state) => state.data);
	const dispatch = useDispatch();
	const toast = useToast();

	function closeAlertBox() {
		dispatch(setAlertState(false));
	}

	function resetAll() {
		timer.removeAllEventListeners();
		stopwatch.stop();
		map.removeControl(geolocate);
		map.remove();
	}

	async function endRun() {
		try {
			if (isRunInProgress) {
				await postRun();
				resetAll();
				dispatch(setRunHistory([startTime, { distance, duration, startTime }]));
			}
			dispatch(resetMapState());
			dispatch(resetDataState());
		} catch ({ message }) {
			displayToast(toast, 1, "error", message);
		}
	}

	return (
		<AlertDialog isOpen={isAlertOpen} onClose={closeAlertBox} color={color} bg={bg} isCentered={true} ml={3} mr={3}>
			<AlertDialogContent>
				<AlertDialogCloseButton />
				<AlertDialogHeader>종료하기</AlertDialogHeader>
				<AlertDialogBody>리백런을 종료하시겠습니까?</AlertDialogBody>
				<AlertDialogFooter>
					<Button onClick={endRun}>종료</Button>
					<Button bg="red.400" ml={3} onClick={closeAlertBox}>
						계속
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default memo(AlertModal);
