import { ReactNode } from "react";
import Comment from "../items/Comment";
import GameResult from "../items/GameResult";
import Post from "../items/Post";
import UserCard from "../items/UserCard";

export type renderType = "game" | "user" | "post" | "post_game" | "post_user" | "comment";

export interface ScrollerParams {
  route? : string,
  options? : {[opt:string] : string | boolean},
  title : string,
  type? : renderType,
  optionSelectors? : { [key: string]: string[]; },
  reverseSelector? : boolean,
  keyStart? : string
}

export function render(type : renderType, item : any, index : number, length : number) {
  const z_index = (length - index) * 10;
  let element : ReactNode;
  switch (type) {
    case "post":
      element = <Post key={index} {...item}/>;
      break;
    case "game":
      element = <GameResult key={index} {...item}/>;
      break;
    case "user":
      element = <UserCard key={index} {...item}/>;
      break;
    case "post_game":
      element = <Post key={index} {...item} type="game"/>;
      break;
    case "post_user":
      element = <Post key={index} {...item} type="user"/>;
      break;
    case "comment":
      element = <Comment z_index={z_index} key={index} {...item}/>;
      return <div className="w-full" style={{ zIndex: z_index }} key={`item_${type}_${item.id ?? index}`}>{element}</div>;
  }
  return <div className="w-full" key={`item_${type}_${item.id ?? index}`}>{element}</div>;
}