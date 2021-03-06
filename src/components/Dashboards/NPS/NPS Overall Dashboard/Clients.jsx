import React from "react";
import ClientIcon from "../../../../assets/img/NPS Dashboard/ClientIcon.svg";
import clientData from "../../../../mock_API/NPS/NPS Main Dashboard/Clients.json";

// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Clients = () => {
  return (
    <div className="p-5 rounded-lg bg-white transition-all  w-[100%] h-[300px]">
      <h1 className="  font-bold opacity-80 ">
        Clients
        <span className="text-[12px] opacity-70 ml-5">(ILLUSTRATIVE)</span>
      </h1>
      <div className="text-xs text-gray-400 border-b-2  border-b-gray-100 flex justify-end px-2 pb-2">
        <span className="invisible">Rank</span>
      </div>
      <div className=" h-[85%] overflow-y-scroll scrollbar-hide">
        <div className="">
          {clientData.map((data) => {
            return (
              <div
                key={data.id}
                className="flex justify-between items-center my-4"
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={ClientIcon}
                    alt={data.client_name}
                    className="w-[40px] rounded-full"
                  />
                  <div>
                    <div className="text-sm">{data.client_name}</div>
                    <div className="text-gray-500 text-xs">
                      {data.designation}
                    </div>
                  </div>
                </div>

                {/* <div className="text-sm flex justify-center items-center  min-w-[40px]">
                  {data.rank === 1 ? (
                    <MilitaryTechIcon
                      fontSize="large"
                      className="text-amber-500"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">{data.rank}</span>
                  )}
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Clients;
