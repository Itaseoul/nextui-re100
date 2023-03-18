'use client'
import { useEffect, useState } from 'react';
import { realDB } from './firebase';
import { ref, onValue, off, limitToLast, query } from "firebase/database"
import { CalcmChargeFactor, convertSecToTime } from './calc'
interface EnergyData {
  id: number;
  value: number;
  // Add any other properties of your Firebase Realtime Database object
}

export default function GetPowerStream() {
  const [earray, setEarray] = useState<EnergyData[]>([]);
  const [curValue, setCurValue] = useState<number>(0);
  const [sumValue, setSumValue] = useState<number>(0);

  useEffect(() => {
    // const dbRef = ref(realDB, 'test');
    const recentdbRef = query(ref(realDB, 'test'), limitToLast(100));// Set the reference to the 'test' node in the database
    // TODO-check:https://firebase.google.com/docs/database/web/lists-of-data?hl=ko#filtering_data
    // https://firebase.google.com/docs/database/web/read-and-write?hl=ko#web-version-9_1
    // 웹에서 데이터 목록 다루기
    const handleData = (snapshot: any) => {
      const data = snapshot.val()
      const energydata: EnergyData[] = [];
      let idnum = 0;
      for (let id in data) {
        energydata.push({ ...data[id], id: idnum });
        idnum++;
      }
      setEarray(energydata);
      setCurValue(energydata[energydata.length - 1]?.value ?? 0);
      // Set the current value to the last value in the array, or 0 if the array is empty

      const valueArr = energydata.map((e) => Number((e.value * 1000000).toFixed(0)));
      const filtereValueArr = valueArr.filter((e) => isNaN(e) === false && e >= 30000);
      const sumValue = filtereValueArr.reduce(function add(sum, currValue) {
        return sum + currValue;
      }, 0);
      setSumValue(sumValue)
      const minValue = Math.min(...filtereValueArr);
      const maxValue = Math.max(...filtereValueArr);


      var estimatedServerTimeMs = new Date().getTime() + data;
      console.log(filtereValueArr, minValue, maxValue, estimatedServerTimeMs);

    };
    onValue(recentdbRef, handleData);

    return () => {
      off(recentdbRef); // Unsubscribe from the database reference when the component unmounts
    }
  }, []);


  const chargingSeconds = Number((sumValue / CalcmChargeFactor).toFixed(0))
  return (
    <div>
      <div className="text-3xl">g</div>
      <p className="text-2xl">{convertSecToTime(chargingSeconds)}</p>
      <p>Current value: {curValue.toFixed(3)}</p>
      <pre>{JSON.stringify(earray, null, 4)}</pre>
    </div>

  );
}



/**
내가 변경한 사항은 다음과 같습니다.


ref(realDB, 'test')를 사용하여 데이터베이스의 "테스트" 노드에 대한 참조를 설정합니다.
 
데이터베이스에서 받은 데이터를 처리하기 위해 별도의 함수 handleData를 정의합니다.
handleData에서 데이터를 EnergyData 개체의 배열로 변환하고 setEarray를 사용하여 설정합니다.
또한 handleData에서 setCurValue를 사용하여 현재 값을 배열의 마지막 값(또는 배열이 비어 있으면 0)으로 설정합니다.
구성 요소가 마운트 해제될 때 정리 기능을 사용하여 데이터베이스 참조에서 구독을 취소하십시오.
curValue를 사용하여 구성 요소의 현재 값을 표시합니다.

도움이 되길 바랍니다! 궁금한 점이 있으면 알려주세요.
*/