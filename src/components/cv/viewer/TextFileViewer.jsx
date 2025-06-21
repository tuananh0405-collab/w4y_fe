import { useEffect, useState } from "react";

const TextFileViewer = ({ url }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(setText)
      .catch(() => setText("Không thể tải file TXT"));
  }, [url]);

  return <pre className="whitespace-pre-wrap p-4">{text}</pre>;
};

export default TextFileViewer;