"use client";
import KooperParticles from "@/components/particles";
import Image from "next/image";
import React from "react";
const videos = [
  <Image
    className="z-10 absolute bottom-0 right-0 w-1/3 object-cover"
    draggable={false}
    priority
    style={{ maxHeight: "75%" }}
    width={1920}
    height={1080}
    src="/videos/contact_1.gif"
    alt="Contact Video"
  />,
  <Image
    className="z-10 absolute bottom-0 right-0 w-1/4 object-cover"
    draggable={false}
    priority
    style={{ maxHeight: "75%" }}
    width={1920}
    height={1080}
    src="/videos/contact_2.gif"
    alt="Contact Video"
  />,
];

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        className="top-0 left-0 absolute object-cover w-screen h-screen"
        priority
        draggable={false}
        src="/images/banner.svg"
        fill
        alt={"Banner Image"}
      />
      {videos[Math.floor(Math.random() * videos.length)]}

      <KooperParticles />
      <div className="container z-10 items-center justify-center flex h-screen">
        <form className="bg-white p-5 rounded w-fit">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-black"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-black"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium text-black"
            >
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button className="hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
