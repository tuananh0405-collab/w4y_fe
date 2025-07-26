import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useUploadCVMutation } from "../../redux/api/applicantApiSlice"; // Đảm bảo bạn đã import hook
import { fileIcon } from "../../assets";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadCVSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadCV, { isLoading, error }] = useUploadCVMutation(); // Hook để upload CV

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload PDF, DOC, or DOCX files only.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
  
    // Tạo FormData để gửi file lên server
    const formData = new FormData();
    formData.append('resumeFile', file);
  
    try {
      // Gửi FormData lên API với async/await
      const response = await uploadCV(formData).unwrap();
      
      if (response?.success) {
        toast.success("File uploaded successfully");
      } else {
        toast.error("Error uploading CV");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading CV");
    }
  };
  
  

  return (
    <div
      className={`flex flex-col items-center w-full max-w-[922px] min-h-[422px] p-5 border border-black rounded-lg mx-auto bg-white ${isDragging ? 'bg-gray-100 border-dashed border-2 border-orange-500' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img src={fileIcon} alt="File icon" className="w-32 h-32 mt-5" />
      <h1 className="font-inter font-bold text-3xl text-black mt-5 text-center">Tải lên CV của bạn</h1>
      <p className="font-inter font-medium text-xl text-black text-opacity-85 text-center mt-4">
        Kéo và thả tệp CV của bạn vào đây hoặc nhấp vào nút bên dưới để chọn tệp
      </p>

      <Button
        variant="contained"
        color="success"
        className="mt-5"
        component="label"
      >
        Chọn tệp CV
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInput}
          hidden
        />
      </Button>

      {file && (
        <p className="font-inter font-medium text-lg text-black text-opacity-85 text-center mt-4">
          Tệp đã chọn: {file.name}
        </p>
      )}

      <p className="font-inter font-medium text-lg text-black text-opacity-85 text-center mt-4">
        Hỗ trợ định dạng: PDF, DOCX, DOC (Tối đa 5MB)
      </p>

      {isLoading ? (
        <div className="mt-4">Đang tải lên...</div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          className="mt-5"
        >
          Tải lên
        </Button>
      )}

      {error && (
        <div className="mt-4 text-red-500">Có lỗi xảy ra khi tải lên CV</div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default UploadCVSection;
