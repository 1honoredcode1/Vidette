"use client";

import { useState } from "react";

import { KeyboardIcon, Video } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { createMeeting } from "@/app/action/action";

import Header from "./header";

import OverlayLoader from "@/components/overlay-loader";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const MeetingLanding = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateMeeting = async () => {
    setLoading(true);
    try {
      const newMeet = await createMeeting();
      router.push(`/meet/${newMeet.meetingCode}`);
    } catch {
      toast.add({
        title: "Failed to create meeting",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex-1 pb-0">
        <div className="px-4 space-y-8">
          <div className="flex flex-col max-w-xl mx-auto items-center w-full space-y-6">
            <div className="text-center mx-auto pt-2!">
              <h1 className="text-4xl md:text-5xl lg:text-[45px] font-medium mb-2">
                Video calls and meetings, simplified for your team.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Vidette is a video conference platform built for your team.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center">
              <Button
                className="text-base rounded-full px-5! h-12 font-semibold cursor-pointer"
                onClick={handleCreateMeeting}
              >
                <Video className="h-5 w-5 fill-white! stroke-0!" />
              </Button>
              <div className="flex items-center gap-2 w-full ms:mx-auto justify-around">
                <InputGroup className="h-12! md:w-70 gap-2 rounded-2xl">
                  <InputGroupInput
                    placeholder="Enter meeting ID or URL"
                    className="rounded-md text-base"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <InputGroupAddon>
                    <KeyboardIcon className="h-5 w-5" />
                  </InputGroupAddon>
                </InputGroup>
                <Button
                  variant="default"
                  disabled={!input.trim()}
                  className="rounded-full font-semibold text-primary bg-primary/30 text-base
                    h-12"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full max-w-lg mx-auto">
            <Separator className="my-8 h-[0.2px]" />
            <div className="flex flex-col items-center text-center">
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-full overflow-hidden bg-primary/50 flex items-center
                    justify-center"
              >
                <Image
                  src="/images/hero.jpg"
                  alt="media"
                  width={330}
                  height={400}
                  loading="eager"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-normal">
                  Get a link to share with your team and start a meeting
                  instantly.
                </h3>
                <p className="text-muted-foreground">
                  Click{" "}
                  <span className="font-medium text-primary">
                    Start meeting
                  </span>{" "}
                  to get a link you can share with your team. No sign-ups or
                  downloads required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <OverlayLoader />}
    </>
  );
};

export default MeetingLanding;
