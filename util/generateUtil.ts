import { v4 as uuid } from "uuid";

export const makeUserId = () => {
  return `uid_${uuid().replace(/-/g, "")}`;
};

export const makeUserName = () => {
  return `user_${uuid().replace(/-/g, "").substring(0, 8)}`;
};
