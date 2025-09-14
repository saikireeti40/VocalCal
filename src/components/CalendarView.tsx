import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  provider: 'google' | 'microsoft' | 'apple';
  location?: string;
  attendees?: number;
  type: 'meeting' | 'focus' | 'personal' | 'workout';
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    start: '09:00',
    end: '09:30',
    provider: 'google',
    attendees: 5,
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Focus: Project Planning',
    start: '10:00',
    end: '12:00',
    provider: 'microsoft',
    type: 'focus'
  },
  {
    id: '3',
    title: 'Lunch with Sarah',
    start: '12:30',
    end: '13:30',
    provider: 'apple',
    location: 'Downtown Café',
    type: 'personal'
  },
  {
    id: '4',
    title: 'Workout Session',
    start: '18:00',
    end: '19:00',
    provider: 'google',
    location: 'Home Gym',
    type: 'workout'
  }
];

const getProviderColor = (provider: string) => {
  switch (provider) {
    case 'google': return 'border-l-calendar-google';
    case 'microsoft': return 'border-l-calendar-microsoft';
    case 'apple': return 'border-l-calendar-apple';
    default: return 'border-l-primary';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'meeting': return <Users className="h-3 w-3" />;
    case 'focus': return <Clock className="h-3 w-3" />;
    case 'personal': return <Calendar className="h-3 w-3" />;
    case 'workout': return <MapPin className="h-3 w-3" />;
    default: return <Calendar className="h-3 w-3" />;
  }
};

export default function CalendarView() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Today's Schedule</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{today}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockEvents.map((event) => (
          <div
            key={event.id}
            className={`p-3 rounded-lg border-l-4 ${getProviderColor(event.provider)} bg-card/50 hover:bg-card/80 transition-colors`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(event.type)}
                  <h4 className="font-medium text-sm">{event.title}</h4>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{event.start} - {event.end}</span>
                  {event.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.attendees && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}</span>
                    </div>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {event.provider}
              </Badge>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 rounded-lg border border-dashed border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Use voice commands to add more events
          </p>
        </div>
      </CardContent>
    </Card>
  );
}