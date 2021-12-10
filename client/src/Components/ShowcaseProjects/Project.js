import React from "react";

export default function Project({ data }) {
  return (
    <div class="flex flex-col w-3/12 mb-2 mx-14 max-h-80 border-2 border-indigo-600 overflow-y-auto">
      <img src={data.thumbnail} />
      <h3>{data.title}</h3>
      <p>{data.projectDescription}</p>
    </div>
  );
}
