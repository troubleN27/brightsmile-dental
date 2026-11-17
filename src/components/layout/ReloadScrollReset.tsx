"use client";

import { useSyncExternalStore } from "react";

// Runs in <head> before the page is drawn. On a browser reload (not on normal
// navigation or a shared link with an anchor) the page should start at the top:
// - drop the section anchor (#booking, …) so the browser doesn't jump to it;
// - turn off the browser's scroll position restore for this load only.
// Back/forward and in-page navigation keep their usual behaviour.
// The script is a constant string with no user input.
const script = `(function () {
  try {
    var nav = performance.getEntriesByType("navigation")[0];
    if (!nav || nav.type !== "reload") return;
    history.scrollRestoration = "manual";
    if (location.hash) {
      history.replaceState(history.state, "", location.pathname + location.search);
    }
    window.addEventListener("load", function () {
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(function () { history.scrollRestoration = "auto"; }, 0);
    });
  } catch (e) {}
})();`;

const noopSubscribe = () => () => {};

/**
 * The script only matters in the HTML that the server sends on a page load.
 * It is rendered there (and kept during hydration, so the markup matches),
 * but never created by React on the client — e.g. when switching language
 * re-renders the root layout — which React 19 would flag as an error.
 */
export function ReloadScrollReset() {
  const inServerHtml = useSyncExternalStore(noopSubscribe, () => false, () => true);
  if (!inServerHtml) return null;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
