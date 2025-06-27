import DocxViewer from "./DocxViewer";
import TextFileViewer from "./TextFileViewer";
import PDFViewer from "./PDFViewer";

const getFileExt = (url) => url.split('.').pop()?.toLowerCase();

const CVViewerModal = ({ fileUrl, onClose }) => {
  const ext = getFileExt(fileUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white w-[90%] h-[90%] rounded-xl shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-red-600 font-bold text-xl">×</button>
        <div className="w-full h-full p-4 overflow-auto">
          {ext === "pdf" && <PDFViewer url={fileUrl} />}
          {ext === "txt" && <TextFileViewer url={fileUrl} />}
          {ext === "docx" && <DocxViewer url={fileUrl} />}
          {!["pdf", "docx", "txt"].includes(ext) && <p>Không hỗ trợ định dạng này.</p>}
        </div>
      </div>
    </div>
  );
};

export default CVViewerModal;