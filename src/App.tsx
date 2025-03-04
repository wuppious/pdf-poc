import testPdf from "./assets/test.pdf";

import "./App.css";
import { PDFCustom } from "./PDFCustom";
import { PDFiframe } from "./PDFiframe";

export const App = () => {
  return (
    <div style={{ display: "flex", gap: "64px" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2>Custom PDF Viewer using PDF.js and react wrapper</h2>
        <PDFCustom pdfUrl={testPdf} />
      </div>
      <div style={{ width: "500px", height: "800px" }}>
        <h2>PDF Viewer using iframe</h2>
        <PDFiframe pdfUrl={testPdf} />
      </div>
    </div>
  );
};
