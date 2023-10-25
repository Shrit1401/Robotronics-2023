import Features from "@/components/Features";
import ScrollSmoothProvider from "@/hooks/ScrollSmoothProvider";
import { auth } from "@/lib/firebase";
import { timeline } from "motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function getSectionHeight(element) {
  const { height } = element.getBoundingClientRect();
  const { childElementCount } = element;

  return height / childElementCount;
}

export default function Home() {
  const countRef = useRef(null);
  const countRef2 = useRef(null);

  const loaderRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const navRef = useRef(null);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!countRef.current && !countRef2.current) return;
    const transformAmount = getSectionHeight(countRef.current);

    const sequence = new Array(3).fill("").flatMap((_, index) => [
      [countRef.current, { y: `-${transformAmount * (index + 1)}px` }],
      [
        countRef2.current,
        { y: `-${transformAmount * (index + 1)}px` },
        { at: "-.5" },
      ],
    ]);

    timeline(sequence, {
      defaultOptions: { duration: 2, easing: [0.77, 0, 0.175, 1] },
    });
  }, [countRef.current, countRef2.current]);

  useEffect(() => {
    const sequence2 = [
      [titleRef.current, { y: 100 }],
      [imageRef.current, { scale: 1.2 }, { at: "<" }],
      [navRef.current, { y: -200 }, { opacity: 0 }, { at: "<" }],
      [countRef.current, { opacity: 0 }, { at: "<" }],
      [countRef2.current, { opacity: 0 }, { at: "<" }],
      [loaderRef.current, { y: "-700vh" }, { at: "-0.1" }],
      [navRef.current, { y: 0 }, { opacity: 1 }, { at: "-0.1" }],
      [titleRef.current, { y: 0 }, { at: "-.1" }],
      [imageRef.current, { scale: 1 }, { at: "<" }],
      // [loaderRef.current, { y: "-700vh" }, { at: "-0.1" }],
    ];

    timeline(sequence2, {
      defaultOptions: { easing: [0.77, 0, 0.175, 1], duration: 1, delay: 7 },
    });
  }, []);

  return (
    <ScrollSmoothProvider options={{ smooth: true }}>
      <div className="loader-container" ref={loaderRef}>
        <div className="counter-container">
          <ul className="counter-list" ref={countRef}>
            <li>
              <h3>2</h3>
            </li>
            <li>
              <h3>4</h3>
            </li>
            <li>
              <h3>6</h3>
            </li>
            <li>
              <h3>9</h3>
            </li>
          </ul>
        </div>

        <div className="counter-container">
          <ul className="counter-list" ref={countRef2}>
            <li>
              <h3>2</h3>
            </li>
            <li>
              <h3>3</h3>
            </li>
            <li>
              <h3>9</h3>
            </li>
            <li>
              <h3>7</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-container" id="main-container" data-scroll-container>
        <nav ref={navRef}>
          <a href="/">
            <img src="https://i.postimg.cc/Hsw-6sCTV/1B1649.png" alt="" />
          </a>
          <ul>
            <li>
              <a className="" href="/">
                Home
              </a>
            </li>
            {!isLogin ? (
              <li>
                <a className="active" href="/login">
                  Login
                </a>
              </li>
            ) : (
              <li>
                <a className="active" href="/profile">
                  Profile
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="hero-container">
          <div data-scroll data-scroll-speed="-8" className="hero-image">
            <img
              data-scroll
              ref={imageRef}
              className="grid-item-media"
              src="https://e0.pxfuel.com/wallpapers/913/242/desktop-wallpaper-background-train-station-in-japan-tip-train-aesthetic.jpg"
            />
          </div>
          <div className="hero-title">
            <h1 data-scroll data-scoll-speed="-5" ref={titleRef}>
              Metro Magnets
            </h1>
          </div>
        </div>

        <div className="main">
          <div className="moving-heading">Your Journey Our Priority</div>
          <div className="intro-container" data-scroll data-scroll-speed="0">
            <h1>About The CEO</h1>
            <p>
              Meet Sheldon Cooper, a remarkable scientist and politician.
              Exciting news: He has just been named the Chairman and CEO of the
              Metro Magnet Board! This appointment truly acknowledges his deep
              love for trains and his tireless dedication to being the best.
              Believe it or not, Cooper's childhood dream of working with trains
              has come true! Now, he is all set to lead the Metro Magnet towards
              an era of incredible innovation and great success. He in future
              plans to make the Metro Magnet the best in the world.
            </p>
          </div>

          <div className="intro-container" data-scroll data-scroll-speed="0">
            <h1>Features</h1>
            <div className="features">
              <Features
                title="Attractions Directory"
                desc="All tourist attractions and viewpoints can be conveniently seen from one spot, making it effortless for visitors."
                style={{ minWidth: "700px" }}
                img="https://i.postimg.cc/XYb4kwz1/images-removebg-preview.png"
              />

              <Features
                title="Kavach"
                desc="Kavach a developed ATP system by Indian Railways. It is the cheapest ATP system in the world, costing 50 lakh per km.It will be implemented by 2027-2028."
                img="https://svgsilh.com/svg_v2/308793.svg"
                style={{
                  filter: "invert(1) brightness(0.5)",
                }}
              />

              <Features
                title="Crowdsource Feedback"
                desc="Your feedback is not only limited to yourself but extends to everyone. Every individual's reaction matters, and the more we receive, the more we will address the issue at hand."
                img="https://uploads-ssl.webflow.com/6359140b3878a7a73023f955/636e80525753ff4938dc3f7b_%D0%A1h-3.webp"
                // style to be inverted
                style={{
                  filter: " brightness(0.5)",
                }}
              />

              <Features
                title="E-Pulley"
                desc="
                  We've made sure that everyone can now use our app to
                  safely operate their devices by seamlessly integrating the
                  functionality of the pulley. 📱🔒
                "
                img="https://i.postimg.cc/fbrtJtgW/download-removebg-preview.png"
                style={{
                  filter: "invert(1) brightness(0.5)",
                }}
              />
            </div>
          </div>

          <footer>
            <h3>TEAM AISV 1</h3>

            <div className="footer-right">
              <img
                src="https://i.postimg.cc/W3cbhwN0/635a850d3d7a3131c8d5d147-Footer-Bg-pattern-removebg-preview.png"
                alt=""
                className="footer-bg"
              />
              <h3>
                Website Made By <b>Penny Hofstadter</b>
              </h3>
            </div>
          </footer>
        </div>
      </div>
    </ScrollSmoothProvider>
  );
}
