"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meethingState, setMeetingState] = useState<
    "isScheduleMeething" | "isJoiningMeething" | "isInstantMeething" | undefined
  >();
  return (
    <section className="grid gird-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New Meeting"
        description="Start an instant meeting"
        img="/icons/add-meeting.svg"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isJoiningMeething")}
      />
      <HomeCard
        title="Join Meeting"
        description="via invitation link"
        img="/icons/join-meeting.svg"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isInstantMeething")}
      />
      <HomeCard
        title="Schedule Meeting"
        description="Plan your meeting"
        img="/icons/Schedule.svg"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeething")}
      />
      <HomeCard
        title="View Recordings"
        description="Check out your recordings"
        img="/icons/recordings.svg"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
    </section>
  );
};

export default MeetingTypeList;
