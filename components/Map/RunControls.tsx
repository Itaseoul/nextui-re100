'use client'

import { Button, HStack, IconButton, useToast } from "@chakra-ui/react";
import { lineString } from "@turf/helpers";
import length from "@turf/length";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { memo, useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";
import { TiRefresh } from "react-icons/ti";

import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  Run_distance,
  Run_duration,
  Run_startTime,
  Run_coords,
  Set_pushCoords
} from "@/store/atoms"

import {
  Map_map,
  Map_geolocate,
  Map_isDrawerOpen,
  Map_isPaused,
  Map_isRunInProgress,
  Map_isGps,
  Map_isAlertOpen,
  Map_isTelemetryOpen
} from "@/store/atoms"

interface TProps {
  timer: any,
  stopwatch: any,
  mapContainer: HTMLDivElement
}

function RunControls(props: TProps) {
  const [getRun_distance, setRun_distance] = useAtom(Run_distance);
  const [getRun_duration, setRun_duration] = useAtom(Run_duration);
  const [getRun_startTime, setRun_startTime] = useAtom(Run_startTime);

  const getRun_coords = useAtomValue(Run_coords);
  const setRun_pushCoords = useSetAtom(Set_pushCoords);

  const [getMap_isDrawerOpen, setMap_isDrawerOpen] = useAtom(Map_isDrawerOpen);
  const [isRunInProgress, setMap_isRunInProgress] = useAtom(Map_isRunInProgress);
  const [isGps, setMap_isGps] = useAtom(Map_isGps);
  const [isPaused, setMap_isPaused] = useAtom(Map_isPaused);
  const [geolocate, setMap_geolocate] = useAtom(Map_geolocate);
  const [getMap_map, setMap_map] = useAtom(Map_map);
  const [isAlertOpen, setMap_isAlertOpen] = useAtom(Map_isAlertOpen);
  const [isTelemetryOpen, setMap_isTelemetryOpen] = useAtom(Map_isTelemetryOpen);



  const { timer, stopwatch, mapContainer } = props;
  const [countdownPhase, setCountdownPhase] = useState(false);

  const toast = useToast();

  const watchRef = useRef<number | null>(null);
  const runRef = useRef(isRunInProgress);






  function initiateMap(longitude: number, latitude: number) {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 17.5,
      attributionControl: false,
      locale: { "ko-KR": "지도" }

    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: false,
      fitBoundsOptions: { maxZoom: 17.5 },
    });
    map.addControl(geolocate).on("load", () => {
      geolocate.trigger();
      map.addSource("run-path", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      }).addLayer({
        id: "run-path",
        type: "line",
        source: "run-path",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#03c4a1",
          "line-width": 4,
        },
      });
    });

    setMap_map(map);
    setMap_geolocate(geolocate);
  }

  function start() {
    navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
      setMap_isGps(true)
      initiateMap(longitude, latitude);
      timer.start();
      setMap_isGps(true)
      setRun_startTime(Date.now())


      setCountdownPhase(true);
    }, error);
  }

  function pause() {
    setMap_isPaused(true)
    if (watchRef.current !== null) {
      navigator.geolocation.clearWatch(watchRef.current);
    }
    stopwatch.pause();
  }

  function resume() {
    setMap_isPaused(false)

    if (!runRef.current) {
      start();
    } else {
      timerTargetAchieved();
    }
  }

  function stop() {
    if (watchRef.current !== null) {
      navigator.geolocation.clearWatch(watchRef.current);
    }
    let { hours, minutes, seconds } = stopwatch.getTimeValues();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    setRun_duration(`${hours}:${minutes}:${seconds}`)
    setMap_isAlertOpen(true)
  }

  function timerTargetAchieved() {
    setCountdownPhase(false);

    setMap_isRunInProgress(true)
    watchRef.current = navigator.geolocation.watchPosition(success, error);
    stopwatch.start(); ``
  }

  function success({ coords: { longitude, latitude } }: GeolocationPosition) {
    setMap_isGps(true);
    setRun_pushCoords([longitude, latitude]);
  }


  function error({ code }: { code: number }) {
    setMap_isGps("error")
    pause();
    let message;
    switch (code) {
      case 1:
        message = "GPS가 차단되어 있습니다. 브라우저 설정에서 GPS 차단을 해제하고 계속 진행하세요!";
        break;
      case 2:
      case 3:
        message = "GPS 연결이 없습니다!";
        break;
    }
    // displayToast(toast, 1, "error", message);
  }

  useEffect(() => {
    if (getRun_coords.length >= 2) {
      // const positions = getRun_coords.map(coord => [coord[0], coord[1]]);

      const distance = length(lineString(getRun_coords));
      console.log('getRun_coords:', getRun_coords);

      setRun_distance(distance.toFixed(2))
      getMap_map.getSource("run-path").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: getRun_coords,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRun_coords]);

  useEffect(() => {
    runRef.current = isRunInProgress;
    timer.addEventListener("targetAchieved", timerTargetAchieved);
    return () => timer.removeEventListener("targetAchieved", timerTargetAchieved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunInProgress]);





  return (
    <HStack zIndex="10" position="absolute" bottom="5vh" left="50%" transform="translateX(-50%)" spacing="3vw">
      {isGps !== "error" && (
        <>
          {!isRunInProgress && !countdownPhase && (
            <Button fontSize="5vh" borderRadius="full" h="15vh" w="15vh" onClick={start}>
              GO
            </Button>
          )}
          {!isPaused && isRunInProgress && (
            <IconButton
              aria-label="Pause"
              fontSize="5vh"
              borderRadius="full"
              h="15vh"
              w="15vh"
              icon={<BsPauseFill />}
              onClick={pause}
            />
          )}
          {isPaused && (
            <IconButton
              aria-label="Resume"
              fontSize="5vh"
              borderRadius="full"
              h="15vh"
              w="15vh"
              icon={<BsPlayFill />}
              onClick={resume}
            />
          )}
        </>
      )}
      {(isPaused || isGps === "error") && (
        <IconButton
          aria-label="Stop"

          fontSize="5vh" borderRadius="full" h="15vh" w="15vh" icon={<BsStopFill />} onClick={stop} />
      )}
      {isGps === "error" && (
        <>
          <IconButton
            aria-label="Refresh"
            fontSize="5vh"
            borderRadius="full"
            h="15vh"
            w="15vh"
            icon={<TiRefresh />}
            onClick={resume}
          />
        </>

      )}
    </HStack>
  );
}

export default memo(RunControls);
