import React, { useEffect, useState } from "react";
import mockdata from "../../../../mock_API/NPS/NSS/nssTotalCards.json";
import CountUp from "react-countup";
import { useRecoilState } from "recoil";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import axios from "axios";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import { PuffLoader } from "react-spinners";

const CommentsTotalcards = () => {
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);

  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  useEffect(() => {
    const requestURL =
      baseAPI +
      "netSentimentScore?" +
      "start_year=" +
      finalStartDate +
      "&" +
      "start_month=" +
      finalStartMonth +
      "&" +
      "end_year=" +
      finalEndDate +
      "&" +
      "end_month=" +
      finalEndMonth;

    if (sendDataStatus === true) {
      // console.log("Requested URL: " + requestURL);
      axios.get(requestURL).then((res) => {
        // console.log(res);
        // console.log(res?.data);
        setApiData(res?.data);
      });
    } else if (sendDataStatus === false) {
      axios
        .get(
          baseAPI +
            "netSentimentScore?start_month=1&start_year=2021&end_month=12&end_year=2021"
        )
        .then((res) => {
          setApiData(res?.data);
          // console.log("This is else if data" + res?.data);
        });
    }
  }, [sendDataStatus]);

  return (
    <div className="">
      {!apiData && (
        <div className="min-h-[170px] w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5  justify-items-center items-center ">
          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md min-h-[50px] min-w-[90px]  text-center flex justify-center items-center">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Positives
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80 ">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.nss?.total_positive}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md min-h-[50px] min-w-[90px]  text-center flex justify-center items-center">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Negatives
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80 ">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.nss?.total_negative}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md min-h-[50px] min-w-[90px]  text-center flex justify-center items-center">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Extremes
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80 ">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.nss?.total_extreme}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md min-h-[50px] min-w-[90px]  text-center flex justify-center items-center">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Total
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80 ">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.nss?.total}
                  separator=","
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsTotalcards;
