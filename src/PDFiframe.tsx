import React from "react";

type Props = {
  pdfUrl: string;
};
export const PDFiframe: React.FC<Props> = ({ pdfUrl }) => {
  return <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer"></iframe>;
};
