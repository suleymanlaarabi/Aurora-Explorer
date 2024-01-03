import { useEffect } from "react";

export enum EventKEY {
  CTRL_X = "ctrl+x",
  CTRL_C = "ctrl+c",
  CTRL_S = "ctrl+s",
  CTRL_ALT_N = "ctrl+alt+n",
  CTRL_SHIFT_N = "ctrl+shift+N",
  ENTER = "Enter",
  ESC = "Esc",
}

const useKeyboardShortcut = (
  event: EventKEY,
  callback: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      let isEventMatch = false;

      switch (event) {
        case EventKEY.CTRL_X:
          isEventMatch = e.ctrlKey && e.key === "x";
          break;
        case EventKEY.CTRL_C:
          isEventMatch = e.ctrlKey && e.key === "c";
          break;
        case EventKEY.CTRL_S:
          isEventMatch = e.ctrlKey && e.key === "s";
          break;
        case EventKEY.CTRL_ALT_N:
          isEventMatch = e.ctrlKey && e.altKey && e.key === "n";
          break;
        case EventKEY.CTRL_SHIFT_N:
          isEventMatch = e.ctrlKey && e.shiftKey && e.key === "N";
          break;
        case EventKEY.ENTER:
          isEventMatch = e.key === "Enter";
          break;
        case EventKEY.ESC:
          isEventMatch = e.key === "Escape";
          break;
        default:
          break;
      }

      if (isEventMatch) {
        callback();
      }
    };

    if (enabled) {
      window.addEventListener("keydown", handler);
    }

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [callback, event, enabled]);
};

export default useKeyboardShortcut;
