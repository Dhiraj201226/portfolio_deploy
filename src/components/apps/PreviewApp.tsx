import React, { useState } from 'react';
import { Download, FileText, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

export const PreviewApp: React.FC = () => {
  const [zoom, setZoom] = useState<number>(100);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Dhiraj_Resume_FINAL.pdf';
    link.download = 'Dhiraj_Resume_FINAL.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-[#525659] text-white font-sans">
      {/* Preview Toolbar */}
      <div className="h-11 bg-[#323639] border-b border-[#202124] px-4 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2 text-xs font-medium text-gray-200">
          <FileText size={15} className="text-[#007aff]" />
          <span>Dhiraj_Resume_FINAL.pdf</span>
        </div>

        {/* Center Zoom Controls */}
        <div className="flex items-center space-x-1.5 bg-black/30 px-2 py-1 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            title="Zoom Out"
            className="p-1 hover:bg-white/10 rounded"
          >
            <ZoomOut size={13} />
          </button>
          <span className="w-12 text-center text-[11px] font-mono">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            title="Zoom In"
            className="p-1 hover:bg-white/10 rounded"
          >
            <ZoomIn size={13} />
          </button>
        </div>

        {/* Visible Download Button (verbatim requirement) */}
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center space-x-1.5 bg-[#007aff] hover:bg-[#0069d9] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors focus:ring-2 focus:ring-blue-400"
        >
          <Download size={14} />
          <span>Download CV</span>
        </button>
      </div>

      {/* PDF View Container */}
      <main className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#525659]">
        <div
          style={{ width: `${zoom}%`, maxWidth: '900px' }}
          className="bg-white shadow-2xl rounded-sm overflow-hidden min-h-[600px] flex flex-col"
        >
          <iframe
            src="/Dhiraj_Resume_FINAL.pdf#toolbar=0"
            title="Dhiraj Shirse Resume PDF"
            className="w-full flex-1 border-none min-h-[600px]"
          />
        </div>
      </main>
    </div>
  );
};
