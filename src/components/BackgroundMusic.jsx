import { useRef, useEffect, useState } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    // Detect mobile - disable audio on mobile for performance
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(mobile);

    if (mobile || !audioRef.current) return; // Skip audio on mobile

    if (audioRef.current) {
      // Set volume to 30%
      audioRef.current.volume = 0.3;

      // Try to play immediately (may be blocked by browser)
      const attemptAutoplay = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          // Autoplay was prevented - will try on user interaction
          console.log("Autoplay prevented, waiting for user interaction");
        }
      };

      // Try autoplay when audio is loaded
      audioRef.current.addEventListener("loadeddata", attemptAutoplay);
      attemptAutoplay();

      // Also try on first user interaction (most reliable)
      const handleFirstInteraction = async () => {
        if (audioRef.current) {
          try {
            await audioRef.current.play();
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        }
      };

      // Listen for first user interaction
      document.addEventListener("click", handleFirstInteraction, {
        once: true,
      });
      document.addEventListener("keydown", handleFirstInteraction, {
        once: true,
      });
      document.addEventListener("touchstart", handleFirstInteraction, {
        once: true,
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("loadeddata", attemptAutoplay);
        }
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("keydown", handleFirstInteraction);
        document.removeEventListener("touchstart", handleFirstInteraction);
      };
    }
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
};

export default BackgroundMusic;
