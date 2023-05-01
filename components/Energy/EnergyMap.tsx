'use client'
import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react';

type Props = {};

export default function EnergyMap(props: Props) {
  const longitude = 37.2345;
  const latitude = 127.2345;

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";
    const EnergyMap = new mapboxgl.Map({
      container: 'EnergyMap', // The ID of the div element to render the map into
      style: "mapbox://styles/mapbox/dark-v11",
      center: [latitude, longitude],
      zoom: 12.5, // 17.5(zoom level human)
      attributionControl: false,
      locale: { "ko-KR": "지도" }
    });
  }, []); // Make sure to add an empty dependency array to ensure this only runs once

  return <div id="EnergyMap" style={{ width: "100vw", height: "300px" }} />;
}