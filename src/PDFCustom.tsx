import { usePdf } from "@mikecousins/react-pdf";
import { useRef, useState, useCallback } from "react";

const SCALE_MIN = 0.2;
const SCALE_MAX = 1;
const SCALE_DEFAULT = 0.5;
const SCALE_SENSITIVITY = 0.01;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

type Props = {
  pdfUrl: string;
};
export const PDFCustom: React.FC<Props> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(SCALE_DEFAULT);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = useCallback(() => {
    setError(null);
  }, []);

  const onDocumentLoadFail = useCallback(() => {
    console.error("document load failed");
    setError("Document load failed");
  }, []);

  const onPageLoadSuccess = useCallback(() => {
    setError(null);
  }, []);

  const onPageLoadFail = useCallback(() => {
    console.error("page load failed");
    setError("Page load failed");
  }, []);

  const { pdfDocument } = usePdf({
    file: pdfUrl,
    canvasRef,
    page,
    scale,
    onDocumentLoadSuccess,
    onDocumentLoadFail,
    onPageLoadSuccess,
    onPageLoadFail,
  });

  const handleScroll = (e: React.WheelEvent<HTMLCanvasElement>) => {
    setScale((prev) => clamp(prev - Math.sign(e.deltaY) * SCALE_SENSITIVITY, SCALE_MIN, SCALE_MAX));
  };

  const nextPage = () => {
    setPage((prev) => clamp(prev + 1, 1, pdfDocument?.numPages || 1));
  };

  const prevPage = () => {
    setPage((prev) => clamp(prev - 1, 1, pdfDocument?.numPages || 1));
  };

  return (
    <>
      {!pdfDocument && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div style={{ position: "relative", width: "500px", height: "800px", display: "flex", justifyContent: "center" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, bottom: 0, margin: "auto" }}
          onWheel={handleScroll}
        />
      </div>

      <div style={{ width: "100%", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "32px",
            backgroundColor: "darkgray",
          }}
        >
          <button onClick={prevPage}>Previous</button>
          <p>
            {page} / {pdfDocument?.numPages}
          </p>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    </>
  );
};
