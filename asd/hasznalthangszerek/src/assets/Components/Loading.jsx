import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div id="loadingContainer">
      <DotLottieReact
        src="https://lottie.host/03fddf80-8979-4b6d-8214-86dbc1bc8c31/KNIZggjd2c.lottie"
        loop
        autoplay
        style={{ width: 320, height: "auto" }}
      />
    </div>
  );
}
