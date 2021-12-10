import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faBuilding,
  faBlog,
  faDonate,
} from "@fortawesome/free-solid-svg-icons";

export default function Project({ data }) {
  console.log(data);
  return (
    <div class="flex flex-col w-3/12 mb-4 mx-14 max-h-96 overflow-y-auto">
      <img src={data.thumbnail} class="h-52" />
      <h2 class="text-center text-xl">{data.title.toUpperCase()}</h2>
      <p class="text-right mr-16 text-gray-400">~ {data.orgName}</p>
      <p class="p-2 text-gray-500">{data.projectDescription}</p>
      <div class="flex justify-around px-4 py-2 text-xl">
        <a href={data.links.projectLink}>
          <FontAwesomeIcon color="purple" icon={faProjectDiagram} />
        </a>
        <a href={data.links.organizationLink}>
          <FontAwesomeIcon color="blue" icon={faBuilding} />
        </a>
        <a href={data.links.blogLink}>
          <FontAwesomeIcon color="green" icon={faBlog} />
        </a>
      </div>
      <div class="flex justify-around mt-3">
        <div class="flex flex-col">
          <label class="text-lg text-gray-800">Goal (in CB)</label>
          <div class="rounded text-xl bg-green-900 text-white p-2">92722</div>
        </div>
        <div class="flex flex-col">
          <label class="text-lg text-gray-800">Completed (in CB)</label>
          <div class="rounded w-3/6 text-xl bg-indigo-800 text-white p-2">
            924
          </div>
        </div>
      </div>
      <button class="rounded-lg w-6/12 ml-16 bg-red-700 p-3 my-5 flex items-center justify-around">
        <div class="text-lg">
          <FontAwesomeIcon color="white" icon={faDonate} />
        </div>
        <div class="text-white text-xl">Donate</div>
      </button>
    </div>
  );
}
