import { User, DefaultReturn } from "../interface/public";
import { CustomPrompt } from "../interface/prompt";

let LoginPrompt: CustomPrompt;

async function LoginService(
  isUser: boolean,
  loginPrompt: CustomPrompt,
  UserDB: User[]
): Promise<DefaultReturn> {
  LoginPrompt = loginPrompt;

  switch (isUser) {
    case true: {
      return await login();
    }

    case false: {
      const { isSignUp } = await loginPrompt({
        name: "isSignUp",
        message: "Would you like to sign up?",
        type: "list",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      });

      if (isSignUp) {
        const signUpResult = await signup(UserDB);
        return signUpResult;
      } else {
        console.log("The fantasy world will wait for you! 🔮");
        return { success: false, data: {} };
      }
    }
  }
}

async function login(): Promise<DefaultReturn> {
  return { success: false, data: {} };
}

async function signup(UserDB: User[]): Promise<DefaultReturn> {
  function validateUserId(id: string) {
    const isEmpty = id ? true : false;
    if (!isEmpty) {
      console.error("⚠️  this id is empty, please input new id");
      return false;
    }

    let isExist: number | boolean = UserDB.findIndex((user) => user.id === id);
    isExist = isExist === -1 ? true : false;

    if (!isExist) {
      console.error("⚠️  this id already exists, please input new id");
      return false;
    }

    return true;
  }

  let isIdValidate = false;
  let id = "";

  while (!isIdValidate) {
    id = await LoginPrompt({
      name: "id",
      message: "Please write id you want to use",
      type: "input",
    }).then((result) => {
      return result.id;
    });

    isIdValidate = validateUserId(id);
  }

  const { pw } = await LoginPrompt({
    name: "pw",
    message: "Please write password you want to use",
    type: "password",
  });

  const { name } = await LoginPrompt({
    name: "name",
    message: "Please write name you want to use",
    type: "input",
  });

  try {
    UserDB.push({
      id,
      pw,
      name,
    });
  } catch (error: any) {
    console.error(error.message);
    return {
      success: false,
      data: {},
      error: { code: "A001", message: "insert" },
    };
  }

  console.log(`Welcome to the world of [Fantasy Story]!, ${name}`);
  return {
    success: true,
    data: {
      userId: id,
    },
  };
}

export default LoginService;
