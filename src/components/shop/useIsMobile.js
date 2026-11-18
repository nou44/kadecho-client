
import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 1023px)";

const mediaQuery =
  typeof window !== "undefined"
    ? window.matchMedia(MOBILE_QUERY)
    : null;

function subscribe(callback) {
  if (!mediaQuery) return () => {};

  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  return mediaQuery?.matches ?? false;
}

function getServerSnapshot() {
  return false;
}

export default function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}
