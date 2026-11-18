/** Landing sections linked from the header, mobile menu and footer. */
export const navItems = [
  "about",
  "doctors",
  "services",
  "results",
  "reviews",
  "kids",
  "faq",
  "contacts",
] as const;

export type NavItem = (typeof navItems)[number];

/** Section anchors on the home page, e.g. "/#services" (locale is added by the Link). */
export const sectionHref = (id: string) => `/#${id}`;
