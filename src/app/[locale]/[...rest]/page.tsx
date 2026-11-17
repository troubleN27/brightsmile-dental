import { notFound } from "next/navigation";

// This segment only ever renders the 404, so it is exempt from instant-navigation validation
export const instant = false;

// Any unknown path inside a locale (e.g. /ru/abc) renders the localized 404
export default function CatchAllPage() {
  notFound();
}
