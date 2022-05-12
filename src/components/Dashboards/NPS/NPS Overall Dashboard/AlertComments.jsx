import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import extremeCommentsData from "../../../../mock_API/NPS/NPS Main Dashboard/AlertsComments.json";
import { useRecoilState } from "recoil";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
import ErrorIcon from "../../../../assets/img/global-img/Error.svg";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import alertCommentsApiData from "../../../../recoil/atoms/alertCommentsApiData";

const AlertComments = () => {
  const [inputData, setInputData] = useState("");
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  //   truncating description if it contains more then desired no. of characters
  function truncate(string, n) {
    return (
      <span>
        {string?.length > n && (
          <span>
            {string.substr(0, n - 1)}{" "}
            <span className="text-[10px] text-gray-500 cursor-pointer">
              {" "}
              ... read more
            </span>
          </span>
        )}
        {string?.length < n && <span>{string}</span>}
      </span>
    );
  }

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  // useEffect(() => {
  //   const requestURL =
  //     baseAPI +
  //     "alertComments?" +
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

  //   // console.log(requestURL);

  //   if (sendDataStatus === true) {
  //     // console.log("Requested URL: " + requestURL);
  //     axios.get(requestURL).then((res) => {
  //       // console.log(res);
  //       // console.log(res?.data);
  //       setApiData(res?.data.data);
  //     });
  //   } else if (sendDataStatus === false) {
  //     axios
  //       .get(
  //         baseAPI +
  //           "alertComments?start_month=1&start_year=2021&end_month=12&end_year=2021"
  //       )
  //       .then((res) => {
  //         setApiData(res?.data.data);
  //         // console.log("This is else if data" + res?.data);
  //         // console.log(apiData);
  //       });
  //   }
  // }, [sendDataStatus]);

  const [alertCommentsAPIData, setAlertCommentsAPIData] =
    useRecoilState(alertCommentsApiData);

  useEffect(() => {
    setApiData(alertCommentsAPIData);

    // console.log("atom data top component");
    // console.log(alertCommentsAPIData);
  }, [alertCommentsAPIData]);

  return (
    <div className=" w-[100%] md:w-[40%] p-2 h-[400px] rounded-lg bg-white  ">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <div className=" pt-2  flex justify-between items-center pb-4 border-b-2 border-b-gray-100">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80">
              Alerts
            </h1>
            <div className=" rounded-md  flex justify-end items-center ">
              <input
                type="text"
                placeholder="Search.."
                className={` outline-none  transition-all pl-2 text-xs  pb-1 w-[100px] ${
                  searchStatus
                    ? "xl:w-[100%] ease-in  xl:border-b-[1px]"
                    : "xl:w-[0%] ease-out "
                }`}
                onChange={handleInput}
                value={inputData}
              />

              <img
                src={SearchIcons}
                alt="searchIcon"
                className="px-2 cursor-pointer"
                onClick={() => setSearchStatus(!searchStatus)}
              />
            </div>
          </div>
          <div className=" h-[340px] overflow-y-scroll scrollbar-hide ">
            <table className=" text-[12px] p-3 pb-0 w-full ">
              {apiData?.data
                ?.filter((filtered_value) => {
                  if (inputData === "") {
                    return filtered_value;
                  } else if (
                    filtered_value?.review
                      ?.toLowerCase()
                      ?.includes(inputData.toLowerCase())
                  ) {
                    return filtered_value;
                  }
                })
                .map((data) => {
                  return (
                    <tbody key={data.id} className="w-full ">
                      <tr className=" py-2 px-2 flex justify-around items-center gap-3  w-full">
                        <td className=" text-gray-400 text-[12px] ">
                          {data.id}
                        </td>
                        <td className=" w-full ">
                          <div
                            className="max-w-[100%] text-[#000c08b3] text-[12px]"
                            onClick={() => {
                              setExpandComment(data.id);
                              setClickCount(!clickCount);
                            }}
                          >
                            {expandComment == data.id && clickCount
                              ? data.review
                              : truncate(data.review, 100)}
                          </div>
                        </td>

                        {/* <td className=" bg-red-100 py-2 text-red-700 rounded-md  min-w-[60px] text-center">
                          {data?.label}
                        </td> */}
                        <td>
                          <img src={ErrorIcon} alt="error" />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertComments;
