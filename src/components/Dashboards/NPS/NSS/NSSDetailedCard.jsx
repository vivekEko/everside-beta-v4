import React, { useEffect, useState } from "react";
import RespondantsIcon from "../../../../assets/img/global-img/respondants.svg";
// import mockdata from "../../../../mock_API/NPS/NPS Main Dashboard/NSSCard.json";

import CountUp from "react-countup";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import PuffLoader from "react-spinners/PuffLoader";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";
import { useRecoilState } from "recoil";

const NPSDetailCard = () => {
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    setApiData(nssApiData);
    console.log("nss data from api:");
    console.log(nssApiData);
  }, [nssApiData]);

  return (
    <div className="p-2 md:p-5 w-full    rounded-lg bg-white flex justify-center md:justify-center items-start relative ">
      {!apiData && (
        <div className="min-h-[240px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full ">
          <h1 className=" font-bold opacity-80 text-[18px] mb-7">
            Net Sentiment Score
          </h1>

          <div className="flex gap-5 items-center flex-col-reverse sm:flex-row">
            <div className="w-[80%] sm:w-[60%]">
              {/* Promoters */}
              <div>
                <div className="flex items-center px-3">
                  <div className="w-full text-[14px] opacity-80 font-medium">
                    Positive
                  </div>

                  <div className="mx-2 opacity-80 font-bold">
                    {apiData?.nss.total_positive}
                  </div>
                  <img src={RespondantsIcon} alt="number of promoters" />
                </div>
                <div>
                  {/* Fake graph */}
                  <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                    <div
                      className={` ml-auto rounded-full bg-[#00AC69] transition-all ease-in duration-500`}
                      style={{
                        width: apiData?.nss?.positive + "%",
                        minWidth: "15%",
                      }}
                    >
                      <div className="font-semibold  text-white ml-2">
                        {apiData?.nss.positive}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passives */}
              <div className="my-4">
                <div className="flex items-center px-3">
                  <div className="w-full text-[14px] opacity-80 font-medium">
                    Negative
                  </div>

                  <div className="mx-2 opacity-80 font-bold">
                    {apiData?.nss.total_negative}
                  </div>
                  <img src={RespondantsIcon} alt="number of promoters" />
                </div>
                <div>
                  {/* Fake graph */}
                  <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                    <div
                      className={`  ml-auto rounded-full bg-[#f6da09] transition-all ease-in duration-500`}
                      style={{
                        width: apiData?.nss?.negative + "%",
                        minWidth: "15%",
                      }}
                    >
                      <div className="font-semibold  text-white ml-2">
                        {apiData?.nss.negative}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detractors */}
              <div>
                <div className="flex items-center px-3">
                  <div className="w-full text-[14px] opacity-80 font-medium">
                    Extreme
                  </div>

                  <div className="mx-2 opacity-80 font-bold">
                    {apiData?.nss.total_extreme}
                  </div>
                  <img src={RespondantsIcon} alt="number of promoters" />
                </div>
                <div>
                  {/* Fake graph */}
                  <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                    <div
                      className={` ml-auto rounded-full bg-[#DB2B39] transition-all ease-in duration-500`}
                      style={{
                        width: apiData?.nss?.negative + "%",
                        minWidth: "15%",
                      }}
                    >
                      <div className="font-semibold  text-white ml-2">
                        {apiData?.nss.extreme}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-[40%]  ">
              {/* Pie graph */}
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[18px] opacity-40">NSS</h1>
                  <p className="opacity-80 text-[24px] font-semibold  ">
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss.nss_score}
                      separator=","
                      suffix="%"
                    />
                  </p>
                </div>
              </div>
              <div className=" w-[100%] md:min-w-[110px] ">
                <ResponsiveContainer height={180} width="100%">
                  <PieChart>
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Pie
                      data={apiData?.nss_pie}
                      dataKey="percentage"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      strokeWidth={5}
                      innerRadius="60%"
                      outerRadius="100%"
                      cornerRadius={6}
                      paddingAngle={-1}
                      startAngle={-270}
                      endAngle={-630}
                      minAngle={15}
                    >
                      {apiData?.nss_pie.map((entry, index) => (
                        <Cell key={Math.random()} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSDetailCard;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div
        key={Math.random()}
        className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-1 shadow-2xl shadow-[#000000] w-[120px] h-[50px] flex justify-center items-center z-[99]"
      >
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
