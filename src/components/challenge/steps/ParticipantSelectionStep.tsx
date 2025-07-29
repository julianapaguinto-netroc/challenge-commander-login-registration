import React, { useState } from 'react';
import { ArrowLeft, Search, Users, UserCheck, X } from 'lucide-react';
import { ChallengeData } from '../ChallengeCreationFlow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ParticipantSelectionStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Mock data for church/community members
const MOCK_PARTICIPANTS = [
  { id: '1', name: 'Sarah Johnson', role: 'Youth Leader', avatar: '👩‍🦱' },
  { id: '2', name: 'Michael Chen', role: 'Pastor', avatar: '👨‍💼' },
  { id: '3', name: 'Emma Davis', role: 'Choir Member', avatar: '👩‍🎤' },
  { id: '4', name: 'David Rodriguez', role: 'Volunteer', avatar: '👨‍🔧' },
  { id: '5', name: 'Lisa Thompson', role: 'Sunday School Teacher', avatar: '👩‍🏫' },
  { id: '6', name: 'James Wilson', role: 'Deacon', avatar: '👨‍💻' },
  { id: '7', name: 'Maria Garcia', role: 'Missionary', avatar: '👩‍✈️' },
  { id: '8', name: 'Robert Kim', role: 'Elder', avatar: '👨‍🎓' },
  { id: '9', name: 'Jennifer Lee', role: 'Community Outreach', avatar: '👩‍💼' },
  { id: '10', name: 'Christopher Brown', role: 'Worship Leader', avatar: '👨‍🎤' }
];

export const ParticipantSelectionStep: React.FC<ParticipantSelectionStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    data.selectedParticipants || []
  );

  const filteredParticipants = MOCK_PARTICIPANTS.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleParticipantToggle = (participantId: string) => {
    const newSelected = selectedParticipants.includes(participantId)
      ? selectedParticipants.filter(id => id !== participantId)
      : [...selectedParticipants, participantId];
    
    setSelectedParticipants(newSelected);
    onUpdate({ selectedParticipants: newSelected });
  };

  const removeParticipant = (participantId: string) => {
    const newSelected = selectedParticipants.filter(id => id !== participantId);
    setSelectedParticipants(newSelected);
    onUpdate({ selectedParticipants: newSelected });
  };

  const handleNext = () => {
    if (selectedParticipants.length > 0) {
      onNext();
    }
  };

  const getSelectedParticipantNames = () => {
    return MOCK_PARTICIPANTS
      .filter(p => selectedParticipants.includes(p.id))
      .map(p => p.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Select Participants
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            Choose members for this private challenge
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search members by name or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 glass-input"
        />
      </div>

      {/* Selected Participants */}
      {selectedParticipants.length > 0 && (
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2 mb-3">
            <UserCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Selected ({selectedParticipants.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {getSelectedParticipantNames().map((name, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
              >
                <span>{name}</span>
                <button
                  onClick={() => removeParticipant(selectedParticipants[index])}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Participant List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredParticipants.map((participant) => {
          const isSelected = selectedParticipants.includes(participant.id);
          return (
            <button
              key={participant.id}
              onClick={() => handleParticipantToggle(participant.id)}
              className={`glass-card w-full p-4 text-left transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/10' 
                  : 'hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{participant.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground">
                    {participant.name}
                  </h3>
                  <p className="text-xs font-light text-muted-foreground">
                    {participant.role}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <UserCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleNext}
        disabled={selectedParticipants.length === 0}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-medium transition-all duration-300 disabled:opacity-50"
      >
        <Users className="w-5 h-5 mr-2" />
        Continue with {selectedParticipants.length} participant{selectedParticipants.length !== 1 ? 's' : ''}
      </Button>

      {/* Tip */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <p className="text-xs font-light text-muted-foreground">
          <span className="font-medium text-primary">Tip:</span> You can search by name or role (Pastor, Youth Leader, etc.) to quickly find community members.
        </p>
      </div>
    </div>
  );
};