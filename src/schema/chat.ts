export interface Message {
  sender: "user" | "assistant";
  content?: string;
  preview?: string;
  type?: "text" | "image_file";
  createdAt: number;
}

export interface OpenAITextMessageContent { value: string, annotations: Array<any> };

export interface OpenAIMessageContent {
  type: "text" | "image_file";
  text?: ;
  image_file?: { file_id: string };
}

export interface OpenAIMessage {
  created_at: number;
  role: "user" | "assistant";
  content: OpenAIMessageContent[];
}

export interface AssistantStateResponse {
  messages: OpenAIMessage[];
  poll: boolean;
}
