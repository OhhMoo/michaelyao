interface LiveFrameProps {
  src: string;
  title: string;
  /** Address shown in the chrome's URL pill (defaults to src without protocol) */
  url?: string;
  height?: number;
  showAddress?: boolean;
}

export function LiveFrame({ src, title, url, height, showAddress = true }: LiveFrameProps) {
  const shownUrl = url ?? src.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="rp-livewin">
      {showAddress && (
        <span className="data-panel-tab">
          <span>{shownUrl}</span>
          <span className="data-panel-tab-dot" aria-hidden />
        </span>
      )}
      <div className="rp-livebody">
        <div className="rp-livebar">
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
    </div>
  );
}
