import React, { useEffect, useState } from "react";

import clinicIcon from "../../../../assets/img/NPS Dashboard/ClinicIcon.svg";
import clinicData from "../../../../mock_API/NPS/NPS Main Dashboard/Clinics.json";
// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import FirstMedal from "../../../../assets/img/global-img/firstMedal.svg";
import SecondMedal from "../../../../assets/img/global-img/SecondMedal.svg";
import ThirdMedal from "../../../../assets/img/global-img/thirdMedal.svg";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";

const Clinics = () => {
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [clinicsAPIData, setClinicsAPIData] = useRecoilState(clinicsApiData);

  // useEffect(() => {
  //   const requestURL =
  //     baseAPI +
  //     "clinics_data?" +
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
  //           "clinics_data?start_month=1&start_year=2021&end_month=12&end_year=2021"
  //       )
  //       .then((res) => {
  //         setApiData(res?.data);
  //         // console.log("This is else if data" + res?.data);
  //       });
  //   }
  // }, [sendDataStatus]);

  //   truncating description if it contains more then desired no. of characters
  //   truncating description if it contains more then desired no. of characters

  useEffect(() => {
    setApiData(clinicsAPIData);
    // console.log("atom data nss component");
    // console.log(clinicsAPIData);
  }, [clinicsAPIData]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ". . ." : string;
  }

  return (
    <div className="p-5 rounded-lg bg-white transition-all  w-[100%] h-[300px] ">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center ">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="max-h-[300px] ">
          <h1 className="  font-bold  opacity-80">Health Centers</h1>
          <div className=" text-xs text-gray-400 border-b-2 border-b-gray-100 flex justify-end px-2 pb-2">
            <span className="invisible">Rank</span>
          </div>
          <div className=" h-[85%] overflow-y-scroll scrollbar-hide  max-h-[220px]">
            <div className="">
              {apiData?.data?.map((data, index) => {
                // console.log(index);
                return (
                  <div
                    key={Math.random()}
                    className="flex justify-between items-center my-4"
                  >
                    <div className="flex gap-5 items-center">
                      <img
                        src={clinicIcon}
                        alt={data.clinic}
                        className="w-[40px] rounded-full"
                      />

                      <div>
                        <div className="text-sm">
                          {truncate(data?.clinic, 23)}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {data?.city}, {data?.state}
                        </div>
                      </div>
                    </div>

                    {index + 1 > 3 && (
                      <div className="text-sm text-gray-500 justify-center items-center flex w-[40px] ">
                        {index + 1}
                      </div>
                    )}

                    {index + 1 <= 3 && (
                      <div>
                        {index + 1 == 1 && (
                          <img
                            src={FirstMedal}
                            alt="First Medal"
                            className="text-sm text-gray-500 justify-center items-center flex w-[40px] "
                          />
                        )}
                        {index + 1 == 2 && (
                          <img
                            src={SecondMedal}
                            alt="Second Medal"
                            className="text-sm text-gray-500 justify-center items-center flex w-[40px] "
                          />
                        )}
                        {index + 1 == 3 && (
                          <img
                            src={ThirdMedal}
                            alt="Third Medal"
                            className="text-sm text-gray-500 justify-center items-center flex w-[40px] "
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinics;
