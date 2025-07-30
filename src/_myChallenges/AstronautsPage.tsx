import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trophy, MessageCircle, UserPlus, Zap, Star } from 'lucide-react';

export default function AstronautsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const friends = [
    {
      id: 1,
      name: "Commander Sarah",
      avatar: "👩‍🚀",
      tier: "Tier 3 • Navigator",
      points: 1250,
      activeChallenges: 3,
      status: "online",
      recentActivity: "Completed Daily Fitness Challenge"
    },
    {
      id: 2,
      name: "Captain Alex",
      avatar: "👨‍🚀",
      tier: "Tier 2 • Engineer", 
      points: 890,
      activeChallenges: 2,
      status: "offline",
      recentActivity: "Started Go Green Mission"
    },
    {
      id: 3,
      name: "Pilot Maya",
      avatar: "👩‍🚀",
      tier: "Tier 1 • Trainee",
      points: 450,
      activeChallenges: 1,
      status: "online",
      recentActivity: "Joined Culinary Academy"
    },
    {
      id: 4,
      name: "Engineer Jordan",
      avatar: "👨‍🚀",
      tier: "Tier 2 • Engineer",
      points: 1020,
      activeChallenges: 4,
      status: "online",
      recentActivity: "Achieved Wellness Milestone"
    }
  ];

  const leaderboard = friends
    .sort((a, b) => b.points - a.points)
    .map((friend, index) => ({ ...friend, rank: index + 1 }));

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search astronauts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Invite Friends */}
      <Card className="mobile-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground mb-1">Invite Friends to Join</h3>
            <p className="text-sm text-muted-foreground">
              Bring your friends on this space adventure
            </p>
          </div>
          <Button className="btn-astronaut">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </Card>

      {/* Leaderboard */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-cosmic-gold" />
          <h2 className="text-lg font-semibold text-foreground font-poppins">
            Friends Leaderboard
          </h2>
        </div>
        <div className="space-y-2">
          {leaderboard.slice(0, 3).map((friend) => (
            <Card key={friend.id} className="mobile-card">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  friend.rank === 1 ? 'bg-cosmic-gold text-deep-space' :
                  friend.rank === 2 ? 'bg-gray-400 text-white' :
                  'bg-yellow-600 text-white'
                }`}>
                  {friend.rank}
                </div>
                <div className="text-2xl">{friend.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground">{friend.tier}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{friend.points}</div>
                  <div className="text-xs text-muted-foreground">pts</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Friends List */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-poppins">
            Your Astronaut Friends
          </h2>
        </div>
        <div className="space-y-3">
          {filteredFriends.map((friend) => (
            <Card key={friend.id} className="mobile-card">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="text-3xl">{friend.avatar}</div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    friend.status === 'online' ? 'bg-success-color' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{friend.tier}</p>
                  <p className="text-xs text-muted-foreground mb-2">{friend.recentActivity}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {friend.points} pts
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {friend.activeChallenges} active
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button className="btn-astronaut flex-1 text-xs py-2">
                      Challenge Friend
                    </Button>
                    <Button variant="outline" className="btn-outline-astronaut text-xs py-2">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Activities */}
      <section>
        <h2 className="text-lg font-semibold text-foreground font-poppins mb-4">
          Recent Friend Activities
        </h2>
        <div className="space-y-2">
          {friends.filter(f => f.status === 'online').map((friend) => (
            <Card key={`activity-${friend.id}`} className="mobile-card">
              <div className="flex items-center gap-3">
                <div className="text-lg">{friend.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{friend.name}</span> {friend.recentActivity}
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}