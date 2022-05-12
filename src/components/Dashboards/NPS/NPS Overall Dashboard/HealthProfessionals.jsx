import React from "react";
import doctorIcon from "../../../../assets/img/NPS Dashboard/DoctorIcon.svg";
import docData from "../../../../mock_API/NPS/NPS Main Dashboard/HealthProfessional.json";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const HealthProfessionals = () => {
  return (
    <div className="p-5 rounded-lg bg-white transition-all w-[100%]  h-[300px]">
      <h1 className="  font-bold  opacity-80">
        Providers
        <span className="text-[12px] opacity-70 ml-5">(ILLUSTRATIVE)</span>
      </h1>
      <div className="text-xs text-gray-400 border-b-2 border-b-gray-100 flex justify-end px-2 pb-2">
        Rating
      </div>
      <div className=" h-[75%] overflow-y-scroll scrollbar-hide   ">
        <div className="">
          {docData.map((data) => {
            return (
              <div
                key={data.id}
                className="flex justify-between items-center my-4"
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={doctorIcon}
                    alt={data.doc_name}
                    className="w-[40px] rounded-full"
                  />
                  <div>
                    <div className="text-sm">{data.doc_name}</div>
                    <div className="text-gray-500 text-xs">
                      {data.designation}
                    </div>
                  </div>
                </div>

                <div className="text-sm">
                  <StarRoundedIcon
                    fontSize="small"
                    className="mr-1 text-[#F6CB09]"
                  />
                  <span className="text-gray-500 text-xs">{data.rating}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HealthProfessionals;
