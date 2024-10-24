// export default function Posts() {
//   return <div>Post</div>;
// }

import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function Posts() {
  return (
    <div className="relative w-full h-full mx-auto ">
      <div class="bg-gray-100 rounded-lg p-6 shadow-md  mx-auto">
        <h2 class="text-sm font-bold text-black">NEW POST</h2>
        <hr class="my-4 border-gray-400" />
        <p class="text-xl font-normal text-black">What’s on your mind?</p>
        <div class="flex justify-between mt-6">
          <input
            type="textarea"
            class="flex-1 p-2 mr-4 bg-gray-100"
            placeholder="Type your post..."
          />
          <button class="bg-black text-white py-2 px-10 rounded-lg">
            Post
          </button>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="absolute w-full  h-auto top-[347px] left-0 p-4">
        <div className="bg-gray-100 rounded-[15px] p-6">
          <h3 className="text-3xl font-bold text-[#181818]">Theresa Steward</h3>
          <p className="text-lg text-[#181818]">Mentor</p>
          <p className="text-base text-[#181818] leading-7 mt-4">
            What did the Dursleys care if Harry lost his place on the House
            Quidditch team because he hadn’t practiced all summer? What was it
            to the Dursleys if Harry went back to school without any of his
            homework done? The Dursleys were what wizards called Muggles (not a
            drop of magical blood in their veins).
          </p>

          <div className="flex justify-between mt-6">
            <div className="flex items-center">
              <span className="text-2xl text-[#181818]">15</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl text-[#181818]">9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
