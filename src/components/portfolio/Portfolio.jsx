import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.png",
    title: "Vision X (Complete Protection Surveillance System)",
    desc: "Complete Protection Surveillance System is an advanced security solution designed to ensure total protection against unauthorized access, theft, and vandalism. It integrates smart monitoring, real-time alerts, and access control to enhance safety and reduce reliance on manual surveillance. With mobile and desktop applications, it offers a seamless and efficient way to safeguard residential, commercial, and industrial spaces.",
    link: "https://www.linkedin.com/posts/therealsaif_finalyearproject-surveillancesystem-visionx-activity-7363443761542029313-0NBk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADqWvTABGpZB-tJRPwDGTnxI06orOOlBoTo",
  },
  {
    id: 2,
    img: "/p2.jpg",
    title: "Customizable E-Commerce App",
    desc: "Customizable E-Commerce App is a dynamic React-based solution designed to provide businesses with a tailored online shopping platform. It features product management, secure transactions, and user-friendly navigation to enhance customer experience. With scalability and flexibility, it empowers businesses to build and grow their digital stores efficiently.",
    link: "/",
  },
  {
    id: 3,
    img: "/p3.jpg",
    title: "Movie Recommendation App",
    desc: "Movie Recommendation App is a smart Python-powered solution with a user-friendly frontend, designed to deliver personalized film suggestions. It leverages machine learning models to analyze user behavior and generate accurate recommendations. With an interactive interface and scalable design, it makes discovering and enjoying movies seamless and engaging.",
    link: "/",
  },
  {
    id: 4,
    img: "/p4.jpg",
    title: "Electronics Store App",
    desc: "Electronics Store App is a modern Flutter-based application integrated with Firebase to deliver a seamless shopping experience. It leverages trained models for personalized recommendations, secure transactions, and efficient product management. With an intuitive interface and real-time database support, it empowers users to explore, purchase, and manage electronics effortlessly.",
    link: "/",
  },
  {
    id: 5,
    img: "/p5.jpg",
    title: "Animated Portfolio Website",
    desc: "Animated Portfolio Website is a creative React-based platform designed to showcase skills, projects, and experiences with engaging animations. It features smooth transitions, interactive components, and responsive design to deliver a modern user experience. With its customizable and scalable structure, it helps professionals present their work in a visually appealing and impactful way.",
    link: "/",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
