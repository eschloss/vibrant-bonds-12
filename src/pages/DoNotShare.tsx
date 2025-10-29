import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setDoNotShare, getConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";
import { Helmet } from "react-helmet";

const DoNotSharePage: React.FC = () => {
  const [optOut, setOptOut] = useState<boolean>(Boolean(getConsent().doNotShare));
  const { toast } = useToast();

  const gpcEnabled = useMemo(
    () => typeof navigator !== "undefined" && (navigator as any).globalPrivacyControl === true,
    []
  );

  useEffect(() => {
    // If GPC is on, enforce opt-out UI state
    if (gpcEnabled) setOptOut(true);
  }, [gpcEnabled]);

  const handleSave = () => {
    setDoNotShare(optOut);
    toast({ title: optOut ? "Opt-out saved" : "Preference updated", description: optOut ? "We will not sell or share your personal information for cross-context behavioral advertising." : "Sharing settings have been restored." });
  };

  const handleReset = () => {
    setOptOut(false);
    setDoNotShare(false);
    toast({ title: "Preference reset", description: "Sharing settings restored. You can opt out again at any time." });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Helmet>
        <title>Do Not Share My Data</title>
        <meta name="description" content="Exercise your California privacy rights to opt out of the sale or sharing of your personal information for cross-context behavioral advertising." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[40px]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-4">
                <Shield size={56} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Do Not Share My Data
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Opt out of the sale or sharing of your personal information for cross-context behavioral advertising. This setting applies to this browser and device.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-6 md:p-8">
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
              Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have the right to opt out of the sale or sharing of their personal information. We and our partners may use cookies or other technologies for advertising and analytics purposes that could be considered a “sale” or “sharing” under California law.
            </p>
            <Card className="bg-transparent border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Opt-out of sale/sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/60 border border-gray-700">
                  <div>
                    <p className="font-medium text-white">Do not sell or share my personal information</p>
                    <p className="text-sm text-gray-400 mt-1">When enabled, we will not use or disclose your personal information for cross-context behavioral advertising.</p>
                  </div>
                  <Switch checked={optOut} onCheckedChange={(v) => setOptOut(Boolean(v))} disabled={gpcEnabled} />
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <p>Global Privacy Control (GPC) detected: <span className={gpcEnabled ? "text-green-400" : "text-white/60"}>{gpcEnabled ? "On" : "Off"}</span></p>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button onClick={handleSave} className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:opacity-90">Save</Button>
                  <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700" onClick={handleReset}>Reset</Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 space-y-4 text-sm text-white/70">
              <p>
                We do not knowingly sell or share the personal information of consumers under 16 years of age without affirmative authorization. Learn more in our <a href="/privacy" className="text-[#38D1BF] hover:underline">Privacy Policy</a>.
              </p>
              <p>
                You may also exercise your right by using a browser or extension that sends a Global Privacy Control (GPC) signal. When we detect GPC, we will treat it as a valid opt-out request for this browser.
              </p>
              <p>
                If you have any questions or would like to exercise your rights through another method, contact us at <a href="mailto:contact@pulsenow.app" className="text-[#38D1BF] hover:underline">contact@pulsenow.app</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoNotSharePage;


