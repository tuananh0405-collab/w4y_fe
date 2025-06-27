const PDFViewer = ({ url }) => {
  return (
    <iframe
      src={url}
      className="w-full h-full"
      title="PDF Viewer"
    />
  );
};

export default PDFViewer;