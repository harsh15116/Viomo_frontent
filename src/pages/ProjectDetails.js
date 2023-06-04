import Sidenav from "./Sidenav";
// import project_endsem from '../assests/pro'
import { useState, useEffect } from "react";
import samplePDF from "./project_endsem.pdf";
export default function ProjectDetails() {
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch(samplePDF);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };
    fetchPdf();
  }, []);

  return (
    <div>
      <Sidenav />
      {/* <iframe src={'http://localhost:3000/'+'./project_endsem.pdf'} width="100%">
        This browser does not support PDFs. Please download the PDF to view it.
      </iframe> */}
      {/* <Document file={samplePDF}></Document> */}
      <object
        data="https://drive.google.com/file/d/1CGSvjXquEsCWXkNNsKs27yObtXfQ9xMB/preview?usp=embed_googleplus"
        width="100%"
        height="800px"
      />
    </div>
  );
}
