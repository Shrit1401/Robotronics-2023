import React, { useEffect, useRef, useState } from "react";
import ScrollSmoothProvider from "@/hooks/ScrollSmoothProvider";
import { getSectionHeight } from ".";
import { timeline } from "motion";
import { auth } from "@/lib/firebase";
import Moment from "react-moment";

const Profile = () => {
  const countRef = useRef(null);
  const countRef2 = useRef(null);

  const loaderRef = useRef(null);
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
      [navRef.current, { y: -100 }, { opacity: 0 }, { at: "<" }],
      [countRef.current, { opacity: 0 }, { at: "<" }],
      [countRef2.current, { opacity: 0 }, { at: "<" }],
      [loaderRef.current, { y: "-100vh" }, { at: "-0.5" }],
      [navRef.current, { y: 0 }, { opacity: 1 }, { at: "-0.5" }],
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

        <div className="profile-container">
          <h1>Your Railway Profile</h1>

          <div className="cards">
            <div className="pfp">
              <img src={auth.currentUser?.photoURL} alt="" />
            </div>

            <div className="info">
              <h2 style={{ textTransform: "capitalize" }}>
                <span>Name: </span> {auth.currentUser?.displayName}
              </h2>

              <h2>
                <span>Email: </span> {auth.currentUser?.email}
              </h2>

              <h2>
                <span>Created At:</span>{" "}
                <Moment fromNow className="pr-5 text-xs">
                  {auth.currentUser?.metadata.creationTime}
                </Moment>
              </h2>

              <h2>
                <span>Railway ID:</span> {auth.currentUser?.uid}
              </h2>

              <a
                className="btn"
                href="#"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </ScrollSmoothProvider>
  );
};

export default Profile;
