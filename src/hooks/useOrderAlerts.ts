import { useCallback, useState, useEffect } from 'react';

export type AlertSound = 'bell' | 'chime' | 'notification' | 'ding' | 'alert';

interface OrderAlertSettings {
  enabled: boolean;
  sound: AlertSound;
  volume: number;
}

const STORAGE_KEY = 'order-alert-settings';

const defaultSettings: OrderAlertSettings = {
  enabled: true,
  sound: 'bell',
  volume: 0.5,
};

export const useOrderAlerts = () => {
  const [settings, setSettings] = useState<OrderAlertSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const playSound = useCallback((soundType?: AlertSound) => {
    if (!settings.enabled) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const soundToPlay = soundType || settings.sound;
    
    const playTone = (frequencies: number[], durations: number[], type: OscillatorType = 'sine') => {
      let currentTime = audioContext.currentTime;
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = type;
        
        const duration = durations[index] || 0.15;
        
        gainNode.gain.setValueAtTime(settings.volume * 0.4, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        
        currentTime += duration * 0.8;
      });
    };

    switch (soundToPlay) {
      case 'bell':
        // Classic bell sound - ascending notes
        playTone([659.25, 783.99, 987.77], [0.15, 0.15, 0.2], 'sine');
        break;
      case 'chime':
        // Gentle chime - soft tones
        playTone([523.25, 659.25, 783.99, 1046.50], [0.12, 0.12, 0.12, 0.25], 'sine');
        break;
      case 'notification':
        // Modern notification - two quick tones
        playTone([880, 1108.73], [0.1, 0.15], 'sine');
        break;
      case 'ding':
        // Single ding
        playTone([1046.50], [0.3], 'sine');
        break;
      case 'alert':
        // Urgent alert - faster, more intense
        playTone([880, 988, 1047, 988, 1047], [0.08, 0.08, 0.08, 0.08, 0.15], 'triangle');
        break;
    }
    
    setTimeout(() => audioContext.close(), 2000);
  }, [settings.enabled, settings.sound, settings.volume]);

  const toggleEnabled = useCallback(() => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const setSound = useCallback((sound: AlertSound) => {
    setSettings(prev => ({ ...prev, sound }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setSettings(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const testSound = useCallback(() => {
    const wasEnabled = settings.enabled;
    if (!wasEnabled) {
      setSettings(prev => ({ ...prev, enabled: true }));
    }
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const soundToPlay = settings.sound;
    
    const playTone = (frequencies: number[], durations: number[], type: OscillatorType = 'sine') => {
      let currentTime = audioContext.currentTime;
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = type;
        
        const duration = durations[index] || 0.15;
        
        gainNode.gain.setValueAtTime(settings.volume * 0.4, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        
        currentTime += duration * 0.8;
      });
    };

    switch (soundToPlay) {
      case 'bell':
        playTone([659.25, 783.99, 987.77], [0.15, 0.15, 0.2], 'sine');
        break;
      case 'chime':
        playTone([523.25, 659.25, 783.99, 1046.50], [0.12, 0.12, 0.12, 0.25], 'sine');
        break;
      case 'notification':
        playTone([880, 1108.73], [0.1, 0.15], 'sine');
        break;
      case 'ding':
        playTone([1046.50], [0.3], 'sine');
        break;
      case 'alert':
        playTone([880, 988, 1047, 988, 1047], [0.08, 0.08, 0.08, 0.08, 0.15], 'triangle');
        break;
    }
    
    setTimeout(() => audioContext.close(), 2000);
    
    if (!wasEnabled) {
      setTimeout(() => {
        setSettings(prev => ({ ...prev, enabled: false }));
      }, 100);
    }
  }, [settings.sound, settings.volume, settings.enabled]);

  return {
    settings,
    playSound,
    toggleEnabled,
    setSound,
    setVolume,
    testSound,
  };
};

export const SOUND_OPTIONS: { value: AlertSound; label: string }[] = [
  { value: 'bell', label: 'Sino' },
  { value: 'chime', label: 'Carrilhão' },
  { value: 'notification', label: 'Notificação' },
  { value: 'ding', label: 'Ding' },
  { value: 'alert', label: 'Alerta Urgente' },
];
