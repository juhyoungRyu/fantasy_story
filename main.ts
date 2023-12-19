import Game from "inquirer";
import LoginService from "./service/LoginService";
import { PromptParam } from "./interface/prompt";
import { userRepo } from "./db/userDB";

async function GamePrompt({ name, message, type, choices }: PromptParam) {
  const result = await Game.prompt({
    name,
    message,
    type,
    choices,
  });

  return result;
}

async function main(): Promise<void> {
  console.log("⚔️  Fantasy Story 🛡️");

  const { isUser } = await Game.prompt({
    name: "isUser",
    message: "Did you play it before?",
    type: "list",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  });

  const isLogin = await LoginService(isUser, GamePrompt, userRepo);

  console.log(isLogin.data);
}

main();
