'use client'

import useTimer from "easytimer-react-hook";
import { memo, useRef } from "react";
import { FaChevronDown, FaRunning } from "react-icons/fa";
import { MdGpsFixed, MdGpsNotFixed, MdGpsOff } from "react-icons/md";

import AlertModal from "./AlertModal";
import RunControls from "./RunControls";
import Telemetry from "./Telemetry";
import {
	Run_distance,
	Run_duration,
	Run_startTime,
	Run_coords,

	Map_map,
	Map_geolocate,
	Map_isDrawerOpen,
	Map_isPaused,
	Map_isRunInProgress,
	Map_isGps,
	Map_isAlertOpen,
	Map_isTelemetryOpen

} from "@/store/atoms"

import { useAtom } from "jotai";

function Map() {

	const [getRun_distance, setRun_distance] = useAtom(Run_distance);
	const [getRun_duration, setRun_duration] = useAtom(Run_duration);
	const [getRun_startTime, setRun_startTime] = useAtom(Run_startTime);
	const [getRun_coords, setRun_coords] = useAtom(Run_coords);

	const [getMap_isDrawerOpen, setMap_isDrawerOpen] = useAtom(Map_isDrawerOpen);
	const [isRunInProgress, setMap_isRunInProgress] = useAtom(Map_isRunInProgress);
	const [isGps, setMap_isGps] = useAtom(Map_isGps);
	const [isPaused, setMap_isPaused] = useAtom(Map_isPaused);
	const [geolocate, setMap_geolocate] = useAtom(Map_geolocate);
	const [isAlertOpen, setMap_isAlertOpen] = useAtom(Map_isAlertOpen);
	const [isTelemetryOpen, setMap_isTelemetryOpen] = useAtom(Map_isTelemetryOpen);

	const mapRef = useRef<HTMLDivElement>(null);


	const [stopwatch] = useTimer();
	const [timer] = useTimer({
		startValues: { seconds: 3 },
		target: { seconds: 0 },
		countdown: true,
	});


	function closeDrawer() {
		setMap_isDrawerOpen(false)
	}


	return (
		// 지도 컴포넌트
		<div className={`fixed user-select-none duration-200 h-screen w-full 
	     ${getMap_isDrawerOpen
				? 'z-100 opacity-100 top-0'
				: 'z-0 opacity-0 top-full'} 
	    `}
		>

			{/* 지도 컴포넌트 on off */}
			{/* <button
				aria-label="Close"
				onClick={closeDrawer}
				className="absolute left-1 top-1"
			>	<FaChevronDown />
			</button> */}





			<div className={`relative transition-all duration-200 
         ${isTelemetryOpen
					? "h-[80vh]"
					: "h-[90vh]"}`} >



				<div ref={mapRef} className="h-full" />


				{(isPaused || !isRunInProgress) && (
					<div className="fixed z-10 h-full w-full top-0 left-0">
						<div
							className={`h-full w-full flex items-center justify-center  
		  		    ${isPaused ? "bg-black" : "bg-black/50"} bg-opacity-75`}
						>
							{timer.isRunning() ? (
								<p className="text-6xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-12xl">{timer.getTimeValues().seconds}</p>
							) : (
								<FaRunning className="text-6xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-12xl" />
							)}
						</div>
					</div>
				)}


				{/* gps 상태 버튼  */}
				<button
					aria-label="GPS"
					className={`
					z-10 fixed right-1.5 top-1.5 text-3xl focus:outline-none 
				  	${isGps === false
							? 'text-gray-800'
							: isGps === "error"
								? 'text-red-400'
								: 'text-green-400'}`}
					onClick={() => geolocate.trigger()}
				>
					{isGps === false
						? <MdGpsNotFixed />
						: isGps === "error"
							? <MdGpsOff />
							: <MdGpsFixed />}
				</button>

				{/* RunControls */}
				<RunControls
					mapContainer={mapRef.current!}
					stopwatch={stopwatch}
					timer={timer} />

			</div>

			{/* telemetry */}
			<Telemetry
				stopwatch={stopwatch}
				currentHeight={isTelemetryOpen ? "20vh" : "10vh"} />

			{/* alert */}
			{
				isAlertOpen &&
				<AlertModal
					timer={timer}
					stopwatch={stopwatch} />
			}

		</div >
	);
}

export default memo(Map);
