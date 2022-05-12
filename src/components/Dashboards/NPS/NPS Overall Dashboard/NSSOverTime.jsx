import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import mockApiData from "../../../../mock_API/NPS/NPS Main Dashboard/NSSOverTime.json";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import sentimentOverTimeApiData from "../../../../recoil/atoms/sentimentOverTimeApiData";

const NSSOverTime = () => {
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [nssOverTimeAPIData, setNssOverTimeAPIData] = useRecoilState(
    sentimentOverTimeApiData
  );

  // useEffect(() => {
  //   const requestURL =
  //     baseAPI +
  //     "nssOverTime?" +
  //     "start_year=" +
  //     finalStartDate +
  //     "&" +
  //     "start_month=" +
  //     finalStartMonth +
  //     "&" +
  //     "end_year=" +
  //     finalEndDate +
  //     "&" +
  //     "end_month=" +
  //     finalEndMonth;

  //   if (sendDataStatus === true) {
  //     // console.log("Requested URL: " + requestURL);
  //     axios.get(requestURL).then((res) => {
  //       // console.log(res);
  //       // console.log(res?.data);
  //       setApiData(res?.data);
  //     });
  //   } else if (sendDataStatus === false) {
  //     axios
  //       .get(
  //         baseAPI +
  //           "nssOverTime?start_month=1&start_year=2021&end_month=12&end_year=2021"
  //       )
  //       .then((res) => {
  //         setApiData(res?.data);
  //         // console.log("This is else if data" + res?.data);
  //       });
  //   }
  // }, [sendDataStatus]);

  useEffect(() => {
    setApiData(nssOverTimeAPIData);
    // console.log("atom data nss component");
    // console.log(nssOverTimeAPIData);
  }, [nssOverTimeAPIData]);

  return (
    <div className="p-2 md:p-5 w-full   rounded-lg bg-white flex justify-center md:justify-center items-center ">
      {!apiData && (
        <div className="min-h-[170px] w-full bg-[#ffffff] z-[0] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full">
          <h1 className=" font-bold opacity-80 ">Sentiment Over Time</h1>
          <div className="text-center text-[10px] opacity-80 flex w-full justify-between my-[10px]">
            <div></div>
            <div className="justify-self-center">
              <span className="invisible">2020</span>
            </div>
            <div className="flex justify-end items-center gap-[4px] ">
              <div className="bg-[#0094E0] h-[10px] w-[10px] rounded-full"></div>
              <p>Sentiments</p>
            </div>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={apiData?.nss_over_time}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  horizontal={false}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickCount={10}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  tickCount={4}
                  tickFormatter={(number) => `${number}%`}
                  margin={{ right: 20 }}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />

                <Bar
                  stackId="a"
                  barSize={20}
                  dataKey="nss"
                  fill="#0094E0"
                  radius={[20, 20, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NSSOverTime;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        {payload?.map((data) => (
          <div
            key={Math.random()}
            className="flex justify-between items-center "
          >
            {/* <div
                  className={`bg-[${data.stroke}] w-2 h-2 rounded-full mr-2`}
                ></div> */}
            <span className="uppercase mr-2 text-[10px]">{data.name}:</span>
            <span className="text-[10px]">{data.value} %</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
