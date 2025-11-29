import { useRef, useEffect, useState, memo } from "react";

const BackgroundMusic = memo(() => {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Set volume to 30%
    audio.volume = 0.3;

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
      audio.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <audio ref={audioRef} loop autoPlay preload="auto" playsInline>
      <source src="/bg-music.mp3" type="audio/mpeg" />
      <source src="/bg-music.ogg" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
