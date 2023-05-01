'use client'

import { useEffect, useState } from "react";
import {
	Run_distance,
	Run_duration,
	Run_startTime,
	Run_coords
} from "@/store/atoms"

import {
	Map_isRunInProgress,
	Map_isTelemetryOpen
} from "@/store/atoms"
import { useAtom } from "jotai";

interface TProps {
	currentHeight: any,
	stopwatch: any
}

function Telemetry({ currentHeight, stopwatch }: TProps) {

	const [time, setTime] = useState("00:00:00");
	const [isTelemetryOpen, setMap_isTelemetryOpen] = useAtom(Map_isTelemetryOpen);
	const [isRunInProgress, setMap_isRunInProgress] = useAtom(Map_isRunInProgress);
	const [getRun_distance, setRun_distance] = useAtom(Run_distance);

	function toggleTelemetryHeight() {
		if (!isRunInProgress) return;
		setMap_isTelemetryOpen(!isTelemetryOpen)
	}

	useEffect(() => {
		let { hours, minutes, seconds } = stopwatch.getTimeValues();
		hours = hours < 10 ? `0${hours}` : hours;
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		setTime(`${hours}:${minutes}:${seconds}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stopwatch.getTimeValues().seconds]);
	// }, [stopwatch.getTimeValues().seconds]);
	// 왜 stropwatch dependency 

	return (
		<div className="font-bold flex flex-col w-full h-[currentHeight] overflow-hidden transition duration-200ms"
			onClick={toggleTelemetryHeight}>
			<div className="h-10vh text-center text-5vh">
				{time}
			</div>
			<hr className="my-2" />
			<div className="h-10vh text-center text-3vh">
				<span>{getRun_distance} km</span>
			</div>
		</div>


	);
}

export default Telemetry;
