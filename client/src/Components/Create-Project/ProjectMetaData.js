import React from "react";

export default function ProjectMetaData() {
  return (
    <div class="flex flex-col height-adjuster w-5/12">
      <div class="flex flex-col w-full my-6">
        <div class="flex">
          <label class="mb-2 text-xl text-gray-700">Project Title </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <input
          class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          id="inline-full-name"
          type="text"
          placeholder="Ex: Assistance to the Farmer"
        />
      </div>
      <div class="flex flex-col w-full my-2">
        <div class="flex ">
          <label class="mb-2 text-xl text-gray-700">Add Links </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <input
          class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          id="inline-full-name"
          type="text"
          placeholder="Project Link"
        />
        <input
          class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          id="inline-full-name"
          type="text"
          placeholder="Organization Link"
        />
        <input
          class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          id="inline-full-name"
          type="text"
          placeholder="Blog Link"
        />
      </div>
      <div class="flex flex-col w-full mt-9">
        <label class="mb-2 text-xl text-gray-700">Project thumbnail</label>
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
            <div class="flex flex-col items-center justify-center pt-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                Attach a file
              </p>
            </div>
            <input type="file" class="opacity-0" />
          </label>
        </div>
      </div>
      <div class="flex justify-center p-2 mt-2">
        <button class="w-3/12 px-4 py-2 text-white bg-red-500 inline-flex hover:bg-red-700 transition duration-500 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span class="ml-4">Remove</span>
        </button>

        <button class="w-3/12 px-4 py-2 text-white bg-green-500 inline-flex hover:bg-green-700 transition duration-500 ease-in-out">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>{" "}
          <span class="ml-4">Upload</span>
        </button>
      </div>
    </div>
  );
}
