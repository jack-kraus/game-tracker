import InfiniteScroller from '@/components/ui/InfiniteScroller';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: "Check out the newest reviews among your friends and in the community"
};

export default function Feed() {
  return <InfiniteScroller
    title="Feed"
    optionSelectors={{
      filter: ["none", "following"],
      order: ["created_at", "likes", "rating"],
      last: ["all", "day", "week", "month"]
    }}
    keyStart='posts'
    reverseSelector={true}
  />;
}