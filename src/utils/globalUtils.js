import { v4 as uuid } from "uuid";
export const createFriend = (name) => {
  return {
    id: uuid(),
    name,
    isFav: false,
  };
};
