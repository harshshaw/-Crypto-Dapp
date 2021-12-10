import React from "react";
import ProjectsSeedData from "./ProjectsSeedData";
import Project from "./Project";
import Navbar from "../Navbar/Navbar";

export default function ProjectsDashboard() {
  return (
    <div class="rounded-xl bg-white w-10/12 mx-40 my-10 height-adjuster">
      <Navbar />
      <div class="flex max-w-full h-5/6 mx-7 mt-2 flex-wrap overflow-y-auto">
        {ProjectsSeedData.map((project) => {
          return <Project data={project} />;
        })}
      </div>
    </div>
  );
}
