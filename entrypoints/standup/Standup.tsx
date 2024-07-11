import "./standup.css";

const movables = [
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe9e33e9e-8fa0-4f17-a409-9f0e1ddff1f1_498x373.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7fbcc007-a943-4bd9-882a-62c0e55a2c7c_498x253.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c675268-7f6a-463e-b3ff-cef2f1eccaec_498x373.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9059cd24-de66-4088-96ab-66fd4fae33db_640x360.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27d639f2-52c3-4e79-84da-309af13fa787_498x498.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9743136e-1844-4dfd-a7d2-265120a61754_498x373.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a3f5db6-ee8d-4980-82a4-48e17c4df166_480x480.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe6bcce2-df81-482c-b50a-f37b204dcbbb_498x498.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F987946aa-80cb-45a7-bb31-d7e05a53ea0f_364x200.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9254fdf8-bf46-4b66-b528-9e93bb87c709_498x390.gif",
  "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a4ca8de-2816-4f95-b5d8-a1b58bcc883d_498x498.gif",
] as string[];

const standup = [
  "harvest some potatoes",
  "for a walk",
  "do some pushups",
  "do some squats",
  "do some jumping jacks",
  "do some lunges",
  "do some burpees",
  "win a math contest",
  "film a youtube video",
  "build a house",
  "curate some movables",
];

export default function () {
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen gap-4 text-lg standup">
      <img src={movables[Math.floor(Math.random() * movables.length)]}></img>
      <p className="text-3xl">❌</p>
      <h1 className="text-2xl">Stand up bub</h1>
      <p>
        You've been sitting for too long (about{" "}
        {Math.floor(Math.random() * 59) + 1} minutes).
      </p>
      <p>
        Stand up and go {standup[Math.floor(Math.random() * standup.length)]} or
        something.
      </p>
      <button
        onClick={() => {
          close();
        }}
      >
        I'm standing up
      </button>
    </div>
  );
}
