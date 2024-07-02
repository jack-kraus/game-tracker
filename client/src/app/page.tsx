import InfiniteScroller from '@/components/ui/InfiniteScroller';
import PageScroller from '@/components/ui/PageScroller';

export default function Posts() {
  return <PageScroller
    title="Feed"
    optionSelectors={{
      filter: ["none", "following"],
      order: ["created_at", "likes"]
    }}
  />;
}