"use server";

import prisma from "@/lib/prisma";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { generateMeetingCode } from "@/lib/utils";

export async function createMeeting() {
  const session = getKindeServerSession();
  const user = await session.getUser();
  if (!user) throw new Error("User not found");

  const meetingCode = generateMeetingCode();

  const meeting = await prisma.meeting.create({
    data: {
      meetingCode,
      userId: user.id,
    },
  });
  return meeting;
}
