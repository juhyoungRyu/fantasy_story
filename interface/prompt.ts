export interface PromptParam {
  name: string;
  message: string;
  type: "input" | "list" | "checkbox" | "password";
  choices?: {
    name: string;
    value: string | boolean;
  }[];
}

export interface CustomPrompt {
  (promptParam: PromptParam): Promise<{ [key: string]: string }>;
}
