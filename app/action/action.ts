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

export async function getMeetingByCode(meetingCode: string) {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();
    if (!user) throw new Error("User not found");

    const meeting = await prisma.meeting.findFirst({
      where: { meetingCode },
    });
    return { success: true, data: meeting };
  } catch (error) {
    console.log("Error occured", error);
    return { success: false, error: "Failed to get meeting!" };
  }
}

export async function getAllMeetings() {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();
    if (!user) throw new Error("User not found");

    const meetings = await prisma.meeting.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return { success: true, data: meetings };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch all the meetings!" };
  }
}
