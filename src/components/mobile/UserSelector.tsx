import { ScrollArea } from "@/components/ui/scroll-area";

export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
  isCurrentUser?: boolean;
}

interface UserSelectorProps {
  currentUser: UserInfo;
  friends: UserInfo[];
  selectedUser: UserInfo;
  onUserSelect: (user: UserInfo) => void;
}

export function UserSelector({ currentUser, friends, selectedUser, onUserSelect }: UserSelectorProps) {
  const allUsers = [currentUser, ...friends];

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium text-foreground mb-3">Astronauts</h3>
      
      <div className="flex gap-4">
        {/* Static User Profile */}
        <div className="flex-shrink-0">
          <div 
            className={`flex flex-col items-center cursor-pointer ${
              selectedUser.id === currentUser.id ? 'opacity-100' : 'opacity-70'
            }`}
            onClick={() => onUserSelect(currentUser)}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
              selectedUser.id === currentUser.id 
                ? 'bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background' 
                : 'bg-muted'
            }`}>
              {currentUser.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs font-medium text-center max-w-[64px] truncate">
              {currentUser.isCurrentUser ? "Me" : currentUser.name}
            </p>
          </div>
        </div>

        {/* Scrollable Friends List */}
        <ScrollArea className="flex-1">
          <div className="flex gap-4 pb-2">
            {friends.map((friend) => (
              <div 
                key={friend.id}
                className={`flex-shrink-0 flex flex-col items-center cursor-pointer transition-all ${
                  selectedUser.id === friend.id ? 'opacity-100' : 'opacity-70'
                }`}
                onClick={() => onUserSelect(friend)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                  selectedUser.id === friend.id 
                    ? 'bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : 'bg-muted'
                }`}>
                  {friend.avatar ? (
                    <img 
                      src={friend.avatar} 
                      alt={friend.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {friend.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-center max-w-[64px] truncate">
                  {friend.name.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}