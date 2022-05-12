import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import PositiveIcon from "../../../../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../../../../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";
// import MockApiNSSData from "../../../../mock_API/NPS/NPS Main Dashboard/NSSCard.json";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";

const NSSCard = () => {
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    setApiData(nssApiData);
  }, [nssApiData]);

  return (
    <div className="p-2 md:p-5 w-full   rounded-lg bg-white ">
      {!apiData && (
        <div className="min-h-[130px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <h1 className=" font-bold opacity-80">Sentiments</h1>
          <div className="flex justify-start gap-3 md:gap-5 sm:justify-between ">
            <div className="flex justify-start items-center gap-3 md:gap-5">
              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={PositiveIcon} alt="positive" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nss.positive < 1 ? (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss.positive}
                      separator=","
                      suffix="%"
                      decimals={2}
                    />
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss.positive}
                      separator=","
                      suffix="%"
                      decimals={0}
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Positives</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={NegativeIcon} alt="passives" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nss.negative < 1 ? (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss.negative}
                      separator=","
                      suffix="%"
                      decimals={2}
                    />
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss.negative}
                      separator=","
                      suffix="%"
                      decimals={0}
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Negatives</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={ExtremeIcon} alt="extremes" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nss.extreme < 1 ? (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss.extreme}
                      separator=","
                      suffix="%"
                      decimals={2}
                    />
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss.extreme}
                      separator=","
                      suffix="%"
                      decimals={0}
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Extremes</p>
              </div>
            </div>

            {/* Graph */}
            <div className="relative">
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[12px] opacity-40">NSS</h1>
                  <p className="opacity-80 text-xs md:text-base">
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
              <div className=" w-[80px] md:w-[110px] ">
                <ResponsiveContainer height={110} width="100%">
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

export default NSSCard;

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
