import { useCallback } from 'react';

export const useFeedbackSound = () => {
  const playSuccessSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Success sound: ascending notes
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    const duration = 0.15;
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + (index * duration);
      
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
    
    // Cleanup
    setTimeout(() => audioContext.close(), 1000);
  }, []);

  const playErrorSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Error sound: descending dissonant notes
    const frequencies = [400, 300]; // Dissonant descending
    const duration = 0.2;
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'square';
      
      const startTime = audioContext.currentTime + (index * duration);
      
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
    
    // Cleanup
    setTimeout(() => audioContext.close(), 1000);
  }, []);

  return {
    playSuccessSound,
    playErrorSound,
  };
};
