import React from "react";
import CustomCalendar2 from "../Misc/CustomCalendar2";
import AlertComments from "./AlertComments";
import Clients from "./Clients";
import Clinics from "./Clinics";
import Comments from "./Comments";
import HealthProfessionals from "./HealthProfessionals";
import NPSCard from "./NPSCard";
import NPSOverTime from "./NPSOverTime";
import NPSvsSentiment from "./NPSVsSentiment";
import NSSCard from "./NSSCard";
import NSSOverTime from "./NSSOverTime";
import TotalCard from "./TotalCard";

const NPSOverall = () => {
  return (
    <div>
      <section className="mt-[16px] flex justify-between items-center gap-3 md:gap-5  flex-col xs:flex-row sm:flex-col  xl:flex-row">
        <div className="flex items-center  flex-col sm:flex-row gap-3 md:gap-5 sm:w-full xl:w-[66%]">
          <NPSCard />
          <NSSCard />
        </div>
        <TotalCard />
      </section>
      <section className="my-[30px]  flex flex-col md:flex-row justify-center gap-[18px]">
        <Comments />
        <AlertComments />
      </section>
      <section className="my-[30px]  flex flex-col xl:flex-row justify-center gap-[18px]">
        <NPSOverTime />
        <NSSOverTime />
      </section>

      <section className="my-[30px]  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[18px]">
        <NPSvsSentiment />
        <HealthProfessionals />
        <Clinics />
        <Clients />
      </section>
    </div>
  );
};

export default NPSOverall;
