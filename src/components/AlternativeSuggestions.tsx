import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AlternativeSlot {
  id: string;
  day: string;
  date: string;
  time: string;
  duration: string;
  score: number;
  reason: string;
}

const mockAlternatives: AlternativeSlot[] = [
  {
    id: '1',
    day: 'Tomorrow',
    date: 'Sep 15',
    time: '9:00 AM',
    duration: '45 min',
    score: 95,
    reason: 'Perfect morning slot'
  },
  {
    id: '2',
    day: 'Thursday',
    date: 'Sep 16',
    time: '7:30 AM',
    duration: '45 min',
    score: 90,
    reason: 'Early morning available'
  },
  {
    id: '3',
    day: 'Friday',
    date: 'Sep 17',
    time: '8:00 AM',
    duration: '45 min',
    score: 85,
    reason: 'End of week slot'
  }
];

interface AlternativeSuggestionsProps {
  originalRequest?: string;
  onSelectSlot?: (slotId: string) => void;
}

export default function AlternativeSuggestions({ 
  originalRequest = "Schedule 45-minute run tomorrow morning",
  onSelectSlot 
}: AlternativeSuggestionsProps) {
  
  const handleSelect = (slotId: string) => {
    onSelectSlot?.(slotId);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-voice-processing" />
          <span>Alternative Time Slots</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your requested time conflicts with "Team Standup". Here are the best alternatives:
        </p>
        <div className="p-2 bg-muted/30 rounded-lg">
          <p className="text-xs font-medium">Original request:</p>
          <p className="text-sm italic">"{originalRequest}"</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlternatives.map((slot) => (
          <div
            key={slot.id}
            className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-all duration-200 hover:border-primary/50"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{slot.day}, {slot.date}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {slot.score}% match
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-medium text-primary">{slot.time}</span>
                  <span className="text-muted-foreground">({slot.duration})</span>
                  <span className="text-xs text-muted-foreground">{slot.reason}</span>
                </div>
              </div>
              <Button
                variant="voice"
                size="sm"
                onClick={() => handleSelect(slot.id)}
                className="min-w-[80px]"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Select
              </Button>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 border border-dashed border-border/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">
            None of these work for you?
          </p>
          <Button variant="ghost" size="sm">
            Show more options
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}