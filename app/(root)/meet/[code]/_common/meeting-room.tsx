"use client";

import { useRef, useEffect } from "react";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import { Spinner } from "@/components/ui/spinner";

type MeetingRoomProps = {
  meeting?: {
    id: string;
    meetingCode: string;
    userId: string;
    createdAt: Date;
  } | null;
};

const MeetingRoom = ({ meeting }: MeetingRoomProps) => {
  const { user, isLoading } = useKindeBrowserClient();
  const zegoRef = useRef<ZegoUIKitPrebuilt | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const name = `${user?.given_name} ${user?.family_name}`;
  const userId = meeting?.userId || "";
  const code = meeting?.meetingCode;

  const playJoinNotificationSound = () => {
    if (typeof window !== "undefined") {
      new Audio("/audio/join.mp3").play().catch(console.error);
    }
  };

  const playLeaveNotificationSound = () => {
    if (typeof window !== "undefined") {
      new Audio("/audio/leave.mp3").play().catch(console.error);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !userId || !code) return;
    if (zegoRef.current) return;

    const startCall = async () => {
      const appid = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appid,
        serverSecret,
        code,
        userId,
        name,
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zegoRef.current = zp;
      zp.joinRoom({
        container: containerRef.current,
        preJoinViewConfig: { title: "" },
        sharedLinks: [
          {
            name: "Share this link",
            url: `${window.location.origin}/meet/${code}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        onJoinRoom() {
          playJoinNotificationSound();
        },
        onLeaveRoom() {
          playLeaveNotificationSound();
        },
        onUserJoin() {
          playJoinNotificationSound();
        },
        onUserLeave() {
          playLeaveNotificationSound();
        },
      });
      zp.autoLeaveRoomWhenOnlySelfInRoom = true;
    };
    startCall();
    return () => {
      zegoRef.current?.hangUp();
      zegoRef.current?.destroy();
      zegoRef.current = null;
    };
  }, [userId, name, code]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Spinner className="h-18 w-18" />
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full"></div>;
};

export default MeetingRoom;
