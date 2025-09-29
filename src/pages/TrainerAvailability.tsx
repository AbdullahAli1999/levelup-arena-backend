import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Calendar, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  gameType: string;
  maxCapacity: number;
  currentBookings: number;
}

interface DaySchedule {
  day: string;
  dayAbbr: string;
  isEnabled: boolean;
  slots: TimeSlot[];
}

const TrainerAvailability = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Mock data following OpenAPI TrainerAvailabilityDTO
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      dayAbbr: 'MON',
      isEnabled: true,
      slots: [
        {
          id: '1',
          startTime: '16:00',
          endTime: '18:00',
          isAvailable: true,
          gameType: 'Street Fighter 6',
          maxCapacity: 8,
          currentBookings: 3
        },
        {
          id: '2',
          startTime: '19:00',
          endTime: '21:00',
          isAvailable: true,
          gameType: 'Tekken 8',
          maxCapacity: 6,
          currentBookings: 1
        }
      ]
    },
    {
      day: 'Tuesday',
      dayAbbr: 'TUE',
      isEnabled: true,
      slots: [
        {
          id: '3',
          startTime: '17:00',
          endTime: '19:00',
          isAvailable: true,
          gameType: 'Street Fighter 6',
          maxCapacity: 8,
          currentBookings: 5
        }
      ]
    },
    {
      day: 'Wednesday',
      dayAbbr: 'WED',
      isEnabled: false,
      slots: []
    },
    {
      day: 'Thursday',
      dayAbbr: 'THU',
      isEnabled: true,
      slots: [
        {
          id: '4',
          startTime: '18:00',
          endTime: '20:00',
          isAvailable: true,
          gameType: 'Tekken 8',
          maxCapacity: 6,
          currentBookings: 2
        }
      ]
    },
    {
      day: 'Friday',
      dayAbbr: 'FRI',
      isEnabled: true,
      slots: [
        {
          id: '5',
          startTime: '14:00',
          endTime: '16:00',
          isAvailable: true,
          gameType: 'Street Fighter 6',
          maxCapacity: 10,
          currentBookings: 8
        },
        {
          id: '6',
          startTime: '20:00',
          endTime: '22:00',
          isAvailable: true,
          gameType: 'King of Fighters XV',
          maxCapacity: 6,
          currentBookings: 0
        }
      ]
    },
    {
      day: 'Saturday',
      dayAbbr: 'SAT',
      isEnabled: true,
      slots: [
        {
          id: '7',
          startTime: '10:00',
          endTime: '12:00',
          isAvailable: true,
          gameType: 'Tekken 8',
          maxCapacity: 8,
          currentBookings: 4
        }
      ]
    },
    {
      day: 'Sunday',
      dayAbbr: 'SUN',
      isEnabled: false,
      slots: []
    }
  ]);

  const [showAddSlot, setShowAddSlot] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState({
    startTime: '',
    endTime: '',
    gameType: 'Street Fighter 6',
    maxCapacity: 8
  });

  const gameTypes = [
    'Street Fighter 6',
    'Tekken 8',
    'King of Fighters XV',
    'Mortal Kombat 1',
    'Guilty Gear Strive'
  ];

  const toggleDayAvailability = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].isEnabled = !newSchedule[dayIndex].isEnabled;
    if (!newSchedule[dayIndex].isEnabled) {
      newSchedule[dayIndex].slots = [];
    }
    setSchedule(newSchedule);
  };

  const addTimeSlot = (dayIndex: number) => {
    if (!newSlot.startTime || !newSlot.endTime) return;

    const slot: TimeSlot = {
      id: Date.now().toString(),
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      isAvailable: true,
      gameType: newSlot.gameType,
      maxCapacity: newSlot.maxCapacity,
      currentBookings: 0
    };

    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.push(slot);
    newSchedule[dayIndex].slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
    setSchedule(newSchedule);

    setNewSlot({ startTime: '', endTime: '', gameType: 'Street Fighter 6', maxCapacity: 8 });
    setShowAddSlot(null);
  };

  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots = newSchedule[dayIndex].slots.filter(slot => slot.id !== slotId);
    setSchedule(newSchedule);
  };

  const toggleSlotAvailability = (dayIndex: number, slotId: string) => {
    const newSchedule = [...schedule];
    const slot = newSchedule[dayIndex].slots.find(s => s.id === slotId);
    if (slot) {
      slot.isAvailable = !slot.isAvailable;
    }
    setSchedule(newSchedule);
  };

  const saveSchedule = async () => {
    setLoading(true);
    try {
      // Mock API call - POST /api/trainers/{trainerId}/availability
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Schedule Updated",
        description: "Your availability has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save schedule. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-2">
            Manage Availability
          </h1>
          <p className="text-muted-foreground">Set your weekly training schedule and session capacity</p>
        </div>

        <div className="grid gap-6 mb-8">
          {schedule.map((day, dayIndex) => (
            <Card key={day.day} className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant={day.isEnabled ? "default" : "secondary"} className="text-xs">
                      {day.dayAbbr}
                    </Badge>
                    <CardTitle className="text-xl">{day.day}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {day.isEnabled ? 'Available' : 'Day Off'}
                    </span>
                    <Switch
                      checked={day.isEnabled}
                      onCheckedChange={() => toggleDayAvailability(dayIndex)}
                    />
                  </div>
                </div>
              </CardHeader>

              {day.isEnabled && (
                <CardContent className="space-y-4">
                  {day.slots.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No sessions scheduled</p>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {day.slots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-background/50 hover:bg-background/80 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-primary">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {slot.gameType}
                            </Badge>
                            <div className={`text-sm ${getCapacityColor(slot.currentBookings, slot.maxCapacity)}`}>
                              {slot.currentBookings}/{slot.maxCapacity} players
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={slot.isAvailable}
                              onCheckedChange={() => toggleSlotAvailability(dayIndex, slot.id)}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimeSlot(dayIndex, slot.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showAddSlot === day.day ? (
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm font-medium">Start Time</label>
                          <input
                            type="time"
                            value={newSlot.startTime}
                            onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                            className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">End Time</label>
                          <input
                            type="time"
                            value={newSlot.endTime}
                            onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                            className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Game</label>
                          <select
                            value={newSlot.gameType}
                            onChange={(e) => setNewSlot({...newSlot, gameType: e.target.value})}
                            className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                          >
                            {gameTypes.map(game => (
                              <option key={game} value={game}>{game}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Max Players</label>
                          <input
                            type="number"
                            min="2"
                            max="16"
                            value={newSlot.maxCapacity}
                            onChange={(e) => setNewSlot({...newSlot, maxCapacity: parseInt(e.target.value)})}
                            className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => addTimeSlot(dayIndex)} size="sm">
                          Add Session
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => setShowAddSlot(null)}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setShowAddSlot(day.day)}
                      className="w-full border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Session
                    </Button>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={saveSchedule}
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Schedule
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TrainerAvailability;