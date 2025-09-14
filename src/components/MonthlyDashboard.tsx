import { Calendar, Clock, TrendingUp, Users, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  month: 'August 2024',
  totals: {
    events: 89,
    hoursScheduled: 156,
    avgMeetingLength: 45,
    reschedules: 7,
    focusTime: 32,
    meetingTime: 78,
    personalTime: 46
  },
  categoryData: [
    { name: 'Meetings', value: 78, hours: 78, color: 'hsl(var(--voice-processing))' },
    { name: 'Focus Time', value: 32, hours: 32, color: 'hsl(var(--primary))' },
    { name: 'Personal', value: 46, hours: 46, color: 'hsl(var(--accent))' }
  ],
  hourlyData: [
    { hour: '6', events: 2 }, { hour: '7', events: 5 }, { hour: '8', events: 8 },
    { hour: '9', events: 12 }, { hour: '10', events: 15 }, { hour: '11', events: 18 },
    { hour: '12', events: 10 }, { hour: '13', events: 8 }, { hour: '14', events: 14 },
    { hour: '15', events: 16 }, { hour: '16', events: 12 }, { hour: '17', events: 8 },
    { hour: '18', events: 4 }, { hour: '19', events: 2 }, { hour: '20', events: 1 }
  ],
  recommendations: [
    {
      icon: Target,
      title: 'Optimize Meeting Length',
      description: 'Average meeting is 45min. Consider 30min default to increase focus time.',
      impact: 'High',
      color: 'text-voice-error'
    },
    {
      icon: Clock,
      title: 'Block Focus Sessions',
      description: 'Schedule 2×90min focus blocks on Tue/Thu mornings when you\'re most productive.',
      impact: 'High',
      color: 'text-primary'
    },
    {
      icon: Zap,
      title: 'Reduce Context Switching',
      description: 'Group similar meetings together to minimize mental overhead.',
      impact: 'Medium',
      color: 'text-accent'
    }
  ]
};

export default function MonthlyDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
          Monthly Insights
        </h1>
        <p className="text-muted-foreground">{mockData.month} • Productivity Analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">{mockData.totals.events}</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div className="text-2xl font-bold">{mockData.totals.hoursScheduled}h</div>
            <div className="text-sm text-muted-foreground">Scheduled</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-voice-processing" />
            </div>
            <div className="text-2xl font-bold">{mockData.totals.avgMeetingLength}m</div>
            <div className="text-sm text-muted-foreground">Avg Meeting</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-voice-success" />
            </div>
            <div className="text-2xl font-bold">{mockData.totals.reschedules}</div>
            <div className="text-sm text-muted-foreground">Reschedules</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Time Breakdown */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={mockData.categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="hours"
                  >
                    {mockData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {mockData.categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.hours}h</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Peak Activity Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockData.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="events" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>AI Recommendations</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Personalized insights to optimize your schedule for next month
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <div key={index} className="p-4 rounded-lg border bg-card/30 hover:bg-card/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <IconComponent className={`h-5 w-5 ${rec.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge variant={rec.impact === 'High' ? 'default' : 'secondary'} className="text-xs">
                        {rec.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}