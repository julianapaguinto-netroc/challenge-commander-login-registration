import { Globe, MapPin, Phone, Star, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import companyLogo from "@/assets/company-logo.png";

export const BusinessHeader = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-primary rounded-2xl shadow-hover">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/15 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative p-6 text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            {/* Simple Circle Logo Container */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img 
                src={companyLogo} 
                alt="Company Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            {/* Simple Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <Award className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-white/20 text-white border-white/30 text-xs font-poppins font-medium">
                Verified Business
              </Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <h1 className="text-2xl font-poppins font-medium text-white leading-tight">
              Challenge Commander
            </h1>
            
            <h2 className="text-lg font-poppins font-normal text-white/90">
              InnovateTech Solutions
            </h2>
          </div>
        </div>
        
        <p className="text-sm font-poppins font-light text-white/85 leading-relaxed mb-4">
          🚀 Empowering businesses through innovative challenges and team collaboration. Join 500+ companies building stronger teams.
        </p>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-poppins font-medium text-white">12</div>
            <div className="text-xs font-poppins font-light text-white/70">Active Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-poppins font-medium text-white">247</div>
            <div className="text-xs font-poppins font-light text-white/70">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-poppins font-medium text-white">4.9</div>
            <div className="text-xs font-poppins font-light text-white/70">Rating</div>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="space-y-2 pt-2 border-t border-white/20">
          <div className="flex items-center gap-2 text-xs font-poppins font-light text-white/80">
            <Globe className="h-3 w-3" />
            <span>www.innovatetech.com</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-poppins font-light text-white/80">
              <MapPin className="h-3 w-3" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-poppins font-light text-white/80">
              <Phone className="h-3 w-3" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};