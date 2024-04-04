"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meethingState, setMeetingState] = useState<
    "isScheduleMeething" | "isJoiningMeething" | "isInstantMeething" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  return (
    <section className="grid gird-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New Meeting"
        description="Start an instant meeting"
        img="/icons/add-meeting.svg"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeething")}
      />
      <HomeCard
        title="Join Meeting"
        description="via invitation link"
        img="/icons/join-meeting.svg"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeething")}
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
      <MeetingModel
        isOpen={meethingState === "isInstantMeething"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
