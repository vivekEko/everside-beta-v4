import React, { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import uploadIcon from "../../../assets/img/global-img/uploadIcon.svg";
import { PuffLoader } from "react-spinners";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";

const UploadWrapper = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  const [graphData, setGraphData] = useState();
  const [percentageData, setPercentageData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch(baseAPI + "egPercentileMember", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        if (result.Message === "TRUE") {
          setLoaderStatus(false);
          setGraphData(result?.graph);
          setPercentageData(result?.percentage);
        }
        if (result.Message === "FALSE") {
          setLoaderStatus(false);
          alert("Invalid file");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(baseAPI + "egStatistics", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Total Cards Data:", result);
        setRows(result.rows);
        setColumns(result.columns);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // console.log("selected file: ");
    // console.log(selectedFile);
    // console.log(isFilePicked);
    if (selectedFile) {
      handleSubmission();
      setLoaderStatus(true);
    }
  }, [selectedFile]);

  return (
    <div>
      {graphData && (
        <div>
          {/* Total cards */}
          <div className="flex justify-center items-center gap-10">
            <div className="p-2 text-center bg-white rounded-lg w-[150px]">
              <h3 className="opacity-60 mb-2 text-xs">Rows</h3>
              <h1 className="opacity-80 text-3xl">{rows}</h1>
            </div>

            <div className="p-2 text-center bg-white rounded-lg w-[150px]">
              <h3 className="opacity-60 mb-2 text-xs">Columns</h3>
              <h1 className="opacity-80 text-3xl">{columns}</h1>
            </div>
          </div>

          {/* Graph */}

          <div className="p-2 md:p-5 w-full mt-5  rounded-lg bg-white flex justify-center md:justify-center items-center ">
            <div className="w-full">
              <h1 className=" font-bold opacity-80 ">Member Percentile</h1>
              <div className="text-center text-[10px] opacity-80 flex w-full justify-end gap-5 mt-[30px] mb-[10px]">
                <div className="flex justify-end items-center gap-[4px] ">
                  <div className="bg-red-500 h-[10px] w-[10px] rounded-full"></div>
                  <p>Low</p>
                </div>
                <div className="flex justify-end items-center gap-[4px] ">
                  <div className="bg-yellow-500 h-[10px] w-[10px] rounded-full"></div>
                  <p>Medium</p>
                </div>
                <div className="flex justify-end items-center gap-[4px] ">
                  <div className="bg-green-500 h-[10px] w-[10px] rounded-full"></div>
                  <p>High</p>
                </div>
              </div>

              {/* Graph */}
              <div className="relative ">
                {/* <div className=" absolute h-full w-full z-[999] bg-opacity-10 pl-[3%] pr-[1.5%] grid grid-cols-3">
            <div className="bg-red-500 opacity-10 h-full w-[100%]  mx-auto"></div>
            <div className="bg-yellow-500 opacity-10 h-full w-[100%]  mx-auto"></div>
            <div className="bg-green-500 opacity-10 h-full w-[100%]  mx-auto"></div>
          </div> */}

                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart
                    data={graphData}
                    margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="npsGradient"
                        gradientTransform="rotate(0)"
                      >
                        <stop
                          offset={percentageData?.low}
                          stopColor="red"
                          stopOpacity={1}
                        />
                        <stop
                          offset={percentageData?.medium}
                          stopColor="yellow"
                          stopOpacity={1}
                        />
                        <stop
                          offset={percentageData?.high}
                          stopColor="green"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      horizontal={false}
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="percentile_name"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      tickCount={6}
                      angle={0}
                      textAnchor="middle"
                      xAxisId="1"
                    />
                    <XAxis
                      dataKey="percentile_value"
                      xAxisId="0"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      tickCount={6}
                      angle={0}
                      textAnchor="middle"
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      fontSize={12}
                      tickCount={4}
                      //   tickFormatter={(number) => `${number}%`}
                      margin={{ right: 20 }}
                    />
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      name="member_score"
                      dataKey="member_score"
                      stroke="transparent "
                      dot={false}
                      fill="url(#npsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="w-[100%] px-5 p-3 py-5  rounded-lg bg-white mb-5">
          <h1 className=" text-left font-bold  text-lg mb-5  opacity-80 text-[#000C08]">
            Upload File
          </h1>
          <form>
            <div className="border-[2px] border-dashed border-[#00ac69]  rounded-2xl  w-full flex justify-center items-center h-[250px] relative">
              {loaderStatus ? (
                <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
                  <PuffLoader color="#00ac69" size={50} width={100} />
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept={".csv"}
                    className="absolute top-0 bottom-0 left-0 right-0 w-full opacity-0"
                  />
                  <img
                    src={uploadIcon}
                    alt="upload"
                    className="w-[80px] mx-auto text-center"
                  />
                  <p className="opacity-40">Click to upload your files here </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadWrapper;

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
            <span className="text-[10px]">{data.value} </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
