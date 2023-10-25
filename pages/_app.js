import "@/styles/globals.scss";
import "locomotive-scroll/src/locomotive-scroll.scss";
import AnimatedCursor from "react-animated-cursor";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "white",
        }}
        outerStyle={{
          border: "3px solid white",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
