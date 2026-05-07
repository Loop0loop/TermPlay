const latestReleaseApiUrl = "https://api.github.com/repos/ummsehun/termplay/releases/latest";
const releaseListApiUrl = "https://api.github.com/repos/ummsehun/termplay/releases?per_page=1";
const latestDownloadBaseUrl = "https://github.com/ummsehun/termplay/releases/latest/download";

type Platform = "windows" | "mac" | "linux" | "unknown";

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  assets: GitHubReleaseAsset[];
}

export interface ReleaseDownload {
  name: string;
  url: string;
  version: string;
  platform: Platform;
  size: number;
}



async function fetchGitHubRelease(url: string): Promise<GitHubRelease> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`GitHub release request failed: ${response.status}`);
    }

    const payload = await response.json();
    return Array.isArray(payload) ? payload[0] : payload;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function detectPlatform(): Platform {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  if (userAgent.includes("windows") || platform.includes("win")) return "windows";
  if (userAgent.includes("mac os") || userAgent.includes("macintosh") || platform.includes("mac")) return "mac";
  if (userAgent.includes("linux")) return "linux";

  return "unknown";
}

function getExpectedFilename(platform: Platform, version: string) {
  const v = version.replace(/^v/, "");
  if (platform === "windows") return `TermPlay-${v}-win-x64.exe`;
  if (platform === "mac") return `TermPlay-${v}-mac-arm64.dmg`;
  if (platform === "linux") return `TermPlay-${v}-linux-x86_64.AppImage`;
  return `TermPlay-${v}-win-x64.exe`;
}

function manifestNameForPlatform(platform: Platform) {
  if (platform === "mac") return "latest-mac.yml";
  if (platform === "linux") return "latest-linux.yml";
  return "latest.yml";
}

function parseManifestVersion(manifest: string) {
  const versionMatch = manifest.match(/^version:\s*(.+)$/m);
  if (!versionMatch || !versionMatch[1]) return null;
  return versionMatch[1].trim();
}

async function getManifestDownload(platform: Platform): Promise<ReleaseDownload | null> {
  const manifestName = manifestNameForPlatform(platform);
  const manifestUrl = `${latestDownloadBaseUrl}/${manifestName}`;
  const response = await fetch(manifestUrl);

  if (!response.ok) {
    throw new Error(`GitHub release manifest request failed: ${response.status}`);
  }

  const manifest = await response.text();
  const version = parseManifestVersion(manifest);

  if (!version) return null;

  const expectedName = getExpectedFilename(platform, version);

  return {
    name: expectedName,
    url: `${latestDownloadBaseUrl}/${expectedName}`,
    version,
    platform,
    size: 0,
  };
}

export async function getLatestReleaseDownload(): Promise<ReleaseDownload | null> {
  const platform = detectPlatform();

  let release: GitHubRelease;

  try {
    release = await fetchGitHubRelease(latestReleaseApiUrl);
  } catch {
    try {
      release = await fetchGitHubRelease(releaseListApiUrl);
    } catch {
      return getManifestDownload(platform).catch(() => null);
    }
  }

  const expectedName = getExpectedFilename(platform, release.tag_name);
  const asset = release.assets.find((a) => a.name.toLowerCase() === expectedName.toLowerCase());

  if (asset) {
    return {
      name: asset.name,
      url: asset.browser_download_url,
      version: release.tag_name,
      platform,
      size: asset.size,
    };
  }

  return {
    name: expectedName,
    url: `${latestDownloadBaseUrl}/${expectedName}`,
    version: release.tag_name,
    platform,
    size: 0,
  };
}
