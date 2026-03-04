import React from "react";
// import Navbar from "@/components/Navbar";

const CopyrightNotice = () => {
  return (
    <div className="min-h-screen bg-[#00163d] text-white">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-pp-neuebit text-center lg:text-left">
              Send Arcade Copyright Notice
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-pp-neuebit text-center lg:text-left">
              Last Updated: 4 July 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 font-pp-neuebit">
            {/* Copyright Statement */}
            <div className="space-y-4">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-bold">
                © 2025 Send Arcade Studios Pte. Ltd. All rights reserved.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                All content, branding, visual design elements, game mechanics,
                audio, code, trademarks, logos, and other intellectual property
                contained within the Send Arcade platform, website, and
                associated materials are the exclusive property of Send Arcade
                Studios Pte. Ltd. and are protected under Singaporean copyright
                law and international intellectual property conventions.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                No part of the Send Arcade Services may be copied, modified,
                reproduced, republished, uploaded, posted, transmitted, or
                distributed in any form or by any means, without the prior
                written consent of Send Arcade Studios Pte. Ltd.
              </p>
            </div>

            {/* Use Restrictions */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                Use Restrictions
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Unauthorized use of the Service&apos;s content, including
                redistribution or commercial use, is prohibited. All rights are
                reserved.
              </p>
            </div>

            {/* Third Party Content */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                Third Party Content
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                This platform may incorporate third-party assets, SDKs, or
                licensed content used under appropriate permissions. Ownership
                of such materials remains with their respective rights holders.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                Contact Information
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                For licensing inquiries, media requests, or copyright concerns,
                contact us at:{" "}
                <a
                  href="mailto:semi@sendarcade.fun"
                  className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  semi@sendarcade.fun
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CopyrightNotice;
