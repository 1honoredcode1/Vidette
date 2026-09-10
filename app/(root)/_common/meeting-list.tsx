"use client";

import { format } from "date-fns";

import { useRouter } from "next/navigation";

import { ArrowRight, CopyIcon, VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

type PropType = {
  meetings?: {
    id: string;
    meetingCode: string;
    userId: string;
    createdAt: Date;
  }[];
};

const MeetingList = ({ meetings }: PropType) => {
  const router = useRouter();
  const handleCopy = (code: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const link = `${(window.location, origin)}/meet/${code}`;
    navigator.clipboard.writeText(link);
    toast.add({ description: "Meeting link copied to clipboard" });
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">Recent Meetings</h2>
      </div>
      <div className="space-y-2">
        {meetings?.map((meeting) => {
          return (
            <div
              onClick={() => router.push(`/meet/${meeting.meetingCode}`)}
              className="flex items-center gap-4 py-2 px-2 rounded-lg border
                transition-all hover:shadow-sm bg-card/60 border-border cursor-pointer"
              role="button"
              key={meeting.id}
            >
              <div className="flex-1 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center shrink-0
                            shadow-md "
                >
                  <VideoIcon className="text-white" size={18} />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">
                    {meeting.meetingCode}{" "}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Created: {format(new Date(meeting.createdAt), "PPP * p")}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="-mr-1"
                  onClick={(e) => handleCopy(meeting.meetingCode, e)}
                >
                  <CopyIcon className="w-4 h-4" />
                </Button>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="-mr-1"
                  onClick={() => {}}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeetingList;
