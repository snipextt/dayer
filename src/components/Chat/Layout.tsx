import { FC, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { ScrollShadow } from "@nextui-org/react";
import { KeyboardEvent, useState } from "react";
import { Link2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import IconWrapper from "../ui/IconWrapper";
import { useServices } from "@/providers/ServiceProvider";
import { DateRange } from "react-day-picker";
import {
  AssistantStateResponse,
  Message,
  OpenAITextMessageContent,
} from "@/schema/chat";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { Button } from "../Layout/Button";
import { Link } from "react-router-dom";

interface ChatLayoutProps {
  selectedRange: DateRange;
  teamId: string;
}

export const ChatLayout: FC<ChatLayoutProps> = ({ selectedRange, teamId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUser();
  const { organization } = useOrganization();
  const [polling, setPolling] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { assistatService } = useServices();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, 0);
  };

  const parseLinksInMessage = (message?: OpenAITextMessageContent): string => {
    const links = message?.annotations.reduce((map, annotation) => {
      map[annotation.text] = annotation.file_path?.file_id;
      return map;
    }, {});
    const messageContents = message?.value?.split(/\(|\)/);
    let lengthToTravrse = messageContents?.length || 0;
    for (let i = 0; i < lengthToTravrse; i++) {
      const content = messageContents?.[i];
      if (!content) continue;
      if (links?.[content]) {
        messageContents.splice(i, 0, "(");
        messageContents.splice(
          i + 1,
          1,
          assistatService.getFilePath(links[content]),
        );
        messageContents.splice(i + 2, 0, ")");
      }
      lengthToTravrse = messageContents?.length || 0;
    }
    return messageContents?.join("") || "";
  };

  const setMessagesFromResponse = (state: AssistantStateResponse) => {
    if (!state) return;
    const messageHistory = new Array<Message>();
    state?.messages.forEach((message) => {
      message.content.forEach((content) => {
        messageHistory.push({
          sender: message.role,
          createdAt: message.created_at,
          content: parseLinksInMessage(content.text),
          preview: content.image_file?.file_id,
          type: content.type,
        });
      });
    });
    setMessages(messageHistory.reverse());
    if (state?.poll) {
      pollUntilCompletion();
    } else {
      setPolling(false);
    }
    scrollToBottom();
  };

  const pollUntilCompletion = async () => {
    if (!polling) {
      setPolling(true);
      const res = await assistatService.pollCompletion(teamId, selectedRange);
      setMessagesFromResponse(res.data);
    }
  };

  const fetchChat = async () => {
    const state = await assistatService.getCurrentState();
    setMessagesFromResponse(state.data);
  };

  const onMessageInputChanged = async (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          content: message,
          createdAt: new Date().getTime(),
        },
      ]);
      scrollToBottom();
      setMessage("");
      await assistatService.createMessage(
        message,
        selectedRange,
        teamId,
      );
      pollUntilCompletion();
      scrollToBottom();
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-end pb-4 gap-4">
      {messages.length > 0 && (
        <ScrollShadow
          ref={messagesContainerRef}
          className="h-[calc(100vh-300px)] flex flex-col pb-6 gap-6"
        >
          {messages.map((message, index) => (
            <div className="flex gap-3" key={index}>
              <img
                src={message.sender === "user"
                  ? user?.imageUrl
                  : organization?.imageUrl}
                className="w-8 h-8 rounded-full"
              />
              <div className="gap-px grid">
                <h5 className="text-muted-foreground text-sm font-semibold">
                  {message.sender === "user" ? "You" : "Assistant"}
                </h5>
                {message.preview && (
                  <img
                    src={assistatService.getFilePath(message.preview)}
                    className="max-h-[480px] cursor-pointer"
                  />
                )}
                <Markdown
                  components={{
                    a: ({ ...props }) => {
                      return <Link to={props.href!}><Button variant="outline" className="h-9 my-1 px-3 mx-2">{props.children}</Button></Link>
                    },
                  }}
                  className="text-foreground reset-normalize"
                >
                  {message.content}
                </Markdown>
              </div>
            </div>
          ))}
          {polling && (
            <div className="flex gap-3">
              <h5 className="text-muted-foreground text-sm font-semibold">
                Assistant
              </h5>
              <div className="gap-px grid">
                <h5 className="text-muted-foreground text-sm font-semibold">
                  Working on it...
                </h5>
              </div>
            </div>
          )}
        </ScrollShadow>
      )}

      {messages.length === 0 &&
        (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border bg-muted text-muted-foreground rounded-lg flex flex-col justify-center cursor-pointer">
              <h4 className="text-foreground">General</h4>
              <p className="text-sm">
                What can you help me with?
              </p>
            </div>
            <div className="p-4 border bg-muted text-muted-foreground rounded-lg flex flex-col justify-center cursor-pointer">
              <h4 className="text-foreground">Productivity Insights</h4>
              <p className="text-sm">
                Give me a summary of everyone's day
              </p>
            </div>
            <div className="p-4 border bg-muted text-muted-foreground rounded-lg flex flex-col justify-center cursor-pointer">
              <h4 className="text-foreground">Projects Insights</h4>
              <p className="text-sm">
                What's the status of the project?
              </p>
            </div>
            <div className="p-4 border bg-muted text-muted-foreground rounded-lg flex flex-col justify-center cursor-pointer">
              <h4 className="text-foreground">Pending Tasks</h4>
              <p className="text-sm">
                Do we have any pending tasks?
              </p>
            </div>
          </div>
        )}

      <div className="relative">
        <textarea
          disabled={polling}
          value={message}
          onKeyUp={(e) => onMessageInputChanged(e)}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-24 border-1 bg-secondary border-input p-2 pr-11 resize-none rounded-lg focus:outline-none"
          placeholder="Message Assistant"
        />
        <div className="absolute flex justify-end bottom-2 right-1">
          <IconWrapper
            label="Attach File"
            children={
              <div className="p-2 border bg-background text-foreground rounded-lg">
                <Link2Icon />
              </div>
            }
          />
          <IconWrapper
            label="Send"
            children={
              <div className="p-2 border bg-background text-foreground rounded-lg">
                <PaperPlaneIcon />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
