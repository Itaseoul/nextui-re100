'use client'

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Map_map,
	Map_geolocate,
	Map_isRunInProgress,
	Map_isAlertOpen,
	Map_isTelemetryOpen,
	setRunHistory,
	Set_Reset_Rundata,
	ReSet_Map_state
} from "@/store/atoms"

import { memo, useRef } from "react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useSupabase } from "@/lib/supabase/supabase-provider";
import { R100RunT_I } from "@/types/collections";

interface TProps {
	timer: any,
	stopwatch: any
}

function AlertModal({ timer, stopwatch }: TProps) {

	const { supabase } = useSupabase();
	const setRun = useSetAtom(setRunHistory)
	const resetRun = useSetAtom(Set_Reset_Rundata)
	const resetMap = useSetAtom(ReSet_Map_state)

	const [isRunInProgress, setMap_isRunInProgress] = useAtom(Map_isRunInProgress);
	const [geolocate, setMap_geolocate] = useAtom(Map_geolocate);
	const [getMap_map, setMap_map] = useAtom(Map_map);
	const [isAlertOpen, setMap_isAlertOpen] = useAtom(Map_isAlertOpen);
	const [isTelemetryOpen, setMap_isTelemetryOpen] = useAtom(Map_isTelemetryOpen);

	const cancelRef = useRef<HTMLInputElement | null>(null);


	function closeAlertBox() {
		setMap_isAlertOpen(false)
	}

	function resetAll() {
		timer.removeAllEventListeners();
		stopwatch.stop();
		getMap_map.removeControl(geolocate);
		getMap_map.remove();
	}

	async function postRun() {
		try {
			await supabase
				.from("re100run_run")
				.insert({
					distance: 12,
					duration: 23,
					power: 34,
					profile_id: "profile",
					start: "2021-09-01T00:00:00.000Z",
					end: "2021-09-01T00:00:00.000Z",
					start_place: [],
					end_place: [],

				});
		} catch (error: unknown) {
			const errorMessage = (error as { message: string }).message;
			alert(errorMessage);
		}
	}

	async function endRun() {
		try {
			if (isRunInProgress) {
				await postRun();
				resetAll();
			}
			resetRun()
			resetMap()

		} catch (error: unknown) {
			const errorMessage = (error as { message: string }).message;
			alert(errorMessage);
		}
	}


	return (
		<Dialog>
			<DialogTrigger>Open</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account
						and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default memo(AlertModal);
