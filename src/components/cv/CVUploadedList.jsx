import React from "react";
import Button from "@mui/material/Button";
import { FileText, Trash2 } from "lucide-react";
import {
  useGetUploadedCVsQuery,
  useDeleteUploadedCVMutation,
} from "../../redux/api/applicantApiSlice";

const extractFileName = (url) => {
  const segments = url.split("/");
  const raw = segments[segments.length - 1];
  const name = decodeURIComponent(raw.split("-").slice(1).join("-"));
  return name || "CV không tên";
};

const CVUploadedList = () => {
  const { data, isLoading, isError } = useGetUploadedCVsQuery();
  const [deleteCV, { isLoading: isDeleting }] = useDeleteUploadedCVMutation();

  const cvs = data?.data || [];
  const handleDelete = async (cvId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa CV này?");
    if (!confirmed) return;

    try {
      await deleteCV(cvId).unwrap();
      alert("Xóa thành công!");
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
      alert("Xóa thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full max-w-[922px] mx-auto bg-white mt-10 p-5 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="font-inter font-bold text-2xl text-teal-700 mb-4 text-center">
        Danh sách CV đã tải lên
      </h2>

      {isLoading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Lỗi khi tải danh sách CV</p>
      ) : cvs.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có CV nào được tải lên.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cvs.map((cv) => (
            <div
              key={cv._id}
              className="flex flex-col items-center border border-gray-300 rounded-xl p-4 hover:shadow-md transition relative"
            >
              <FileText className="w-10 h-10 text-blue-500 mb-2" />
              <p className="text-md font-medium text-center text-black mb-2 truncate max-w-[200px]">
                {extractFileName(cv.path)}
              </p>
              <p className="text-sm text-center text-gray-500 mb-2">
                Upload lúc: {new Date(cv.uploadedAt).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  href={cv.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem CV
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(cv._id)}
                  disabled={isDeleting}
                  startIcon={<Trash2 size={16} />}
                >
                  Xoá
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CVUploadedList;
