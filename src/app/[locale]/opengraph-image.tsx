import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BrightSmile Dental";

/**
 * Loads Manrope from Google Fonts at build time, subset to the characters used,
 * so Cyrillic renders correctly. Returns null if the font can't be fetched;
 * the image then falls back to the built-in font.
 */
async function loadManrope(weight: number, text: string) {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return null;
    return await (await fetch(fontUrl)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "OgImage" });
  const title = t("title");
  const subtitle = t("subtitle");
  const badge = t("badge");
  const brand = "BrightSmile Dental";

  const [bold, semibold] = await Promise.all([
    loadManrope(800, `${brand}${title}`),
    loadManrope(600, `${subtitle}${badge}`),
  ]);
  const fonts = [
    ...(bold ? [{ name: "Manrope", data: bold, weight: 800 as const, style: "normal" as const }] : []),
    ...(semibold ? [{ name: "Manrope", data: semibold, weight: 600 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 55%, #99F6E4 100%)",
          fontFamily: "Manrope",
          color: "#0F172A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              background: "#0EA5E9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 40 40">
              <path
                d="M14.6 9.5c-3.4 0-5.6 2.6-5.6 6 0 2.6.8 4.3 1.6 6.3.7 1.8 1.1 3.8 1.4 6 .4 2.4 1 4.2 2.4 4.2 1.5 0 1.9-1.8 2.4-4 .4-1.8.8-3.3 3.2-3.3s2.8 1.5 3.2 3.3c.5 2.2.9 4 2.4 4 1.4 0 2-1.8 2.4-4.2.3-2.2.7-4.2 1.4-6 .8-2 1.6-3.7 1.6-6.3 0-3.4-2.2-6-5.6-6-2.2 0-3.3 1.1-5.4 1.1s-3.2-1.1-5.4-1.1Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
            BrightSmile<span style={{ color: "#0F766E", marginLeft: 12 }}>Dental</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 960 }}>
            {title}
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: "#334155", maxWidth: 900 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              padding: "14px 28px",
              borderRadius: 999,
              background: "#0F172A",
              color: "#fff",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {badge}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
