import "@/styles/globals.css";
import React, { ReactNode } from "react";
import ClientStorageHandler from "./components/ClientStorageHandler";
import MSWComponent from "./mocks/MSWComponent";

export const metadata = {
  title: "Moping!",
  description: "모일 때 맵핀, MOPING",
  keywords:
    "모핑, 맵핀, moping, 공유지도, 모임, 네이버 지도, 북마크, 맛집, 카페, 데이트",
  openGraph: {
    title: "Moping!",
    description: "모일 때 맵핀, MOPING",
    url: "https://www.moping.co.kr",
    images: "/thumbnail.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moping!",
    description: "모일 때 맵핀, MOPING",
    images: "/thumbnail.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/ico/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/ico/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/ico/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/ico/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/ico/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/ico/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/ico/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/ico/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/ico/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/ico/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/ico/android-icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/ico/android-icon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/ico/android-icon-72x72.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/ico/android-icon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x36"
          href="/ico/android-icon-36x36.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/ico/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/ico/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/ico/favicon-96x96.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/ico/ms-icon-144x144.png"
        />
        <link rel="manifest" href="./manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ClientStorageHandler />
        {/* MSWComponent 추가: children을 MSW 컴포넌트로 감쌈 */}
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  );
}
