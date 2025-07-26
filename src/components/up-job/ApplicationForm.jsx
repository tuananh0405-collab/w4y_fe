import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { fileIcon, editNoteIcon } from "../../assets";
import { useApplyJobMutation, useApplyJobLibraryMutation } from "../../redux/api/applicationApiSlice";
import { useGetUploadedCVsQuery } from "../../redux/api/applicantApiSlice";
import { Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ApplicationForm = ({ jobId, jobTitle, onClose }) => {
  const [uploadFromComputer, setUploadFromComputer] = useState(true);
  const [file, setFile] = useState(null);
  const [selectedCV, setSelectedCV] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const { data: queryResponse, isLoading: isLoadingCVs, error: cvError } = useGetUploadedCVsQuery();
  const uploadedCVs = queryResponse?.data || [];
  const [applyJob, { isLoading: isLoadingApplyJob }] = useApplyJobMutation();
  const [applyJobLibrary, { isLoading: isLoadingApplyJobLibrary }] = useApplyJobLibraryMutation();

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Extract cleaner filename from path
  const getFileNameFromPath = (path) => {
    if (!path) return "CV không tên";
    const parts = path.split("/");
    const fullName = parts[parts.length - 1] || "CV không tên";
    const nameParts = fullName.split("-");
    if (nameParts.length > 1) {
      const cleanName = nameParts.slice(1).join("-");
      const nameWithoutTimestamp = cleanName.replace(/-\d+\.pdf$/, ".pdf");
      return nameWithoutTimestamp;
    }
    return fullName;
  };

  const handleUploadFromComputerChange = () => {
    setUploadFromComputer(true);
    setSelectedCV("");
  };

  const handleUploadFromLibraryChange = () => {
    setUploadFromComputer(false);
    setFile(null);
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleCVSelect = (event) => {
    const newValue = event.target.value;
    setSelectedCV(newValue);
    console.log("Selected CV ID:", newValue); // Debug log
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("Form state:", { uploadFromComputer, file, selectedCV, coverLetter, uploadedCVs }); // Enhanced debug log
    if (uploadFromComputer && !file) {
      setSnackbarMessage("Vui lòng chọn file CV trước khi nộp.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    if (!uploadFromComputer && !selectedCV) {
      setSnackbarMessage("Vui lòng chọn CV từ thư viện trước khi nộp.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Enhanced validation with logging
    if (!uploadFromComputer) {
      const validCV = uploadedCVs.find((cv) => cv._id === selectedCV);
      if (!validCV) {
        console.log("Invalid CV selected, uploadedCVs:", uploadedCVs);
        setSnackbarMessage("CV đã chọn không hợp lệ hoặc không tồn tại.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }
      console.log("Validated CV:", validCV);
    }

    try {
      console.log("Submitting with:", { jobId, resumeId: selectedCV, coverLetter }); // Debug log
      if (uploadFromComputer) {
        const formData = new FormData();
        formData.append("resumeFile", file);
        formData.append("coverLetter", coverLetter);
        await applyJob({ jobId, formData }).unwrap();
      } else {
        const payload = { jobId, resumeId: selectedCV, coverLetter };
        console.log("Mutation payload:", payload); // New debug log
        const result = await applyJobLibrary(payload).unwrap();
        console.log("Mutation result:", result); // New debug log
      }
      setSnackbarMessage("Ứng tuyển thành công!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Reset form
      setFile(null);
      setSelectedCV("");
      setCoverLetter("");
      setUploadFromComputer(true);
      onClose();
    } catch (err) {
      console.error("Submission error:", err);
      setSnackbarMessage(err?.data?.message || "Có lỗi xảy ra khi nộp đơn");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <main className="flex justify-center p-8 bg-[#d7f3ea] font-sans min-h-screen">
      <section className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-lg">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-center text-[#183C2E]">
            Ứng tuyển {jobTitle || "[Tên công việc]"}
          </h1>
        </header>

        {/* Chọn CV */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-6 text-[#183C2E]">
            <img src={fileIcon} alt="" className="w-7 h-7" />
            Chọn CV:
          </h2>

          <div className="flex flex-col gap-3 border border-[#A8BBB4] rounded-lg p-5 bg-[#f1f8f6]">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <Checkbox
                checked={!uploadFromComputer}
                onChange={handleUploadFromLibraryChange}
                sx={{
                  color: "#6A9183",
                  "&.Mui-checked": { color: "#3A6656" },
                  padding: 0,
                  margin: 0,
                }}
              />
              <span className="text-lg font-medium text-[#3A6656]">
                Chọn CV từ thư viện của tôi
              </span>
            </label>

            {!uploadFromComputer && (
              <FormControl fullWidth className="mt-4">
                <InputLabel id="cv-select-label">Chọn CV</InputLabel>
                <Select
                  labelId="cv-select-label"
                  value={selectedCV}
                  label="Chọn CV"
                  onChange={handleCVSelect}
                  disabled={isLoadingCVs}
                >
                  {isLoadingCVs ? (
                    <MenuItem disabled>Đang tải CV...</MenuItem>
                  ) : uploadedCVs.length > 0 ? (
                    uploadedCVs.map((cv) => (
                      <MenuItem key={cv._id} value={cv._id}>
                        {getFileNameFromPath(cv.path)}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Không có CV nào trong thư viện</MenuItem>
                  )}
                </Select>
              </FormControl>
            )}

            <label
              htmlFor="file-upload"
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setUploadFromComputer(true)}
            >
              <Checkbox
                checked={uploadFromComputer}
                onChange={handleUploadFromComputerChange}
                sx={{
                  color: "#6A9183",
                  "&.Mui-checked": { color: "#3A6656" },
                  padding: 0,
                  margin: 0,
                }}
              />
              <span className="text-lg font-medium text-[#3A6656]">
                Tải CV từ máy tính (hỗ trợ docs, pdf)
              </span>
            </label>
          </div>

          {uploadFromComputer && (
            <label
              htmlFor="file-upload"
              className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-[#3A6656] rounded-lg bg-[#E6F0EA] cursor-pointer p-6 text-[#3A6656] font-semibold text-center hover:bg-[#D1E5DA] transition-colors"
            >
              <svg
                className="w-10 h-10 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              Kéo và thả tệp CV của bạn vào đây hoặc nhấp vào nút bên dưới để chọn tệp
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
                className="hidden"
              />
              <button
                type="button"
                className="mt-4 px-5 py-2 bg-[#3A6656] text-white rounded-lg hover:bg-[#2B4F42] transition-colors"
              >
                Chọn tệp CV
              </button>
              {file && (
                <p className="mt-3 text-sm text-[#3A6656] font-medium">
                  Đã chọn: {file.name}
                </p>
              )}
              <p className="mt-2 text-sm text-[#6A9183]">
                Hỗ trợ định dạng: PDF, DOCX, DOC (Tối đa 5MB)
              </p>
            </label>
          )}
        </section>

        {/* Thư giới thiệu */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-[#183C2E]">
            Thư giới thiệu
          </h2>
          <p className="text-[#3A6656] text-base mb-5 leading-relaxed font-light">
            Một thư giới thiệu ngắn gọn, chỉnh chu sẽ giúp bạn trở nên chuyên nghiệp
            và gây ấn tượng với nhà tuyển dụng
          </p>
          <textarea
            placeholder='Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này.'
            rows={5}
            value={coverLetter}
            onChange={handleCoverLetterChange}
            className="w-full border border-[#6A9183] rounded-xl p-4 text-base resize-y bg-[#E6F0EA] focus:outline-none focus:ring-4 focus:ring-[#A8E6CF]"
          />
        </section>

        {/* Lưu ý */}
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-5 text-[#183C2E]">
            <img src={editNoteIcon} alt="" className="w-7 h-7" />
            Lưu ý
          </h2>
          <ol className="list-decimal pl-8 text-lg text-[#3A6656] space-y-4 font-light leading-relaxed">
            <li>
              Chúng tôi khuyến nghị ứng viên cần chủ động tìm hiểu kỹ thông tin công ty,
              vị trí ứng tuyển và đảm bảo rằng tin tuyển dụng là minh bạch trước khi nộp hồ sơ.
            </li>
            <li>
              Ứng viên cần chịu trách nhiệm với các hành vi ứng tuyển của mình.
              Trong trường hợp bạn phát hiện tin tuyển dụng có dấu hiệu lừa đảo,
              hoặc nhận được liên hệ đáng ngờ từ phía nhà tuyển dụng,
              vui lòng báo cáo ngay cho đội ngũ hỗ trợ của chúng tôi qua email{" "}
              <strong>vutuananh0405@gmail.com</strong> để được xử lý kịp thời.
            </li>
            <li>
              Để tránh rủi ro, bạn nên tránh cung cấp các thông tin nhạy cảm như CMND/CCCD,
              tài khoản ngân hàng hoặc các loại phí cho đến khi chắc chắn về độ uy tín của bên tuyển dụng.
            </li>
            <li>
              Xem thêm hướng dẫn phòng tránh lừa đảo và mẹo tìm việc an toàn{" "}
              <a href="#" className="text-[#183c2e] underline hover:text-[#6A9183]">
                tại đây
              </a>.
            </li>
          </ol>
        </section>

        {/* Footer buttons */}
        <footer className="flex justify-end gap-4 mt-10">
          <Button
            variant="outlined"
            color="success"
            className="min-w-[81px]"
            sx={{
              color: "#3a6656",
              borderColor: "#3a6656",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              fontSize: "1rem",
              padding: "8px 20px",
            }}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="success"
            className="min-w-[200px]"
            sx={{
              backgroundColor: "#3a6656",
              color: "#fff",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              fontSize: "1rem",
              padding: "8px 24px",
              "&:hover": {
                backgroundColor: "#2d5848",
              },
            }}
            onClick={handleSubmit}
            disabled={isLoadingApplyJob || isLoadingApplyJobLibrary}
          >
            {isLoadingApplyJob || isLoadingApplyJobLibrary ? "Đang nộp..." : "Nộp hồ sơ ứng tuyển"}
          </Button>
        </footer>
      </section>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default ApplicationForm;