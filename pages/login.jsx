import ScrollSmoothProvider from "@/hooks/ScrollSmoothProvider";
import React, { useEffect, useRef, useState } from "react";
import { getSectionHeight } from ".";
import { timeline } from "motion";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const countRef = useRef(null);
  const countRef2 = useRef(null);
  const navRef = useRef(null);
  const formRef = useRef(null);

  const loaderRef = useRef(null);

  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
      [formRef.current, { scale: 1.2 }, { at: "<" }],
      [navRef.current, { y: -100 }, { opacity: 0 }, { at: "<" }],
      [countRef.current, { opacity: 0 }, { at: "<" }],
      [countRef2.current, { opacity: 0 }, { at: "<" }],
      [loaderRef.current, { y: "-100vh" }, { at: "-0.5" }],
      [navRef.current, { y: 0 }, { opacity: 1 }, { at: "-0.5" }],
      [formRef.current, { scale: 1 }, { at: "<" }],
    ];

    timeline(sequence2, {
      defaultOptions: { easing: [0.77, 0, 0.175, 1], duration: 1, delay: 7 },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please Fill the details");
      return;
    }
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);

        alert("Error Occured");
        setLoading(false);
        return;
      });

    alert("Logged In Successfully");
    setLoading(false);
  };
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

        <div className="container" ref={formRef}>
          <h1>Login</h1>

          <form action="#" className="form">
            <div className="form-control">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <a href="/signup" className="tip">
            <p>Don't have an account?</p>
          </a>
        </div>
        <div className="hero-container"></div>
      </div>
    </ScrollSmoothProvider>
  );
};

export default Login;
