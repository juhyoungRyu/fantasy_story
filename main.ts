import Game from "inquirer";
import LoginService from "./service/LoginService";
import { PromptParam } from "./interface/prompt";
import { userRepo } from "./db/userDB";

// TODO: BaseService class 생성 후 inquirer를 DI 시킬 수 있게 구조 변경

/**
 * GamePrompt
 * @desc main 외 파일에서 inquirer를 사용하기 함수, 추후 BaseService 개발 후 사라질 예정
 */
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
