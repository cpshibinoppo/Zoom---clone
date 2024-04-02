import React from "react";

interface ChildProps {
  title: string;
}

const Heading = (props: ChildProps) => {
  return (
    <section className=" flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">{props.title}</h1>
    </section>
  );
};

export default Heading;
