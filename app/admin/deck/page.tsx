'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Save, RotateCcw, Eye, Loader2, Plus, Trash2, 
  ChevronDown, ChevronRight, ImageIcon, Upload, Undo2, Redo2,
  Sparkles, X, Send, History, Clock, RotateCw, Command
} from 'lucide-react';
import { DeckContent, SlideContent, SlideImage } from '@/lib/deck-content';

const MAX_HISTORY = 50;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  proposedContent?: DeckContent;
  changes?: string[];
  applied?: boolean;
}

interface DeckVersionSummary {
  id: number;
  description: string | null;
  createdBy: number | null;
  createdAt: string;
}

export default function DeckEditorPage() {
  const [content, setContent] = useState<DeckContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSlides, setExpandedSlides] = useState<Set<string>>(new Set());
  const [hasChanges, setHasChanges] = useState(false);
  
  // Undo/Redo state
  const [history, setHistory] = useState<DeckContent[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedo = useRef(false);

  // Chat panel state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Command bar state
  const [showCommandBar, setShowCommandBar] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Version history state
  const [showHistory, setShowHistory] = useState(false);
  const [versions, setVersions] = useState<DeckVersionSummary[]>([]);
  const [isLoadingVersions, setIsLoadingVersions] = useState(false);
  const [previewVersion, setPreviewVersion] = useState<DeckContent | null>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo/Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      // Command bar (Cmd+K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandBar(true);
        setTimeout(() => commandInputRef.current?.focus(), 100);
      }
      // Close panels on Escape
      if (e.key === 'Escape') {
        setShowCommandBar(false);
        setShowChat(false);
        setShowHistory(false);
        setPreviewVersion(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/deck-content');
      const data = await response.json();
      setContent(data);
      setHistory([data]);
      setHistoryIndex(0);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVersions = async () => {
    setIsLoadingVersions(true);
    try {
      const response = await fetch('/api/deck-content/versions');
      const data = await response.json();
      setVersions(data);
    } catch (error) {
      console.error('Failed to fetch versions:', error);
    } finally {
      setIsLoadingVersions(false);
    }
  };

  const previewVersionContent = async (versionId: number) => {
    try {
      const response = await fetch(`/api/deck-content/versions/${versionId}`);
      const data = await response.json();
      setPreviewVersion(data.content);
    } catch (error) {
      console.error('Failed to fetch version:', error);
    }
  };

  const restoreVersion = async (versionId: number) => {
    if (!confirm('Restore this version? Your current changes will be saved as a new version first.')) return;
    
    try {
      // Save current state first
      if (content && hasChanges) {
        await fetch('/api/deck-content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, description: 'Auto-save before restore' }),
        });
      }
      
      const response = await fetch(`/api/deck-content/versions/${versionId}/restore`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        setContent(data.content);
        setHistory([data.content]);
        setHistoryIndex(0);
        setHasChanges(false);
        setPreviewVersion(null);
        setShowHistory(false);
        fetchVersions();
      }
    } catch (error) {
      console.error('Failed to restore version:', error);
    }
  };

  const pushToHistory = useCallback((newContent: DeckContent) => {
    if (isUndoRedo.current) {
      isUndoRedo.current = false;
      return;
    }
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newContent);
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
        return newHistory;
      }
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedo.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
      setHasChanges(true);
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedo.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
      setHasChanges(true);
    }
  }, [historyIndex, history]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const saveContent = async (description?: string) => {
    if (!content) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/deck-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, description }),
      });
      if (response.ok) {
        setHasChanges(false);
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const resetContent = async () => {
    if (!confirm('Reset all content to defaults? This cannot be undone.')) return;
    try {
      const response = await fetch('/api/deck-content', { method: 'DELETE' });
      const data = await response.json();
      setContent(data);
      setHistory([data]);
      setHistoryIndex(0);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to reset content:', error);
    }
  };

  // AI Chat functions
  const sendChatMessage = async (message: string) => {
    if (!message.trim() || !content) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAiLoading(true);
    
    try {
      const response = await fetch('/api/deck/ai-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instruction: message,
          currentContent: content,
        }),
      });
      
      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.success 
          ? `${data.description}\n\nChanges:\n${data.changes?.map((c: string) => `• ${c}`).join('\n') || 'Content updated'}`
          : `Sorry, I couldn't complete that request: ${data.error}`,
        timestamp: new Date(),
        proposedContent: data.success ? data.content : undefined,
        changes: data.changes,
        applied: false,
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const applyProposedChanges = (messageId: string) => {
    const message = chatMessages.find(m => m.id === messageId);
    if (!message?.proposedContent) return;
    
    setContent(message.proposedContent);
    pushToHistory(message.proposedContent);
    setHasChanges(true);
    
    setChatMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, applied: true } : m
    ));
  };

  const handleCommandSubmit = async () => {
    if (!commandInput.trim()) return;
    
    const command = commandInput.trim();
    setShowCommandBar(false);
    setCommandInput('');
    
    // Open chat and send the command
    setShowChat(true);
    await sendChatMessage(command);
  };

  const updateCover = (field: keyof DeckContent['cover'], value: string) => {
    if (!content) return;
    const newContent = { ...content, cover: { ...content.cover, [field]: value } };
    setContent(newContent);
    pushToHistory(newContent);
    setHasChanges(true);
  };

  const updateSlide = (index: number, updates: Partial<SlideContent>) => {
    if (!content) return;
    const newSlides = [...content.slides];
    newSlides[index] = { ...newSlides[index], ...updates };
    const newContent = { ...content, slides: newSlides };
    setContent(newContent);
    pushToHistory(newContent);
    setHasChanges(true);
  };

  const updateSlideSection = (slideIndex: number, sectionIndex: number, updates: Partial<NonNullable<SlideContent['sections']>[0]>) => {
    if (!content) return;
    const newSlides = [...content.slides];
    const newSections = [...(newSlides[slideIndex].sections || [])];
    newSections[sectionIndex] = { ...newSections[sectionIndex], ...updates };
    newSlides[slideIndex] = { ...newSlides[slideIndex], sections: newSections };
    const newContent = { ...content, slides: newSlides };
    setContent(newContent);
    pushToHistory(newContent);
    setHasChanges(true);
  };

  const updateSectionItems = (slideIndex: number, sectionIndex: number, items: string[]) => {
    updateSlideSection(slideIndex, sectionIndex, { items });
  };

  const addSectionItem = (slideIndex: number, sectionIndex: number) => {
    if (!content) return;
    const currentItems = content.slides[slideIndex].sections?.[sectionIndex]?.items || [];
    updateSectionItems(slideIndex, sectionIndex, [...currentItems, '']);
  };

  const removeSectionItem = (slideIndex: number, sectionIndex: number, itemIndex: number) => {
    if (!content) return;
    const currentItems = content.slides[slideIndex].sections?.[sectionIndex]?.items || [];
    updateSectionItems(slideIndex, sectionIndex, currentItems.filter((_, i) => i !== itemIndex));
  };

  const updateAsk = (field: 'amount' | 'items', value: string | string[]) => {
    if (!content) return;
    const newContent = { ...content, ask: { ...content.ask, [field]: value } };
    setContent(newContent);
    pushToHistory(newContent);
    setHasChanges(true);
  };

  const toggleSlide = (slideId: string) => {
    const newExpanded = new Set(expandedSlides);
    if (newExpanded.has(slideId)) {
      newExpanded.delete(slideId);
    } else {
      newExpanded.add(slideId);
    }
    setExpandedSlides(newExpanded);
  };

  const updateSlideImage = (slideIndex: number, image: SlideImage | undefined) => {
    if (!content) return;
    const newSlides = [...content.slides];
    newSlides[slideIndex] = { ...newSlides[slideIndex], image };
    const newContent = { ...content, slides: newSlides };
    setContent(newContent);
    pushToHistory(newContent);
    setHasChanges(true);
  };

  const handleImageDrop = async (slideIndex: number, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const currentImage = content?.slides[slideIndex]?.image;
      updateSlideImage(slideIndex, {
        ...currentImage,
        type: currentImage?.type || 'infographic',
        url: reader.result as string,
        placeholder: currentImage?.placeholder,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async (slideIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const currentImage = content?.slides[slideIndex]?.image;
      updateSlideImage(slideIndex, {
        ...currentImage,
        type: currentImage?.type || 'infographic',
        url: reader.result as string,
        placeholder: currentImage?.placeholder,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeSlideImage = (slideIndex: number) => {
    if (!content) return;
    const currentImage = content.slides[slideIndex]?.image;
    if (currentImage) {
      updateSlideImage(slideIndex, { ...currentImage, url: undefined });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Failed to load content</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Command Bar Modal */}
      {showCommandBar && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/50" onClick={() => setShowCommandBar(false)}>
          <div 
            className="w-full max-w-xl bg-gray-900 rounded-lg shadow-2xl border border-gray-700"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
              <Command className="w-5 h-5 text-gray-400" />
              <input
                ref={commandInputRef}
                type="text"
                value={commandInput}
                onChange={e => setCommandInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleCommandSubmit();
                  if (e.key === 'Escape') setShowCommandBar(false);
                }}
                placeholder="Describe what you want to change... (e.g., 'add a slide about partnerships')"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                autoFocus
              />
            </div>
            <div className="px-4 py-2 text-xs text-gray-500">
              Press Enter to submit • Escape to close
            </div>
          </div>
        </div>
      )}

      {/* Version History Panel */}
      {showHistory && (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-gray-900 border-l border-gray-700 z-40 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h3 className="font-semibold flex items-center gap-2">
              <History className="w-4 h-4" />
              Version History
            </h3>
            <button onClick={() => { setShowHistory(false); setPreviewVersion(null); }} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {previewVersion ? (
            <div className="flex-1 overflow-auto p-4">
              <div className="mb-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setPreviewVersion(null)} className="border-gray-600">
                  Back to List
                </Button>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-sm">
                <h4 className="font-medium mb-2">Preview</h4>
                <p className="text-gray-400 mb-2">Title: {previewVersion.cover.title}</p>
                <p className="text-gray-400 mb-2">Slides: {previewVersion.slides.length}</p>
                <p className="text-gray-400">Ask: {previewVersion.ask.amount}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              {isLoadingVersions ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : versions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No saved versions yet
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {versions.map(version => (
                    <div key={version.id} className="p-4 hover:bg-gray-800/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-3 h-3" />
                          {new Date(version.createdAt).toLocaleString()}
                        </div>
                        <span className="text-xs text-gray-500">#{version.id}</span>
                      </div>
                      <p className="text-sm mb-3">{version.description || 'No description'}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs border-gray-600"
                          onClick={() => previewVersionContent(version.id)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs border-gray-600"
                          onClick={() => restoreVersion(version.id)}
                        >
                          <RotateCw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* AI Chat Panel */}
      {showChat && (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-gray-900 border-l border-gray-700 z-40 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI Assistant
            </h3>
            <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-400/50" />
                <p className="mb-2">Ask me to edit your deck</p>
                <p className="text-sm">Try: &quot;Add a slide about our team&quot; or &quot;Make the tagline more compelling&quot;</p>
              </div>
            )}
            
            {chatMessages.map(message => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 ${
                  message.role === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {message.proposedContent && !message.applied && (
                    <div className="mt-3 pt-2 border-t border-gray-700">
                      <Button
                        size="sm"
                        onClick={() => applyProposedChanges(message.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs"
                      >
                        Apply Changes
                      </Button>
                    </div>
                  )}
                  
                  {message.applied && (
                    <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Applied
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isAiLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendChatMessage(chatInput);
                  }
                }}
                placeholder="Describe your changes..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500"
                disabled={isAiLoading}
              />
              <Button
                size="sm"
                onClick={() => sendChatMessage(chatInput)}
                disabled={!chatInput.trim() || isAiLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Edit Pitch Deck</h1>
            {hasChanges && (
              <span className="text-xs bg-yellow-600 px-2 py-1 rounded">Unsaved changes</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={undo}
              disabled={!canUndo}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 disabled:opacity-30"
              title="Undo (Cmd+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={redo}
              disabled={!canRedo}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 disabled:opacity-30"
              title="Redo (Cmd+Shift+Z)"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-gray-700 mx-1" />
            <Button
              onClick={() => { setShowHistory(true); fetchVersions(); }}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300"
              title="Version History"
            >
              <History className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setShowChat(true)}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setShowCommandBar(true)}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300"
              title="Quick Command (Cmd+K)"
            >
              <Command className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-gray-700 mx-1" />
            <Button
              onClick={resetContent}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Link href="/deck" target="_blank">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </Link>
            <Button
              onClick={() => saveContent()}
              disabled={isSaving || !hasChanges}
              size="sm"
              className="bg-white text-black hover:bg-gray-200"
            >
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className={`container px-4 py-8 max-w-4xl transition-all ${showChat || showHistory ? 'mr-96' : ''}`}>
        {/* Cover Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Slides</h2>
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-2">
            <button
              onClick={() => toggleSlide('cover')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
              <span className="font-medium">1. Cover Slide</span>
              {expandedSlides.has('cover') ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSlides.has('cover') && (
              <div className="px-4 pb-4 space-y-4 border-t border-gray-800">
                <div className="pt-4">
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={content.cover.title}
                    onChange={(e) => updateCover('title', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tagline</label>
                  <textarea
                    value={content.cover.tagline}
                    onChange={(e) => updateCover('tagline', e.target.value)}
                    rows={2}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Subtagline</label>
                  <input
                    type="text"
                    value={content.cover.subtagline}
                    onChange={(e) => updateCover('subtagline', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">URL</label>
                  <input
                    type="text"
                    value={content.cover.url}
                    onChange={(e) => updateCover('url', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {content.slides.map((slide, slideIndex) => (
              <div key={slide.id} className="bg-gray-900 rounded-lg overflow-hidden mb-2">
                <button
                  onClick={() => toggleSlide(slide.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <span className="font-medium">
                    {slideIndex + 2}. {slide.title}
                  </span>
                  {expandedSlides.has(slide.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {expandedSlides.has(slide.id) && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-800">
                    <div className="pt-4">
                      <label className="block text-sm text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateSlide(slideIndex, { title: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={slide.subtitle || ''}
                        onChange={(e) => updateSlide(slideIndex, { subtitle: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                      />
                    </div>

                    {/* Sections */}
                    {slide.sections?.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="bg-gray-800 rounded p-3 space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Section Heading</label>
                          <input
                            type="text"
                            value={section.heading || ''}
                            onChange={(e) => updateSlideSection(slideIndex, sectionIndex, { heading: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                          />
                        </div>
                        
                        {section.text !== undefined && (
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Text</label>
                            <textarea
                              value={section.text}
                              onChange={(e) => updateSlideSection(slideIndex, sectionIndex, { text: e.target.value })}
                              rows={2}
                              className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                            />
                          </div>
                        )}
                        
                        {section.items && (
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Bullet Points</label>
                            {section.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex gap-2 mb-1">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => {
                                    const newItems = [...section.items!];
                                    newItems[itemIndex] = e.target.value;
                                    updateSectionItems(slideIndex, sectionIndex, newItems);
                                  }}
                                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                                />
                                <button
                                  onClick={() => removeSectionItem(slideIndex, sectionIndex, itemIndex)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addSectionItem(slideIndex, sectionIndex)}
                              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 mt-1"
                            >
                              <Plus className="w-3 h-3" /> Add item
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {slide.highlight && (
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Highlight Box</label>
                        <textarea
                          value={slide.highlight}
                          onChange={(e) => updateSlide(slideIndex, { highlight: e.target.value })}
                          rows={2}
                          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                        />
                      </div>
                    )}

                    {slide.footnote && (
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Footnote</label>
                        <input
                          type="text"
                          value={slide.footnote}
                          onChange={(e) => updateSlide(slideIndex, { footnote: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                        />
                      </div>
                    )}

                    {/* Image Section */}
                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <label className="block text-sm text-gray-400 mb-2">Slide Image</label>
                      
                      {slide.image?.url ? (
                        <div className="relative">
                          <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                            <img
                              src={slide.image.url}
                              alt={slide.image.placeholder || 'Slide image'}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <button
                            onClick={() => removeSlideImage(slideIndex)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <p className="text-xs text-gray-500 mt-1">{slide.image.placeholder}</p>
                        </div>
                      ) : (
                        <div
                          onDrop={(e) => handleImageDrop(slideIndex, e)}
                          onDragOver={(e) => e.preventDefault()}
                          className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors"
                        >
                          <ImageIcon className="w-12 h-12 mx-auto text-gray-500 mb-3" />
                          <p className="text-sm text-gray-400 mb-2">
                            {slide.image?.placeholder || 'Drag & drop image here'}
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            Type: {slide.image?.type || 'Not set'}
                          </p>
                          <label className="cursor-pointer">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white">
                              <Upload className="w-4 h-4" />
                              Upload Image
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(slideIndex, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                      
                      <div className="mt-2">
                        <label className="block text-xs text-gray-500 mb-1">Image Description (for AI generation)</label>
                        <input
                          type="text"
                          value={slide.image?.placeholder || ''}
                          onChange={(e) => updateSlideImage(slideIndex, {
                            ...slide.image,
                            type: slide.image?.type || 'infographic',
                            placeholder: e.target.value,
                          })}
                          placeholder="Describe the image you want..."
                          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                        />
                      </div>
                      
                      <div className="mt-2">
                        <label className="block text-xs text-gray-500 mb-1">Image Type</label>
                        <select
                          value={slide.image?.type || 'infographic'}
                          onChange={(e) => updateSlideImage(slideIndex, {
                            ...slide.image,
                            type: e.target.value as SlideImage['type'],
                            placeholder: slide.image?.placeholder,
                          })}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                        >
                          <option value="icon">Icon</option>
                          <option value="chart">Chart</option>
                          <option value="mockup">Mockup</option>
                          <option value="infographic">Infographic</option>
                          <option value="photo">Photo</option>
                          <option value="diagram">Diagram</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </section>

        {/* Ask Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">The Ask</h2>
          <div className="bg-gray-900 rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Amount</label>
              <input
                type="text"
                value={content.ask.amount}
                onChange={(e) => updateAsk('amount', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">What we&apos;ll do with the funding</label>
              {content.ask.items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...content.ask.items];
                      newItems[index] = e.target.value;
                      updateAsk('items', newItems);
                    }}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => {
                      const newItems = content.ask.items.filter((_, i) => i !== index);
                      updateAsk('items', newItems);
                    }}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => updateAsk('items', [...content.ask.items, ''])}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add item
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
