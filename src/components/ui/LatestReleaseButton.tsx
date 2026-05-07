import React, { useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { getLatestReleaseDownload, type ReleaseDownload } from "../../lib/releases";
import { useI18n } from "../../lib/i18n";

interface LatestReleaseButtonProps {
  className?: string;
}

function platformLabel(download: ReleaseDownload) {
  if (download.platform === "windows") return "Windows";
  if (download.platform === "mac") return "macOS";
  if (download.platform === "linux") return "Linux";
  return "Release";
}

const baseClassName =
  "inline-flex items-center justify-center gap-3 rounded-full bg-brand-primary px-12 py-4 text-2xl font-black text-brand-primary-foreground transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function LatestReleaseButton({ className = "" }: LatestReleaseButtonProps) {
  const t = useI18n();
  const [download, setDownload] = useState<ReleaseDownload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getLatestReleaseDownload()
      .then((latestDownload) => {
        if (!isMounted) return;
        setDownload(latestDownload);
      })
      .catch(() => {
        if (!isMounted) return;
        setHasError(true);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const label = isLoading
    ? t.hero.ctaLoading
    : download
      ? `${platformLabel(download)} ${t.hero.cta}`
      : t.hero.ctaUnavailable;
  const buttonLabel = hasError ? t.hero.ctaRetry : label;

  const startDownload = async () => {
    setHasError(false);

    try {
      const latestDownload = download ?? await getLatestReleaseDownload();

      if (!latestDownload) {
        setHasError(true);
        return;
      }

      setDownload(latestDownload);
      window.location.assign(latestDownload.url);
    } catch {
      setHasError(true);
    }
  };

  if (download && !hasError && !isLoading) {
    return (
      <a
        href={download.url}
        className={`${baseClassName} cursor-pointer ${className}`}
        aria-label={label}
        title={download.name}
      >
        <Download size={22} />
        <span>{buttonLabel}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={startDownload}
      disabled={isLoading}
      className={`${baseClassName} ${isLoading ? "cursor-wait opacity-80" : "cursor-pointer"} disabled:hover:brightness-100 ${className}`}
      aria-label={hasError ? t.hero.ctaRetry : label}
      title={download?.name ?? t.hero.cta}
    >
      {isLoading ? <Loader2 className="animate-spin" size={22} /> : <Download size={22} />}
      <span>{buttonLabel}</span>
    </button>
  );
}
