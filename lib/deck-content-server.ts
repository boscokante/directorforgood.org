// Server-only functions for deck content file operations
// These use Node.js fs module and can only be used in server components/API routes

import fs from 'fs';
import path from 'path';
import { DeckContent, defaultDeckContent } from './deck-content';

// Path to the JSON file that stores deck content
const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'deck-content.json');

// Ensure the data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(CONTENT_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load content from file, or return defaults if file doesn't exist
export function getDeckContent(): DeckContent {
  try {
    ensureDataDir();
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const fileContent = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8');
      return JSON.parse(fileContent) as DeckContent;
    }
  } catch (error) {
    console.error('Error reading deck content file:', error);
  }
  return { ...defaultDeckContent };
}

// Save content to file
export function updateDeckContent(content: Partial<DeckContent>): DeckContent {
  try {
    ensureDataDir();
    const currentContent = getDeckContent();
    const updatedContent = { ...currentContent, ...content };
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(updatedContent, null, 2), 'utf-8');
    return updatedContent;
  } catch (error) {
    console.error('Error writing deck content file:', error);
    throw error;
  }
}

// Reset content to defaults
export function resetDeckContent(): DeckContent {
  try {
    ensureDataDir();
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(defaultDeckContent, null, 2), 'utf-8');
    return { ...defaultDeckContent };
  } catch (error) {
    console.error('Error resetting deck content file:', error);
    throw error;
  }
}
