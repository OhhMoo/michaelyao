interface LiveFrameProps {
  src: string;
  title: string;
  /** Address shown in the chrome's URL pill (defaults to src without protocol) */
  url?: string;
  height?: number;
}

export function LiveFrame({ src, title, url, height }: LiveFrameProps) {
  const shownUrl = url ?? src.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="rp-livewin">
      <div className="rp-livebar">
        <span />
        <span />
        <span />
        <div className="rp-liveurl">{shownUrl}</div>
        <a className="rp-livego" href={src} target="_blank" rel="noreferrer">
          open ↗
        </a>
      </div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={height ? { height } : undefined}
      />
    </div>
  );
}
