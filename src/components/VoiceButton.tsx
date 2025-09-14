import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type VoiceState = 'idle' | 'listening' | 'processing' | 'success' | 'error';

interface VoiceButtonProps {
  onTranscript?: (transcript: string) => void;
  onStateChange?: (state: VoiceState) => void;
  className?: string;
}

export default function VoiceButton({ onTranscript, onStateChange, className }: VoiceButtonProps) {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');

  const updateState = (newState: VoiceState) => {
    setState(newState);
    onStateChange?.(newState);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      updateState('error');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      updateState('listening');
    };

    recognition.onresult = (event) => {
      const result = event.results[0];
      const currentTranscript = result.transcript;
      setTranscript(currentTranscript);
      
      if (result.isFinal) {
        updateState('processing');
        onTranscript?.(currentTranscript);
        
        // Simulate processing time
        setTimeout(() => {
          updateState('success');
          setTimeout(() => updateState('idle'), 2000);
        }, 1500);
      }
    };

    recognition.onerror = () => {
      updateState('error');
      setTimeout(() => updateState('idle'), 2000);
    };

    recognition.onend = () => {
      if (state === 'listening') {
        updateState('idle');
      }
    };

    recognition.start();
  };

  const getButtonVariant = () => {
    switch (state) {
      case 'listening': return 'voice-listening';
      case 'processing': return 'voice-processing';
      case 'success': return 'voice-success';
      case 'error': return 'voice-error';
      default: return 'voice';
    }
  };

  const getIcon = () => {
    switch (state) {
      case 'listening': return <Mic className="h-8 w-8" />;
      case 'processing': return <Loader2 className="h-8 w-8 animate-spin" />;
      case 'success': return <Mic className="h-8 w-8" />;
      case 'error': return <MicOff className="h-8 w-8" />;
      default: return <Mic className="h-8 w-8" />;
    }
  };

  const getStateText = () => {
    switch (state) {
      case 'listening': return 'Listening...';
      case 'processing': return 'Processing...';
      case 'success': return 'Done!';
      case 'error': return 'Error - Try again';
      default: return 'Hold to speak';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant={getButtonVariant() as any}
        size="lg"
        onClick={startListening}
        disabled={state !== 'idle'}
        className={cn(
          "h-24 w-24 rounded-full p-0 transition-all duration-300",
          state === 'listening' && "voice-active",
          className
        )}
      >
        {getIcon()}
      </Button>
      
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">{getStateText()}</p>
        {transcript && state !== 'idle' && (
          <p className="text-xs text-muted-foreground max-w-xs">
            "{transcript}"
          </p>
        )}
      </div>
    </div>
  );
}

// Extend global window type for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}