import Comment from "../items/Comment";
import GameResult from "../items/GameResult";
import Post from "../items/Post";
import UserCard from "../items/UserCard";

export type renderType = "game" | "user" | "post" | "post_game" | "post_user" | "comment";

export interface ScrollerParams {
  route? : string,
  options? : {[opt:string] : string},
  title : string,
  type? : renderType,
  optionSelectors? : { [key: string]: string[]; },
  reverseSelector? : boolean,
  keyStart? : string
}

export function render(type : renderType, item : any, index : number, length : number) {
  const z_index = (length - index) * 10;
  switch (type) {
    case "post": return <Post key={index} {...item}/>;
    case "game": return <GameResult key={index} {...item}/>;
    case "user": return <UserCard key={index} {...item}/>;
    case "post_game": return <Post key={index} {...item} type="game"/>;
    case "post_user": return <Post key={index} {...item} type="user"/>;
    case "comment": return <Comment z_index={z_index} key={index} {...item}/>;
  }
}