import { useRef, useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";

const BackgroundMusic = memo(() => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Set volume to 30%
    audio.volume = 0.3;

    // Sync state with actual audio status
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const tryPlay = async () => {
      if (!audio || !audio.paused) return;
      try {
        await audio.play();
      } catch (error) {
        console.log(
          "Autoplay prevented, will retry on interaction/visibility",
          error
        );
      }
    };

    // Try to play immediately (may work on desktop if user has allowed sound)
    tryPlay();

    // Try again when enough data is loaded
    audio.addEventListener("loadeddata", tryPlay, { once: true });

    // Also try on first user interaction (most reliable)
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      tryPlay();
    };

    document.addEventListener("click", handleFirstInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("keydown", handleFirstInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
      passive: true,
    });

    // Try when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <>
      <audio ref={audioRef} loop autoPlay preload="auto" playsInline>
        <source src="/bg-music.mp3" type="audio/mpeg" />
        <source src="/bg-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <motion.button
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-black/80 text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)] backdrop-blur-md transition-all hover:border-red-500 hover:bg-red-950/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] group"
      >
        {/* Animated ring pulse */}
        <div className="absolute inset-0 rounded-full border border-red-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />

        {/* Orbiting particle */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-t border-red-500/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaPause className="text-xl" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaPlay className="text-xl ml-1" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music notes animation when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -40,
                    x: (i - 1) * 15,
                    scale: 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                  className="absolute -top-2 text-red-400 pointer-events-none"
                >
                  <FaMusic size={12} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
