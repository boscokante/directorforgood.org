'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, ArrowLeft, Loader2, Maximize2, Minimize2 } from 'lucide-react';

export default function DeckPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const loadPdf = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/deck?t=${refreshKey}`);
      if (!response.ok) throw new Error('Failed to load PDF');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (error) {
      console.error('PDF load error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [refreshKey]);

  useEffect(() => {
    loadPdf();
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [loadPdf]);

  const handleRefresh = () => {
    setRefreshKey(Date.now());
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/deck');
      if (!response.ok) throw new Error('Failed to generate PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Director-Pitch-Deck.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className={`border-b border-gray-800 ${isFullscreen ? 'hidden' : ''}`}>
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <span className="text-gray-600">|</span>
            <h1 className="text-xl font-bold">Director Pitch Deck</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              onClick={() => setIsFullscreen(!isFullscreen)}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              size="sm"
              className="bg-white text-black hover:bg-gray-200"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Fullscreen header */}
      {isFullscreen && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-gray-700 bg-black/80 text-gray-300 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            onClick={() => setIsFullscreen(false)}
            variant="outline"
            size="sm"
            className="border-gray-700 bg-black/80 text-gray-300 hover:text-white"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isGenerating}
            size="sm"
            className="bg-white text-black hover:bg-gray-200"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* PDF Viewer */}
      <div className={`${isFullscreen ? 'h-screen' : 'h-[calc(100vh-73px)]'} bg-gray-900`}>
        {isLoading && !pdfUrl ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Generating PDF preview...</p>
            </div>
          </div>
        ) : pdfUrl ? (
          <iframe
            src={`${pdfUrl}#view=FitH&toolbar=1&navpanes=1`}
            className="w-full h-full border-0"
            title="Director Pitch Deck Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Failed to load PDF preview</p>
              <Button onClick={handleRefresh} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions panel (not in fullscreen) */}
      {!isFullscreen && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-sm">
            <p className="text-gray-300 mb-2">
              <strong>Live Preview:</strong> Changes to the PDF code will reflect when you click Refresh.
            </p>
            <p className="text-gray-500 text-xs">
              Edit files in <code className="bg-gray-900 px-1 rounded">lib/pdf/</code> and refresh to see updates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
