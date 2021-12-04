import React from "react";
import Logo from "../../Agri.svg";

export default function Navbar() {
  return (
    <div class="relative bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex justify-between items-center border-b-2 border-gray-200 py-9 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <img class="h-10 w-auto sm:h-10" src={Logo} alt="" />
            </a>
          </div>

          <nav class="md:flex space-x-12">
            <div class="flex space-x-1">
              <a
                href="#"
                class="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Show Projects
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div class="flex space-x-1">
              <a
                href="#"
                class="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Create a project
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </nav>
          <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="#"
              class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              1BoatSLRHtKNngkdXEeobR76b53LETtpyT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
