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

const directAssetFallbacks: Record<Platform, string> = {
  windows: `${latestDownloadBaseUrl}/TermPlay-0.2.3-win-x64.exe`,
  mac: `${latestDownloadBaseUrl}/TermPlay-0.2.3-mac-arm64.dmg`,
  linux: `${latestDownloadBaseUrl}/TermPlay-0.2.3-linux-x86_64.AppImage`,
  unknown: `${latestDownloadBaseUrl}/TermPlay-0.2.3-win-x64.exe`,
};

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

  if (userAgent.includes("windows")) return "windows";
  if (userAgent.includes("mac os") || userAgent.includes("macintosh")) return "mac";
  if (userAgent.includes("linux")) return "linux";

  return "unknown";
}

function chooseAsset(assets: GitHubReleaseAsset[], platform: Platform) {
  const downloadable = assets.filter((asset) => {
    const name = asset.name.toLowerCase();
    return !name.endsWith(".yml") && !name.endsWith(".blockmap");
  });

  const candidatesByPlatform: Record<Platform, RegExp[]> = {
    windows: [/win.*\.exe$/],
    mac: [/mac.*\.dmg$/, /mac.*\.zip$/],
    linux: [/linux.*\.appimage$/, /linux.*\.tar\.gz$/],
    unknown: [/win.*\.exe$/, /mac.*\.dmg$/, /linux.*\.appimage$/],
  };

  for (const pattern of candidatesByPlatform[platform]) {
    const asset = downloadable.find((candidate) => pattern.test(candidate.name.toLowerCase()));
    if (asset) return asset;
  }

  return downloadable[0];
}

function manifestNameForPlatform(platform: Platform) {
  if (platform === "mac") return "latest-mac.yml";
  if (platform === "linux") return "latest-linux.yml";
  return "latest.yml";
}

function parseManifestPath(manifest: string) {
  const pathMatch = manifest.match(/^path:\s*(.+)$/m);
  const urlMatch = manifest.match(/^url:\s*(.+)$/m);
  const value = pathMatch?.[1] ?? urlMatch?.[1];

  if (!value) return null;

  return value.trim().replace(/^['"]|['"]$/g, "");
}

async function getManifestDownload(platform: Platform): Promise<ReleaseDownload | null> {
  const manifestName = manifestNameForPlatform(platform);
  const manifestUrl = `${latestDownloadBaseUrl}/${manifestName}`;
  const response = await fetch(manifestUrl);

  if (!response.ok) {
    throw new Error(`GitHub release manifest request failed: ${response.status}`);
  }

  const manifest = await response.text();
  const assetPath = parseManifestPath(manifest);

  if (!assetPath) return null;

  const name = assetPath.split("/").pop() ?? assetPath;

  return {
    name,
    url: assetPath.startsWith("http") ? assetPath : `${latestDownloadBaseUrl}/${encodeURIComponent(assetPath)}`,
    version: "latest",
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
      return getManifestDownload(platform).catch(() => ({
        name: directAssetFallbacks[platform].split("/").pop() ?? "TermPlay",
        url: directAssetFallbacks[platform],
        version: "latest",
        platform,
        size: 0,
      }));
    }
  }

  const asset = chooseAsset(release.assets, platform);

  if (!asset) {
    return getManifestDownload(platform);
  }

  return {
    name: asset.name,
    url: asset.browser_download_url,
    version: release.tag_name,
    platform,
    size: asset.size,
  };
}
