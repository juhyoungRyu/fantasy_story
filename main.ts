import { UserService } from "./service/UserService";
import { userRepo } from "./db/demoDB";

const userService = new UserService(userRepo);

userService.addUser([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
console.log(userService.getUserList());
