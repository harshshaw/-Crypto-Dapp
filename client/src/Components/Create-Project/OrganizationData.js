import React from "react";

export default function OrganizationData() {
  return (
    <div class="flex flex-col height-adjuster w-5/12">
      <div class="flex flex-col w-full my-6">
        <div class="flex">
          <label class="mb-1 text-xl text-gray-700">Organization Name </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <input
          class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          id="inline-full-name"
          type="text"
          placeholder="Ex: All India United Kisan Sabha"
        />
      </div>
      <div class="flex flex-col w-full my-2">
        <div class="flex">
          <label class="mb-1 text-xl text-gray-700">Project Description</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <textarea
          class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="w3review"
          rows="8"
          cols="50"
          placeholder="Describe the project in less than 250 words"
        ></textarea>
      </div>
      <div class="flex mt-2">
        <div class="flex flex-col w-full my-3">
          <div class="flex">
            <label class="mb-1 text-xl text-gray-700">Account address </label>
          </div>
          <input
            class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="1snfjnnjdJSHKJbscBHNCeobR76b"
          />
        </div>
        <div class="flex flex-col w-full my-3">
          <div class="flex">
            <label class="mb-1 text-xl text-gray-700">
              Project Goal <span class="text-gray-400">(1 ETH - 20 CB)</span>{" "}
            </label>
          </div>
          <input
            class="mt-4 bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
            id="inline-full-name"
            type="number"
            placeholder="6204"
          />
        </div>
      </div>
      <div class="flex justify-center mt-2">
        <button class="text-center w-5/12 px-4 py-2 text-white bg-blue-500 hover:bg-green-700 transition duration-500 ease-in-out">
          Create a project
        </button>
      </div>
    </div>
  );
}
