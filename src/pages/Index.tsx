import { useState } from 'react';
import { Mic, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import VoiceButton from '@/components/VoiceButton';
import CalendarView from '@/components/CalendarView';
import AlternativeSuggestions from '@/components/AlternativeSuggestions';
import MonthlyDashboard from '@/components/MonthlyDashboard';
import SettingsPanel from '@/components/SettingsPanel';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('voice');
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [lastTranscript, setLastTranscript] = useState('');

  const handleTranscript = (transcript: string) => {
    if (!transcript) return;
    
    setLastTranscript(transcript);
    
    // Simulate conflict detection for demo
    const hasConflict = transcript.toLowerCase().includes('tomorrow morning') || 
                       transcript.toLowerCase().includes('9am') ||
                       transcript.toLowerCase().includes('standup');
    
    if (hasConflict) {
      setTimeout(() => setShowAlternatives(true), 2000);
    } else {
      setShowAlternatives(false);
    }
  };

  const handleSelectAlternative = (slotId: string) => {
    setShowAlternatives(false);
    // Here you would actually schedule the event
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'voice':
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-3xl opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <Card className="glass relative">
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                        EchoTime
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        AI Voice-First Scheduling Assistant
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Just speak naturally - "Schedule coffee with Sarah tomorrow at 3pm"</span>
                    </div>
                    
                    <VoiceButton 
                      onTranscript={handleTranscript}
                      className="mx-auto"
                    />
                    
                    {lastTranscript && (
                      <div className="p-4 rounded-lg glass max-w-md mx-auto">
                        <p className="text-sm font-medium mb-2">Last command:</p>
                        <p className="text-sm italic">"{lastTranscript}"</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar and Alternatives */}
            <div className="grid lg:grid-cols-2 gap-6">
              <CalendarView />
              {showAlternatives && (
                <AlternativeSuggestions 
                  originalRequest={lastTranscript}
                  onSelectSlot={handleSelectAlternative}
                />
              )}
            </div>

            {/* Quick Actions */}
            <Card className="glass">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Mic className="h-5 w-5 mr-2 text-primary" />
                  Try These Voice Commands
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Schedule 30-min coffee with Alex next Tuesday at 2pm",
                    "Block 2 hours for project work tomorrow morning",
                    "Move my 1:1 with Sarah to Friday afternoon",
                    "When can I fit a 45-minute workout this week?",
                    "Cancel my dentist appointment on Thursday",
                    "Remind me to call mom every Sunday at 5pm"
                  ].map((command, index) => (
                    <Button
                      key={index}
                      variant="glass"
                      size="sm"
                      className="text-left h-auto p-3 text-xs justify-start"
                    >
                      "{command}"
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'calendar':
        return (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CalendarView />
            </div>
            <div className="space-y-6">
              <Card className="glass">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold mb-2">Connected Calendars</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Google Calendar</span>
                      <div className="w-2 h-2 rounded-full bg-calendar-google" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Outlook</span>
                      <div className="w-2 h-2 rounded-full bg-calendar-microsoft" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Apple Calendar</span>
                      <div className="w-2 h-2 rounded-full bg-calendar-apple" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'insights':
        return <MonthlyDashboard />;
        
      case 'settings':
        return <SettingsPanel />;
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Index;
