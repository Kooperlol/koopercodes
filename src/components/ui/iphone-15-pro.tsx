import { SVGProps, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export interface Iphone15ProProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  videoSrc?: string;
}

export default function Iphone15Pro({
  width = 433,
  height = 882,
  videoSrc,
  ...props
}: Iphone15ProProps) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
        className="fill-[#262626]"
      />
      <path
        d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
        className="fill-[#262626]"
      />
      <path
        d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
        className="fill-[#262626] stroke-[#404040] stroke-[0.5]"
      />

      {/* Video Embed with Full Coverage */}
      {videoSrc && (
        <foreignObject
          x="21.25"
          y="19.25"
          width="389.5"
          height="843.5"
          clipPath="url(#roundedCorners)"
        >
          <video
            src={videoSrc}
            width="100%"
            height="100%"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "55.75px",
            }}
          />
        </foreignObject>
      )}

      {/* Audio Toggle Icon Button */}
      <foreignObject x="185" y="800" width="50" height="50">
        <button
          onClick={toggleAudio}
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            color: "#FFF",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
      </foreignObject>

      {/* Additional SVG Elements */}
      <path
        d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
        className="fill-[#262626]"
      />
      <defs>
        <clipPath id="roundedCorners">
          <rect
            x="21.25"
            y="19.25"
            width="389.5"
            height="843.5"
            rx="55.75"
            ry="55.75"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
