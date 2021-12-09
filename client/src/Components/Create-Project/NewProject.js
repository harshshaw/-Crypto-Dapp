import React from "react";
import Navbar from "../Navbar/Navbar";
import ProjectMetaData from "./ProjectMetaData";
import OrganizationData from "./OrganizationData";

export default function NewProject() {
  return (
    <div class="rounded-xl bg-white w-10/12 mx-40 my-10 height-adjuster">
      <Navbar />
      <div class="flex w-full mt-5 h-5/6 justify-around">
        <ProjectMetaData />
        <OrganizationData />
      </div>
    </div>
  );
}
