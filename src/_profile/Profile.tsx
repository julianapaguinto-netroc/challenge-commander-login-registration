import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import userAvatar from "@/assets/astronaut-character.png";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Your Name",
    role: "Member",
    email: "you@example.com",
    phone: "",
  });

  useEffect(() => {
    document.title = "Profile | User Account";

    // Meta description
    const desc = document.querySelector('meta[name="description"]');
    const content = "View and edit your profile, account info, and security settings.";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }

    // Canonical
    const href = window.location.href;
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }, []);

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const disableSave = useMemo(() => !form.name || !form.email, [form.name, form.email]);

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold">User Profile</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 ring-2 ring-primary/20 shadow-card">
            <AvatarImage src={userAvatar} alt="User profile picture" loading="lazy" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">{form.name}</h2>
          <p className="text-sm text-muted-foreground">{form.role}</p>

          <div className="mt-4 flex items-center gap-2">
            {!isEditing ? (
              <Button size="sm" onClick={() => setIsEditing(true)} aria-label="Edit profile">
                Edit Profile
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleSave} disabled={disableSave} aria-label="Save changes">
                  Save Changes
                </Button>
                <Button size="sm" variant="secondary" onClick={handleCancel} aria-label="Cancel editing">
                  Cancel
                </Button>
              </div>
            )}
            <Button size="sm" variant="outline" onClick={() => toast({ title: "Password", description: "Use your security screen to change password." })} aria-label="Change password">
              Change Password
            </Button>
          </div>
        </section>

        <Separator />

        {/* Account Info */}
        <article className="space-y-4" aria-label="Account information">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={onChange("name")} disabled={!isEditing} placeholder="Your Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role / Title</Label>
                <Input id="role" value={form.role} onChange={onChange("role")} disabled={!isEditing} placeholder="Member" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={onChange("email")} disabled={!isEditing} placeholder="you@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={onChange("phone")} disabled={!isEditing} placeholder="" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => toast({ title: "Password", description: "Password change coming soon." })}>
                Change Password
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => navigate("/")}>Log out</Button>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
