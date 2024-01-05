import Game from "inquirer";

import { UserService } from "./service/UserService";
import { userRepo } from "./db/userDB";

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

  const isLogin = await new UserService(isUser, userRepo).login();

  console.log(isLogin.data);
}

main();
