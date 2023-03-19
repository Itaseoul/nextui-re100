import { useEffect, useState } from 'react';
import { realDB } from './firebase';
import { ref, onValue, off, limitToLast, query } from "firebase/database"
import { CalcmChargeFactor, convertSecToTime } from './calc'
import { position } from '@chakra-ui/react';

interface EnergyData {
  id: number;
  value: number;
  // Add any other properties of your Firebase Realtime Database object
}

export default function GetPowerStream() {
  const [earray, setEarray] = useState();
  const [curValue, setCurValue] = useState(0);
  const [sumValue, setSumValue] = useState<number>(0);

  // Fetch data from Firebase and update state
  useEffect(() => {
    const recentdbRef = query(ref(realDB, 'test'), limitToLast(100));

    const handleData = (snapshot: any) => {
      const data = snapshot.val()
      // Update state with energy data
      setEarray(data);
      // console.log(getFilteredEnergyValues(energydata), minValue, maxValue, estimatedServerTimeMs);
    };

    onValue(recentdbRef, handleData);

    return () => {
      off(recentdbRef);
    }
  }, []);

  // Calculate charging time based on current energy value
  const chargingSeconds = Number((sumValue / CalcmChargeFactor).toFixed(0))

  // Render component
  return (
    <div className='container-power'>
      {/* <p className="curvalue">{convertSecToTime(chargingSeconds)}</p> */}
      {/* <p className='curvalue'>Current value: {curValue}</p> */}
      <pre>{JSON.stringify(earray, null, 4)}</pre>
    </div>
  );
}

// Helper functions
function extractEnergyData(data: any): EnergyData[] {
  const energydata: EnergyData[] = [];
  let idnum = 0;
  for (let id in data) {
    if (data[id] !== null) {
      energydata.push({ ...data[id], id: idnum });
      idnum++;
    }
  }
  return energydata;
}


function getCurrentEnergyValue(energydata: EnergyData[]): number {
  return energydata.length > 0 ? energydata[energydata.length - 1].value ?? 0 : 0;
}

function getTotalEnergyValue(energydata: EnergyData[]): number {
  const valueArr = energydata.map((e) => Number((e.value * 1000000).toFixed(0)));
  const filtereValueArr = valueArr.filter((e) => isNaN(e) === false && e > 70000);
  const sumValue = filtereValueArr.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  return sumValue;
}

function getMinEnergyValue(energydata: EnergyData[]): number {
  const valueArr = energydata.map((e) => Number((e.value * 1000000).toFixed(0)));
  const filtereValueArr = valueArr.filter((e) => isNaN(e) === false && e > 70000);
  const minValue = Math.min(...filtereValueArr);
  return minValue;
}

function getMaxEnergyValue(energydata: EnergyData[]): number {
  const valueArr = energydata.map((e) => Number((e.value * 1000000).toFixed(0)));
  const filtereValueArr = valueArr.filter((e) => isNaN(e) === false && e > 70000);
  const maxValue = Math.max(...filtereValueArr);
  return maxValue;
}

function getEstimatedServerTimeMs(energydata: EnergyData[]): number {
  const estimatedServerTimeMs = new Date().getTime() + energydata.length;
  return estimatedServerTimeMs;
}

function getFilteredEnergyValues(energydata: EnergyData[]): number[] {
  const valueArr = energydata.map((e) => Number((e.value * 1000000).toFixed(0)));
  const filtereValueArr = valueArr.filter((e) => isNaN(e) === false && e > 70000);
  return filtereValueArr;
}