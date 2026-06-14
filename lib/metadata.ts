import type { Metadata } from "next";
import { siteUrl } from "@/lib/env";

const SITE_NAME = "مجله";
const SITE_URL = siteUrl;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | مجله تخصصی`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "مجله تخصصی با مقالات آموزشی، راهنمای خرید، اخبار و محتوای علمی برای مخاطبان فارسی‌زبان.",
  keywords: [
    "مجله",
    "بلاگ",
    "راهنمای خرید",
    "آموزشی",
    "اخبار",
    "سرمایه‌گذاری",
  ],
  authors: [{ name: "تیم محتوای ما" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | مجله تخصصی`,
    description:
      "مجله تخصصی با مقالات آموزشی، راهنمای خرید، اخبار و محتوای علمی.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | مجله تخصصی`,
    description:
      "مجله تخصصی با مقالات آموزشی، راهنمای خرید، اخبار و محتوای علمی.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export function createMagazineMetadata(search?: string): Metadata {
  const title = search
    ? `نتایج جستجو برای «${search}»`
    : "مجله | آرشیو مقالات";

  const description = search
    ? `نتایج جستجو برای «${search}» در مجله تخصصی ما.`
    : "آرشیو مقالات مجله شامل راهنمای خرید، آموزش، اخبار و محتوای علمی.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
