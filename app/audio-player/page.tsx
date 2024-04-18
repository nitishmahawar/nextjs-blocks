import React from "react";
import AudioPlayer from "./audio-player";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <AudioPlayer src="https://file-examples.com/storage/fef545ae0b661d470abe676/2017/11/file_example_MP3_5MG.mp3" />
    </div>
  );
};

export default Page;
