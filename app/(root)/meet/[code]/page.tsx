import { getMeetingByCode } from "@/app/action/action";

import MeetingRoom from "./_common/meeting-room";

import Logo from "@/components/logo";

type PropType = {
  params: {
    code: string;
  };
};

async function MeetingPage({ params }: PropType) {
  const { code } = params;
  const meetingResponse = await getMeetingByCode(code);

  if (!meetingResponse.success) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>{meetingResponse.error}</p>
      </div>
    );
  }
  const meeting = meetingResponse.data;

  return (
    <div className="w-full h-screen bg-[#1e2130] px-10">
      <div className="absolute top-2 left-4 z-50">
        <Logo className="text-white" />
      </div>
      <MeetingRoom meeting={meeting} />
    </div>
  );
}

export default MeetingPage;
