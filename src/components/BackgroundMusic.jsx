import { useRef, useEffect } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  // Initialize audio and attempt autoplay
  useEffect(() => {
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

  return (
    <audio ref={audioRef} loop autoPlay>
      <source src="/bg-music.mp3" type="audio/mpeg" />
      <source src="/bg-music.ogg" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;
