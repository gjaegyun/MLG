import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ExplainBox from "../ExplainBox";
import FadeInBox from "../FadeInBox";

interface DetailTextBoxType {
  name: string;
  age: number[];
  messages: string[];
}

const DetailTextBox = ({ name, age, messages }: DetailTextBoxType) => {
  return (
    <div
      id="textBox"
      className={cn(
        'flex', 'flex-wrap', 'w-[80rem]', 'h-full',
        'justify-center', 'items-center', 'gap-x-4', 'gap-y-1'
      )}
    >
      {age.map((a, idx) => (
        <FadeInBox key={idx}>
          <ExplainBox name={name} age={a} messages={messages[idx]} />
        </FadeInBox>
      ))}
    </div>
  );
};

export default DetailTextBox;