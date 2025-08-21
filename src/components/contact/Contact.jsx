import "./contact.css";
import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import ContactSvg from "./ContactSvg";

const listVariant = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const ref = useRef(null);
  const form = useRef(null);

  // Initialize EmailJS once
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_PUBLIC_KEY);
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setSending(true);

    try {
      const res = await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current
      );
      console.log("✅ EmailJS success:", res.status, res.text);
      setSuccess(true);
      form.current.reset(); // clear inputs after sending
    } catch (err) {
      console.error("❌ EmailJS error:", err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const isInView = useInView(ref, { margin: "-200px" });

  return (
    <div className="contact" ref={ref} id="contact">
      <div className="cSection">
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
        >
          <motion.h1 variants={listVariant} className="cTitle">
            Let's keep in touch
          </motion.h1>

          <motion.div variants={listVariant} className="formItem">
            <label>Name</label>
            <input
              type="text"
              name="user_username"
              placeholder="Enter your name here "
              required
            />
          </motion.div>

          <motion.div variants={listVariant} className="formItem">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email here"
              required
            />
          </motion.div>

          <motion.div variants={listVariant} className="formItem">
            <label>Message</label>
            <textarea
              rows={10}
              name="user_message"
              placeholder="Write your message here..."
              required
            ></textarea>
          </motion.div>

          <motion.button
            variants={listVariant}
            className="formButton"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </motion.button>

          {success && (
            <span style={{ color: "green" }}>Your message has been sent!</span>
          )}
          {error && (
            <span style={{ color: "red" }}>
              ❌ Something went wrong, check console!
            </span>
          )}
        </motion.form>
      </div>

      <div className="cSection">
        <ContactSvg />
      </div>
    </div>
  );
};

export default Contact;
