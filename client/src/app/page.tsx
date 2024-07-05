import InfiniteScroller from '@/components/ui/InfiniteScroller';

export default function Feed() {
  return <InfiniteScroller
    title="Feed"
    optionSelectors={{
      filter: ["none", "following"],
      order: ["created_at", "likes"]
    }}
  />;
}