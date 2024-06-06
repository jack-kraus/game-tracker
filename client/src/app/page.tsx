import Post from "@/components/Post";

const post = {
  title: "An okay experience",
  game: "The Messenger",
  review: "This game sucks ass",
  rating: 3,
  author: "Steve",
  timestamp: new Date().toDateString()
};

export default function Home() {
  return (
    <main className="flex flex-col w-screen items-center mt-4 gap-3 pt-24 pb-4 mx-auto">
      <h1 className="text-scale-0 underline">Feed</h1>
      <Post {...post}/>
      <Post {...post}/>
      <Post {...post}/>
      <Post {...post}/>
      <Post {...post}/>
      <Post {...post}/>
      <Post {...post}/>
      <Post {...post}/>
    </main>
  );
}
