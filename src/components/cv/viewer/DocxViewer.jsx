import { useEffect, useState } from "react";
import mammoth from "mammoth";

const DocxViewer = ({ url }) => {
  const [html, setHtml] = useState("Đang tải...");

  useEffect(() => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(buffer => mammoth.convertToHtml({ arrayBuffer: buffer }))
      .then(result => setHtml(result.value))
      .catch(() => setHtml("Không thể hiển thị file DOCX"));
  }, [url]);

  return <div className="p-4" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default DocxViewer;