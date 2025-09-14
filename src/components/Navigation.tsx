import { Calendar, BarChart3, Settings, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="glass rounded-2xl p-2 mb-6">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? 'voice' : 'ghost'}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 transition-all duration-200",
                isActive && "glow-primary"
              )}
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}