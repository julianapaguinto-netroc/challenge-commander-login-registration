import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileTextArea } from "@/components/ui/MobileTextArea";
import { MobileButton } from "@/components/ui/mobile-button";
import { Label } from "@/components/ui/label";

export default function OrgDetailsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orgName: "",
    description: "",
    website: "",
    address: "",
    phone: "",
    logo: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data logic here
    navigate("/homescreen-commander"); // or next screen
  };

  const skipForLater = () => {
    // Optional: Save partial state to local/session
    navigate("/homescreen-commander");
  };

  return (
    <div className="mobile-container">
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="mobile-card w-full max-w-sm">
            <h1 className="text-xl font-semibold text-center mb-4">
              Organization Details
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-6 font-light">
              You can complete your profile later, or fill in the details now.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Organization / Company Name</Label>
                <MobileInput
                  placeholder="e.g. MetaVault Inc."
                  value={formData.orgName}
                  onChange={(e) =>
                    setFormData({ ...formData, orgName: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Short Description</Label>
                <MobileTextArea
                  placeholder="Tell us briefly about your organization..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Business Website</Label>
                <MobileInput
                  type="url"
                  placeholder="https://yourorg.com"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Address</Label>
                <MobileInput
                  placeholder="e.g. 123 Main St, City"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Phone Number</Label>
                <MobileInput
                  type="tel"
                  placeholder="+63 912 345 6789"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Upload Logo</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-sm file:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white"
                />
              </div>

              <MobileButton type="submit" className="mt-4">
                Save and Continue
              </MobileButton>

              <button
                type="button"
                onClick={skipForLater}
                className="w-full text-sm text-muted-foreground mt-3 underline"
              >
                Skip and finish later
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
