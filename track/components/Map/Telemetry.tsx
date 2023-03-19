import { Box, Center, Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTelemetryState } from "../../store/map/map";

function Telemetry({ currentHeight, stopwatch }: any) {
	const { distance } = useSelector((state: any) => state.data);
	const [time, setTime] = useState("00:00:00");

	const { isRunInProgress, isTelemtryOpen } = useSelector((state: any) => state.map);
	const dispatch = useDispatch();

	function toggleTelemetryHeight() {
		if (!isRunInProgress) return;
		dispatch(setTelemetryState(!isTelemtryOpen));
	}

	useEffect(() => {
		let { hours, minutes, seconds } = stopwatch.getTimeValues();
		hours = hours < 10 ? `0${hours}` : hours;
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		setTime(`${hours}:${minutes}:${seconds}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stopwatch.getTimeValues().seconds]);

	return (
		<Box
			fontWeight="bold"
			flexDir="column"
			w="100%"
			h={currentHeight}
			onClick={toggleTelemetryHeight}
			transitionDuration="200ms"
			overflow="hidden">
			<Center h="10vh" fontSize="5vh">
				{time}
			</Center>
			<Divider />
			<Center h="10vh" fontSize="3vh">
				<Text>{distance} km</Text>
			</Center>
		</Box>
	);
}

export default Telemetry;
