'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, RotateCcw, Eye, Loader2, Plus, Trash2, ChevronDown, ChevronRight, ImageIcon, Upload, Undo2, Redo2 } from 'lucide-react';
import { DeckContent, SlideContent, SlideImage } from '@/lib/deck-content';
import Image from 'next/image';

const MAX_HISTORY = 50;

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

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/deck-content');
      const data = await response.json();
      setContent(data);
      // Initialize history with loaded content
      setHistory([data]);
      setHistoryIndex(0);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Push new state to history
  const pushToHistory = useCallback((newContent: DeckContent) => {
    if (isUndoRedo.current) {
      isUndoRedo.current = false;
      return;
    }
    
    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, historyIndex + 1);
      // Add new state
      newHistory.push(newContent);
      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
        return newHistory;
      }
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  // Undo function
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedo.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
      setHasChanges(true);
    }
  }, [historyIndex, history]);

  // Redo function
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

  const saveContent = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/deck-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        setHasChanges(false);
        alert('Content saved successfully!');
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

  const updateSlideSection = (slideIndex: number, sectionIndex: number, updates: Partial<SlideContent['sections'][0]>) => {
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
    
    // Convert to base64 for now (in production, upload to storage)
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
              onClick={saveContent}
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

      <div className="container px-4 py-8 max-w-4xl">
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
              <div key={slide.id} className="bg-gray-900 rounded-lg overflow-hidden">
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
              <label className="block text-sm text-gray-400 mb-1">What we'll do with the funding</label>
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

