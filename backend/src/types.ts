export interface RssItem {
  creator: string;
  title: string;
  content: string;
  link: string;
  pubDate: string;
}

export interface RssFeed {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  items: RssItem[];
}
