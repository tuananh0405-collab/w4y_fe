import React from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import StepperNavigation from "../components/cv/StepperNavigation";
import UploadCVSection from "../components/cv/UploadCVSection";
import CreateNewCVSection from "../components/cv/CreateNewCVSection";
import CVTemplateSelection from "../components/cv/CVTemplateSection";
import PreviewSection from "../components/cv/PreviewSection";
import { cvLookUpIcon } from "../assets";

const UpCV = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-200">
      <Header />
      <div className="flex flex-row justify-start items-center mx-20">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">
          Tải lên CV của bạn
        </h1>
        <img src={cvLookUpIcon} alt="cv lookup icon" />
      </div>
      <div className="flex flex-col mx-20 bg-white my-5 rounded-lg">
        <StepperNavigation currentStep={1} />
        <UploadCVSection />
        <CreateNewCVSection />
        <CVTemplateSelection />
        <PreviewSection />
      </div>
      <Footer />
    </div>
  );
};

export default UpCV;
