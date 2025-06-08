import React from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import StepperNavigation from "../components/cv/StepperNavigation";
import UploadCVSection from "../components/cv/UploadCVSection";
import CreateNewCVSection from "../components/cv/CreateNewCVSection";
import CVTemplateSelection from "../components/cv/CVTemplateSection";
import CVUploadedList from "../components/cv/CVUploadedList";
import PreviewSection from "../components/cv/PreviewSection";
import { cvLookUpIcon } from "../assets";
import theme from "../utils/theme";

const UpCV = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <div className="flex flex-row justify-start items-center mx-5 sm:mx-10 md:mx-20">
        <h1 className="text-4xl font-bold mb-8 text-teal-700 mt-5">
          Tải lên CV của bạn
        </h1>
      </div>
      <div className="flex flex-col mx-5 sm:mx-10 md:mx-20 bg-white my-5 rounded-lg">
        {/* <StepperNavigation currentStep={1} /> */}
        <UploadCVSection />
        <CVUploadedList />
        <CreateNewCVSection />
        <CVTemplateSelection />
        {/* <PreviewSection /> */}
      </div>
      <Footer />
    </div>
  );
};


export default UpCV;
