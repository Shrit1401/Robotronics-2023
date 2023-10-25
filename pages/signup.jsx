import ScrollSmoothProvider from "@/hooks/ScrollSmoothProvider";
import { useEffect, useRef, useState } from "react";
import { getSectionHeight } from ".";
import { timeline } from "motion";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { auth, storage } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const Signup = () => {
  const countRef = useRef(null);
  const countRef2 = useRef(null);
  const navRef = useRef(null);
  const formRef = useRef(null);

  const loaderRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const pfpChange = (event) => {
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !selectedFile) {
      alert("Please Fill All Fields");
      return;
    }

    setLoading(true);
    const imageRef = ref(storage, `pfp/${name}`);

    await uploadString(imageRef, selectedFile, "data_url")
      .then(async (snapshot) => {
        console.log("Uploaded a data_url string!");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("An Error Occured");
        return;
      });

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("An Error Occured");
        return;
      });

    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name.toLocaleLowerCase(),
      photoURL: await getDownloadURL(imageRef),
    }).then((user) => {
      console.log(user);
    });

    alert("Account Created Successfully");
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

        <div className="container signup" ref={formRef}>
          <h1>Create An Account</h1>

          <form action="#" className="form">
            <div className="form-control">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter email"
              />
            </div>

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
              <label htmlFor="pfpPick" className="pfp-label">
                {selectedFile ? (
                  <>
                    {" "}
                    <p>change profile picture</p>
                    <img src={selectedFile} alt="pfp" className="pfp-img" />
                  </>
                ) : (
                  <p>Select a profile picture</p>
                )}
              </label>
              <input
                id="pfpPick"
                onChange={pfpChange}
                type="file"
                accept="image/*"
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
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <a href="/login" className="tip">
            <p>Have an Account?</p>
          </a>
        </div>
        <div className="hero-container"></div>
      </div>
    </ScrollSmoothProvider>
  );
};

export default Signup;
