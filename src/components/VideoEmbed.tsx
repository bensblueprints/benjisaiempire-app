// Server component — wraps YouTube / Vimeo / Mux URLs in a 16:9 responsive iframe.
// Falls back to a plain <video> element for unrecognized URLs.

type Provider = "youtube" | "vimeo" | "mux" | "file";

function detect(url: string): { provider: Provider; embed: string } {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    // YouTube
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return { provider: "youtube", embed: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` };
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const id =
        u.searchParams.get("v") ||
        u.pathname.split("/").filter(Boolean).pop() ||
        "";
      return {
        provider: "youtube",
        embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
      };
    }

    // Vimeo
    if (host.endsWith("vimeo.com")) {
      const segments = u.pathname.split("/").filter(Boolean);
      const id = segments[segments.length - 1];
      return { provider: "vimeo", embed: `https://player.vimeo.com/video/${id}` };
    }
    if (host.endsWith("player.vimeo.com")) {
      return { provider: "vimeo", embed: url };
    }

    // Mux
    if (host.endsWith("stream.mux.com") || host.endsWith("mux.com")) {
      // mux playback url — embed via mux-player would be best, but iframe an HLS player URL
      return { provider: "mux", embed: url };
    }
  } catch {
    // not a URL — fall through
  }
  return { provider: "file", embed: url };
}

export default function VideoEmbed({ videoUrl }: { videoUrl: string }) {
  if (!videoUrl) return null;
  const { provider, embed } = detect(videoUrl);

  const wrapStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    background: "var(--ink-2)",
    border: "1px solid var(--line)",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 0 0 1px rgba(212,175,55,0.18) inset",
  };

  const innerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
  };

  if (provider === "file") {
    return (
      <div style={wrapStyle}>
        <video
          style={innerStyle}
          src={embed}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <iframe
        style={innerStyle}
        src={embed}
        title="Lesson video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
