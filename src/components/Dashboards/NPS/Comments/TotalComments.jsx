import React, { useEffect, useState } from "react";
// import TopCommentsQ1Data from "../../../../mock_API/NPS/NPS Main Dashboard/Comments.json";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
import totalCommentsApiData from "../../../../recoil/atoms/totalCommentsApiData";

const TotalComments = () => {
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
              ... Read more
            </span>
          </span>
        )}
        {string?.length < n && <span>{string}</span>}
      </span>
    );
  }

  const [apiData, setApiData] = useState();

  const [allCommentsAPIData, setAllCommentsAPIData] =
    useRecoilState(totalCommentsApiData);

  useEffect(() => {
    setApiData(allCommentsAPIData?.data);
    console.log("all comments data:");
    console.log(allCommentsAPIData);
  }, [allCommentsAPIData]);

  // console.log("This is API Data: " + apiData);

  return (
    <div className="w-[100%] lg:w-[55%] p-2 h-[500px] rounded-lg bg-white mb-5">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <div className=" pt-2  flex justify-between items-end mb-2">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80 text-[#000C08]">
              All Comments
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
              {/* <SearchIcon
                fontSize="small"
                className="cursor-pointer text-gray-400"
              /> */}
              <img
                src={SearchIcons}
                alt="searchIcon"
                className="px-2 cursor-pointer"
                onClick={() => setSearchStatus(!searchStatus)}
              />
            </div>
          </div>
          <div className=" h-[420px] overflow-y-scroll overflow-x-scroll scrollbar-hide ">
            <table className="border-b-gray-100 border-b-2 text-[12px] p-3 pb-0 w-full min-w-[400px] ">
              <thead className="border-b-gray-100 border-b-2 sticky bg-white top-0">
                <tr className=" flex justify-between items-center gap-3 text-center px-2 text-[10px] text-gray-500 uppercase p-2 font-normal">
                  <th className=" w-[5%]  min-w-[30px]">
                    <div className=" rounded-md  flex justify-start text-gray-400 capitalize font-medium">
                      S.No
                    </div>
                  </th>
                  <th className=" text-gray-400 w-[40%] capitalize text-left font-normal">
                    Comments
                  </th>
                  <th className=" text-gray-400 w-[10%] capitalize  font-normal ">
                    Date
                  </th>
                  <th className=" text-gray-400 w-[15%]  capitalize font-normal">
                    Reason
                  </th>
                  <th className=" text-gray-400 w-[15%]  capitalize font-normal">
                    Visit Type
                  </th>

                  <th className="font-normal w-[15%]  text-gray-400 capitalize ">
                    Sentiment
                  </th>
                </tr>
              </thead>

              {apiData
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
                .map((data, index) => {
                  return (
                    <tbody key={data.id} className="w-full ">
                      <tr className=" py-2 px-2 flex justify-around items-center gap-3 border-b-2 border-b-gray-100 w-full">
                        <td className=" text-gray-400 w-[5%]  min-w-[30px] text-[14px]">
                          {index + 1}
                        </td>
                        <td className=" w-[40%] ">
                          <div
                            className="max-w-[100%] text-[#000c08b3] font-semibold"
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
                        <td className=" text-gray-400 w-[10%] text-center  font-semibold  text-[10px] ">
                          May , 2020
                        </td>

                        <td className=" text-gray-400 w-[15%] text-center font-semibold  text-[10px]">
                          Annual Checkup
                        </td>
                        <td className=" text-gray-400 w-[15%]  text-center font-semibold text-[10px]">
                          Office
                        </td>

                        {data.label == "Positive" && (
                          <td className=" bg-[#00AC69] bg-opacity-[16%] text-[#00AC69] font-medium py-2 w-[15%]  rounded-full  min-w-[60px] text-center">
                            {data.label}
                          </td>
                        )}

                        {data.label == "Negative" && (
                          <td className=" bg-[#D8BF05] bg-opacity-[16%] text-[#c7b005] py-2 w-[15%]  font-medium rounded-full  min-w-[60px] text-center">
                            {data.label}
                          </td>
                        )}

                        {data.label == "Neutral" && (
                          <td className=" bg-gray-100 py-2 w-[15%]  text-gray-700 rounded-full  min-w-[60px] font-medium text-center">
                            {data.label}
                          </td>
                        )}

                        {data.label == "Extreme" && (
                          <td className=" bg-red-100 py-2 w-[15%] text-center  text-red-700 rounded-full  min-w-[60px] ">
                            {data.label}
                          </td>
                        )}

                        {/* <td className=" bg-green-100 p-2 text-green-700 rounded-md">
{data.label}
</td> */}
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

export default TotalComments;
