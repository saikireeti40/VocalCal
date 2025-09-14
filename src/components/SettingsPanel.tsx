import { Calendar, Clock, Bell, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const connectedCalendars = [
  { provider: 'google', email: 'work@company.com', status: 'connected', calendars: 3 },
  { provider: 'microsoft', email: 'personal@outlook.com', status: 'connected', calendars: 2 },
  { provider: 'apple', email: 'me@icloud.com', status: 'disconnected', calendars: 0 }
];

const preferences = [
  { id: 'notifications', label: 'Voice confirmations', description: 'Hear audio feedback for scheduling actions', enabled: true },
  { id: 'auto-schedule', label: 'Auto-schedule when no conflicts', description: 'Skip confirmation for clear time slots', enabled: true },
  { id: 'smart-breaks', label: 'Smart break suggestions', description: 'Recommend breaks between back-to-back meetings', enabled: false },
  { id: 'focus-protection', label: 'Focus time protection', description: 'Block scheduling during designated focus hours', enabled: true },
];

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground">Configure your voice scheduling preferences</p>
      </div>

      {/* Connected Calendars */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Connected Calendars</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your calendar providers and sync preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedCalendars.map((calendar) => (
            <div key={calendar.provider} className="flex items-center justify-between p-4 rounded-lg border bg-card/30">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full bg-calendar-${calendar.provider}`} />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium capitalize">{calendar.provider}</span>
                    <Badge variant={calendar.status === 'connected' ? 'default' : 'secondary'}>
                      {calendar.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{calendar.email}</p>
                  {calendar.status === 'connected' && (
                    <p className="text-xs text-muted-foreground">{calendar.calendars} calendars synced</p>
                  )}
                </div>
              </div>
              <Button variant={calendar.status === 'connected' ? 'outline' : 'voice'} size="sm">
                {calendar.status === 'connected' ? 'Manage' : 'Connect'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Work Hours */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-accent" />
            <span>Work Hours & Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Hours</label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="w-20">9:00 AM</Button>
                <span className="text-muted-foreground">to</span>
                <Button variant="outline" size="sm" className="w-20">6:00 PM</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Zone</label>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Pacific Standard Time (PST)
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Meeting Buffer</label>
            <div className="flex space-x-2">
              {['5 min', '10 min', '15 min'].map((buffer) => (
                <Button
                  key={buffer}
                  variant={buffer === '10 min' ? 'voice' : 'outline'}
                  size="sm"
                >
                  {buffer}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Features */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-voice-success" />
            <span>Smart Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {preferences.map((pref) => (
            <div key={pref.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/20">
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{pref.label}</h4>
                <p className="text-xs text-muted-foreground">{pref.description}</p>
              </div>
              <Switch checked={pref.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-voice-processing" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border bg-card/20">
            <div className="flex items-start space-x-3">
              <Bell className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Voice Data Processing</h4>
                <p className="text-xs text-muted-foreground">
                  Voice recordings are processed securely and not stored permanently. 
                  Only transcribed text is used for scheduling actions.
                </p>
                <Button variant="outline" size="sm">
                  Review Privacy Policy
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm">Anonymous Analytics</h4>
              <p className="text-xs text-muted-foreground">Help improve EchoTime with usage data</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}