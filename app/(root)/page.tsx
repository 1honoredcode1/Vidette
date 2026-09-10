import { getAllMeetings } from "../action/action";

import MeetingLanding from "./_common/meeting-landing";

export default async function Home() {
  const result = await getAllMeetings();
  const meetings = result.data || [];

  return (
    <div className="">
      <MeetingLanding meetings={meetings} />
    </div>
  );
}
