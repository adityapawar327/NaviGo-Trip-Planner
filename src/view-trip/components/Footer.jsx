import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";

const Footer = () => {
  const downloadPDF = () => {
    const element = document.body; // Specify the part of the page to capture
    const options = {
      margin: 0, // No margins
      filename: "TravelGuide.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 1.25, // Scaling the rendered canvas to simulate a 150% zoom
        useCORS: true, // Enable cross-origin images
        logging: true, // Enable logging for debugging
        allowTaint: false, // Prevent images from being tainted
      },
      jsPDF: { 
        unit: "in", 
        format: [11.69, 6.56], // 16:9 aspect ratio
        orientation: "landscape" // Landscape orientation
      }
    };
    html2pdf().from(element).set(options).save();
  };

  useEffect(() => {
    // Ensure all images are loaded before attempting to capture them
    const images = Array.from(document.images);
    images.forEach((img) => {
      if (img.complete) return; // Skip if image is already loaded
      img.onload = () => {
        // Trigger any necessary re-render or state update
      };
    });
  }, []);

  return (
    <footer className="bg-white mt-10 py-4">
      <div className="container mx-auto text-center text-gray-600">
        <button
          onClick={downloadPDF}
          className="bg-[#151515] text-[#EEEEEE] py-2 px-4 rounded mb-4 hover:bg-[#A91D3A] hover:text-[#EEEEEE]"
        >
          Download as PDF
        </button>
        <p className="text-[#151515]">&copy; 2024 Navi Go. All Rights Reserved.</p>
        <p className="text-[#151515]">Designed & Developed by Aditya Pawar</p>
      </div>
    </footer>
  );
};

export default Footer;
