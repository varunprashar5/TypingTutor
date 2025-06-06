import { useEffect, useCallback } from 'react';
import type { KeyboardShortcuts, TypingTutorShortcutActions } from '../../types';

/**
 * Custom hook for managing keyboard shortcuts
 * @param shortcuts - Object mapping key combinations to functions
 * @param enabled - Whether shortcuts are enabled
 */
export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts, enabled: boolean = true): void => {
  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    if (!enabled) return;

    // Don't trigger shortcuts when typing in input fields
    if ((event.target as HTMLElement).tagName === 'INPUT' && !event.ctrlKey && !event.metaKey) {
      return;
    }

    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    // Create a key combination string
    let combination = '';
    if (ctrl) combination += 'ctrl+';
    if (shift) combination += 'shift+';
    if (alt) combination += 'alt+';
    combination += key;

    // Also check for single key shortcuts
    const singleKey = key;

    // Execute the appropriate shortcut
    if (shortcuts[combination]) {
      event.preventDefault();
      shortcuts[combination]?.(event);
    } else if (shortcuts[singleKey] && !ctrl && !shift && !alt) {
      // Only trigger single key shortcuts if no modifiers are pressed
      // and we're not in an input field
      if ((event.target as HTMLElement).tagName !== 'INPUT') {
        event.preventDefault();
        shortcuts[singleKey]?.(event);
      }
    }
  }, [shortcuts, enabled]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
};

/**
 * Hook for providing typing tutor specific keyboard shortcuts
 * @param actions - Object containing action functions
 * @param isCompleted - Whether the test is completed
 */
export const useTypingTutorShortcuts = (
  { onRestart, onPause, onFocus }: TypingTutorShortcutActions, 
  isCompleted: boolean = false
): void => {
  const shortcuts: KeyboardShortcuts = {
    'ctrl+r': (e?: KeyboardEvent) => {
      e?.preventDefault();
      onRestart();
    },
    'escape': () => {
      if (onPause) {
        onPause();
      }
    },
    'f1': (e?: KeyboardEvent) => {
      e?.preventDefault();
      if (onFocus) {
        onFocus();
      }
    }
  };

  // Add space to restart when test is completed
  if (isCompleted) {
    shortcuts[' '] = onRestart;
    shortcuts['enter'] = onRestart;
  }

  useKeyboardShortcuts(shortcuts, true);
}; 