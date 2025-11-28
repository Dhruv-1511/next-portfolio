import { useRef, useEffect, useState, memo } from "react";

const BackgroundMusic = memo(() => {
  const audioRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const interactionHandlersRef = useRef(null);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    // Detect mobile - disable audio on mobile for performance
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(mobile);

    if (mobile || !audioRef.current) return; // Skip audio on mobile

    const audio = audioRef.current;

    // Set volume to 30%
    audio.volume = 0.3;

    // Try to play immediately (may be blocked by browser)
    const attemptAutoplay = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Autoplay was prevented - will try on user interaction
        console.log("Autoplay prevented, waiting for user interaction");
      }
    };

    // Also try on first user interaction (most reliable)
    const handleFirstInteraction = async () => {
      if (audio && audio.paused) {
        try {
          await audio.play();
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    };

    // Store handlers in ref to avoid recreating them
    interactionHandlersRef.current = handleFirstInteraction;

    // Try autoplay when audio is loaded
    audio.addEventListener("loadeddata", attemptAutoplay, { once: true });

    // Listen for first user interaction with passive listeners
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

    return () => {
      audio.removeEventListener("loadeddata", attemptAutoplay);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  // Don't render audio on mobile for performance
  if (isMobile) {
    return null;
  }

  return (
    <audio ref={audioRef} loop autoPlay preload="none">
      <source src="/bg-music.mp3" type="audio/mpeg" />
      <source src="/bg-music.ogg" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
