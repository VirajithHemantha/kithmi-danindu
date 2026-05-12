import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Volume2, VolumeX } from "lucide-react";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Kithmi & Danindu
 * Background: White
 * Accents: Gold
 */

const brideGroomImage = "/images/10.png";
const musicFile = "/marindalcrew_a-thousand-years-cristina-perri-mp3 (1).mp3";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw1HIDsc20vUjSNX-qw4aQFE1hZ0yzesswR7oVfZjgkk1FMocgjW6Gvc0agA63XvDrv/exec";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}


function FloatingPetals({ disabled = false }: { disabled?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#D4AF37", "#FFD700", "#F4D699", "#FFFFFF"];
    const petalCount = isMobile ? 10 : 18;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(212,175,55,0.5)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date("June 25, 2026 09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-2xl sm:text-3xl md:text-5xl font-playball text-theme-800 leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const invitationAudioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle Music Auto-play on Open
  useEffect(() => {
    if (isOpened && invitationAudioRef.current) {
      invitationAudioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
      setIsPlaying(true);
    }
  }, [isOpened]);

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (invitationAudioRef.current) {
      if (isPlaying) {
        invitationAudioRef.current.pause();
      } else {
        invitationAudioRef.current.play().catch(err => console.error("Playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // RSVP Form State
  const [rsvpData, setRsvpData] = useState({
    name: "",
    guests: "1",
    notes: ""
  });
  const [isRsvpSubmitting, setIsRsvpSubmitting] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "success" | "error">("idle");

  // Wishing Form State
  const [wishData, setWishData] = useState({
    name: "",
    message: ""
  });
  const [isWishSubmitting, setIsWishSubmitting] = useState(false);
  const [wishStatus, setWishStatus] = useState<"idle" | "success" | "error">("idle");



  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name) return;
    setIsRsvpSubmitting(true);
    setRsvpStatus("idle");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "RSVP",
          name: rsvpData.name,
          guests: rsvpData.guests,
          notes: rsvpData.notes
        }),
      });
      setRsvpStatus("success");
      setRsvpData({ name: "", guests: "1", notes: "" });
    } catch (error) {
      console.error("RSVP error:", error);
      setRsvpStatus("error");
    } finally {
      setIsRsvpSubmitting(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishData.name || !wishData.message) return;
    setIsWishSubmitting(true);
    setWishStatus("idle");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "WISH",
          name: wishData.name,
          message: wishData.message
        }),
      });
      setWishStatus("success");
      setWishData({ name: "", message: "" });
    } catch (error) {
      console.error("Wish error:", error);
      setWishStatus("error");
    } finally {
      setIsWishSubmitting(false);
    }
  };



  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#FFFFFF] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <audio ref={invitationAudioRef} src={musicFile} loop />

      {/* Music Toggle Button */}
      {isOpened && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => toggleMusic()}
          className="fixed bottom-6 right-6 z-[60] bg-white/80 backdrop-blur-md p-4 rounded-full shadow-2xl border border-theme-200 text-theme-800 hover:bg-theme-50 transition-all group"
          aria-label={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
          ) : (
            <VolumeX className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
        </motion.button>
      )}


      <FloatingPetals disabled={isLowPerformanceMode} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="flex flex-col items-center justify-center p-6 relative z-10 w-full"
          >
            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <span className="inline-block px-5 py-2 rounded-full bg-theme-50 border border-theme-200 text-[10px] uppercase tracking-[0.5em] text-theme-700 font-bold mb-6">
                Save the Date
              </span>
              <h1 className="font-cinzel text-4xl md:text-5xl bg-gradient-to-br from-gold via-theme-400 to-theme-700 bg-clip-text text-transparent mb-4 tracking-tight font-bold drop-shadow-sm">
                Kithmi & Danindu
              </h1>
              <p className="text-gold text-sm tracking-[0.4em] font-bold">JUNE 25, 2026</p>
            </motion.div>

            {/* Gatefold Envelope */}
            <div
              className="relative w-full max-w-[430px] aspect-[1/1.42] flex items-center justify-center group cursor-pointer perspective-1000"
              onClick={() => setIsOpened(true)}
            >
              <div className="absolute -inset-8 bg-[radial-gradient(circle,_rgba(212,175,55,0.25)_0%,_rgba(255,253,245,0.2)_45%,_transparent_75%)] blur-3xl opacity-90" />
              <div className="absolute inset-0 rounded-[1.4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] border border-gold/30 overflow-hidden">
                <InviteImage src="/en.jpeg" className="w-full h-full object-cover opacity-90" alt="" />
                <div className="absolute inset-0 opacity-[0.05] paper-grain-strong mix-blend-multiply" />
              </div>

              {/* Premium Multi-Layered Borders */}
              <div className="absolute inset-[10px] rounded-[1.1rem] border-[1.5px] border-gold/40 pointer-events-none z-20" />
              <div className="absolute inset-[14px] rounded-[0.95rem] border-[0.5px] border-gold/20 pointer-events-none z-20" />
              <div className="absolute inset-[18px] rounded-[0.85rem] border-[0.5px] border-gold/10 pointer-events-none z-20" />

              {/* Elegant Corner Flourishes */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/60 rounded-tl-lg z-20 opacity-80" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold/60 rounded-tr-lg z-20 opacity-80" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold/60 rounded-bl-lg z-20 opacity-80" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/60 rounded-br-lg z-20 opacity-80" />

              {/* Small Decorative Dots in Corners */}
              <div className="absolute top-[18px] left-[18px] w-1.5 h-1.5 bg-gold/50 rounded-full z-20" />
              <div className="absolute top-[18px] right-[18px] w-1.5 h-1.5 bg-gold/50 rounded-full z-20" />
              <div className="absolute bottom-[18px] left-[18px] w-1.5 h-1.5 bg-gold/50 rounded-full z-20" />
              <div className="absolute bottom-[18px] right-[18px] w-1.5 h-1.5 bg-gold/50 rounded-full z-20" />

              <motion.div
                initial={{ opacity: 0.15, x: -140 }}
                animate={{ opacity: [0.08, 0.2, 0.08], x: [-160, 260, -160] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-lg z-20 pointer-events-none"
              />

              <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-[88%] h-[44%] bg-gradient-to-b from-theme-100/90 to-theme-50/60 clip-path-envelope z-10" />
              <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[84%] h-[39%] border border-theme-300/45 clip-path-envelope z-10 opacity-60" />

              {/* Left Flap */}
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 z-30 shadow-[8px_0_28px_rgba(153,101,21,0.25)] origin-left flex items-center justify-end overflow-hidden rounded-l-[1.2rem]"
                whileHover={{ rotateY: -14 }}
                transition={{ type: "spring", stiffness: 110, damping: 16 }}
              >
                <div className="absolute inset-y-0 left-0 w-[200%]">
                  <InviteImage src="/en.jpeg" className="w-full h-full object-cover opacity-90" alt="" />
                  <div className="absolute inset-0 opacity-[0.05] paper-grain-strong mix-blend-multiply" />
                </div>
                {/* Flap Borders */}
                <div className="absolute inset-[8px] border-[1.5px] border-gold/40 rounded-l-[1rem] pointer-events-none" />
                <div className="absolute inset-[12px] border-[0.5px] border-gold/20 rounded-l-[0.8rem] pointer-events-none" />
                
                {/* Left Side Flourishes */}
                <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gold/60 rounded-tl-lg pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-gold/60 rounded-bl-lg pointer-events-none" />
                
                <div className="absolute inset-0 border-[0.5px] border-gold/30 rounded-l-[1.2rem] pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-theme-200 via-theme-400 to-theme-200 opacity-20" />
              </motion.div>

              {/* Right Flap */}
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 z-30 shadow-[-8px_0_28px_rgba(153,101,21,0.25)] origin-right flex items-center justify-start overflow-hidden rounded-r-[1.2rem]"
                whileHover={{ rotateY: 14 }}
                transition={{ type: "spring", stiffness: 110, damping: 16 }}
              >
                <div className="absolute inset-y-0 right-0 w-[200%]">
                  <InviteImage src="/en.jpeg" className="w-full h-full object-cover opacity-90" alt="" />
                  <div className="absolute inset-0 opacity-[0.05] paper-grain-strong mix-blend-multiply" />
                </div>
                {/* Flap Borders */}
                <div className="absolute inset-[8px] border-[1.5px] border-gold/40 rounded-r-[1rem] pointer-events-none" />
                <div className="absolute inset-[12px] border-[0.5px] border-gold/20 rounded-r-[0.8rem] pointer-events-none" />
                
                {/* Right Side Flourishes */}
                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold/60 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gold/60 rounded-br-lg pointer-events-none" />
                
                <div className="absolute inset-0 border-[0.5px] border-gold/30 rounded-r-[1.2rem] pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-theme-200 via-theme-400 to-theme-200 opacity-20" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Controls */}
            <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setIsOpened(false)}
                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => toggleMusic()}
                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
              >
                {!isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
            </div>

            {/* Hero Section */}
            <section className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-[#FFFFFF]">
              {/* Full Hero Background Image */}
              <div className="absolute inset-0 z-0">
                <InviteImage 
                  src="/bo.png" 
                  className="w-full h-full object-contain" 
                  alt="Hero Background" 
                />
              </div>

              {/* Background texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain z-10 pointer-events-none" />

              {/* Text Overlay */}
              <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <span className="block text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-theme-700 font-bold mb-4 bg-white/60 backdrop-blur-sm px-4 py-1 rounded-full">
                    Please join us
                  </span>

                  <div className="space-y-2 py-4">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="font-playball text-[4rem] sm:text-[5rem] md:text-[7rem] bg-gradient-to-br from-gold via-theme-500 to-theme-800 bg-clip-text text-transparent leading-[1.4] drop-shadow-sm font-bold px-4 pb-2"
                    >
                      Kithmi
                    </motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="font-playball text-4xl md:text-6xl text-gold italic font-light tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]"
                    >
                      &
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0, duration: 0.8 }}
                      className="font-playball text-[4rem] sm:text-[5rem] md:text-[7rem] bg-gradient-to-br from-gold via-theme-500 to-theme-800 bg-clip-text text-transparent leading-[1.4] drop-shadow-sm font-bold px-4 pb-2"
                    >
                      Danindu
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="mt-8 flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-4 opacity-70 w-full max-w-[200px]">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-theme-300 to-theme-400" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                      <div className="h-px w-full bg-gradient-to-l from-transparent via-theme-300 to-theme-400" />
                    </div>
                    <div className="font-cinzel space-y-1 bg-white/40 backdrop-blur-sm px-6 py-2 rounded-lg">
                      <p className="text-base md:text-xl text-stone-700 tracking-[0.2em] md:tracking-[0.3em] font-bold whitespace-nowrap">25 JUNE 2026</p>
                      <p className="text-[9px] md:text-[11px] text-theme-600 tracking-[0.2em] uppercase font-bold">Avissawella, Sri Lanka</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
              >
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-400 font-bold group-hover:text-theme-600 transition-colors">Begin</span>
                <div className="w-px h-10 md:h-12 relative overflow-hidden bg-stone-200">
                  <motion.div
                    animate={{ y: [-40, 60] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-8 bg-theme-500"
                  />
                </div>
              </motion.div>

            </section>

            {/* Wedding Details Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative">


              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-gold mb-6 md:mb-10" />
                  <p className="text-stone-800 text-[9px] md:text-[12px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-center leading-loose">
                    Request the honour of your presence<br />TO CELEBRATE THE MARRIAGE OF THEIR CHILDREN
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative mb-10 md:mb-14"
                >
                  <div className="relative bg-white/90 p-2.5 md:p-3 rounded-[2rem] border border-theme-200 shadow-[0_20px_50px_-20px_rgba(212,175,55,0.35)]">
                    <InviteImage
                      src={brideGroomImage}
                      alt="Bride and groom wedding illustration"
                      loading="eager"
                      className="w-[200px] h-[240px] md:w-[270px] md:h-[320px] object-cover rounded-[1.6rem] border border-theme-100"
                    />
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Nimmi's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Loving daughter of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. Kithsiri Maldeniya<br />& Mrs. Priyanka Dias</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Kithmi</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-500 to-theme-700 rounded-full flex items-center justify-center shadow-xl shadow-theme-900/20 border-4 border-[#FFFFFF]"
                    >
                      <span className="text-3xl md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Rishan's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Loving son of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. Indika Sarathchandra<br />& Mrs. D.V. Geethanjali Dammika</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Danindu</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-10 mt-4 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 text-center w-full max-w-5xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Date</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">THURSDAY, 25 JUNE</p>
                      <p className="font-cinzel text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">2026</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Time</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">09:00 AM</p>
                      <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">Poruwa Ceremony</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Time</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">04:00 PM</p>
                      <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">Conclusion</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#FFFFFF] relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden">
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    Forever
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                    <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>

                  <h2 className="font-cinzel text-3xl md:text-5xl text-theme-900 mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    Wait for the <span className="font-playball text-theme-700 italic lowercase tracking-normal text-4xl md:text-7xl ml-2">magic</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#FFFFFF] relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-px bg-theme-400" />
                        <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Ceremonies</span>
                      </div>
                      <h2 className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        Venues & Times
                      </h2>
                    </div>

                    <div className="space-y-10 w-full">
                      {/* Location 1: Church */}
                      <div className="relative pl-10 border-l border-theme-200">
                        <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-theme-50 text-[10px] font-bold text-theme-700 border border-theme-100 uppercase tracking-widest">09:00 AM</span>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Poruwa Ceremony</span>
                          </div>
                          <h3 className="font-cinzel text-xl md:text-2xl text-stone-800 font-bold tracking-wide">Seethawaka Regency<br /><span className="text-lg md:text-xl text-theme-600 font-normal">(Grand Ballroom)</span></h3>
                          <p className="text-stone-500 text-sm md:text-base font-light tracking-wide">No:-295, Avissawella Road, Avissawella.</p>
                        </div>
                      </div>

                      {/* Location 2: Grandeeza */}
                      <div className="relative pl-10 border-l border-theme-200">
                        <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-theme-800 shadow-sm flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-stone-100 text-[10px] font-bold text-stone-700 border border-stone-200 uppercase tracking-widest">04:00 PM</span>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Conclusion</span>
                          </div>
                          <h3 className="font-cinzel text-xl md:text-2xl text-stone-800 font-bold tracking-wide">Seethawaka Regency<br /><span className="text-lg md:text-xl text-theme-600 font-normal">(Grand Ballroom)</span></h3>
                          <p className="text-stone-500 text-sm md:text-base font-light tracking-wide">Avissawella.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 w-full md:w-auto flex flex-wrap gap-4">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/5nYoiJnnoqU8wQhx8', '_blank')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-4 bg-theme-800 text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-theme-900 transition-all group"
                      >
                        <MapPin className="w-4 h-4" />
                        Seethawaka Regency Map
                      </button>

                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Seethawaka%20Regency,%20No:-295,%20Avissawella%20Road,%20Avissawella&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Custom Red Highlight Marker */}
                    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500/20 rounded-full animate-ping" />
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-lg border-2 border-white" />
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                        View Venue Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#1A1A1A] text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background */}
              <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-800 blur-[150px] rounded-full opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-900 blur-[150px] rounded-full opacity-40 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-theme-300 font-bold mb-6">Will You Join Us?</p>
                  <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-white mb-6 drop-shadow-md">RSVP</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-white" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-300" />
                  </div>
                  <p className="text-stone-300 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-16 tracking-wide font-light">
                    We would be absolutely thrilled to celebrate with you. Kindly respond by July.
                  </p>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <form className="space-y-8 text-left" onSubmit={handleRsvpSubmit}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={rsvpData.name}
                          onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                          placeholder="John & Jane Doe"
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Guests</label>
                        <div className="relative">
                          <select
                            value={rsvpData.guests}
                            onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide appearance-none cursor-pointer"
                          >
                            <option value="1" className="bg-[#2c2a26] text-white">1 Guest (Just Me)</option>
                            <option value="2" className="bg-[#2c2a26] text-white">2 Guests</option>
                            <option value="3" className="bg-[#2c2a26] text-white">3 Guests</option>
                            <option value="4" className="bg-[#2c2a26] text-white">4 Guests</option>
                            <option value="0" className="bg-[#2c2a26] text-theme-300">Regretfully Decline</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r border-b border-theme-300 rotate-45 transform -translate-y-[25%]" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Dietary Notes</label>
                        <input
                          type="text"
                          value={rsvpData.notes}
                          onChange={(e) => setRsvpData({ ...rsvpData, notes: e.target.value })}
                          placeholder="Allergies, Vegan, etc."
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="pt-10">
                        <button
                          disabled={isRsvpSubmitting}
                          className="w-full bg-theme-200 text-stone-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 group inline-flex justify-center items-center gap-4 disabled:opacity-50"
                        >
                          {isRsvpSubmitting ? (
                            <span className="animate-pulse">Sending...</span>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                              Send RSVP
                              <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                            </>
                          )}
                        </button>
                        {rsvpStatus === "success" && (
                          <p className="mt-4 text-theme-200 text-xs font-bold text-center animate-bounce">Thank you! RSVP Sent Successfully.</p>
                        )}
                        {rsvpStatus === "error" && (
                          <p className="mt-4 text-red-400 text-xs font-bold text-center">Something went wrong. Please try again.</p>
                        )}
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-[#FFFFFF]">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="mt-12 md:mt-24 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[22vw] md:text-[220px] text-theme-100/40 whitespace-nowrap pointer-events-none z-0 select-none">
                        Thank You
                      </div>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-theme-600 font-bold relative z-10 bg-[#FFFFFF] px-6 py-2 rounded-full border border-theme-100/50 shadow-sm">With Love</p>
                      <h3 className="font-playball text-[3.2rem] sm:text-6xl md:text-8xl text-theme-900 relative z-10 drop-shadow-sm px-4 pt-4 leading-none">Kithmi & Danindu</h3>

                      <div className="relative z-10 mt-12 space-y-2 text-stone-500 font-bold tracking-widest text-[10px] md:text-xs">
                        <p>DANINDU: 0703516513</p>
                        <p>KITHMI: 0742188800</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-12 border-t border-theme-200/30 text-center relative z-10 space-y-3">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                  © 2026 Kithmi & Danindu. <span className="hidden md:inline">|</span><br className="md:hidden block mt-2" /> All rights reserved.
                </p>
                <p className="text-[8px] md:text-[10px] tracking-[0.3em] text-stone-400">
                  Design by <a href="https://wa.me/94707819074" target="_blank" rel="noopener noreferrer" className="text-theme-600 font-bold hover:text-theme-800 transition-colors">InviteMint</a>
                </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FFFFFF;
        }
        ::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 10px;
        }
      `}} />
    </main >
  );
}
