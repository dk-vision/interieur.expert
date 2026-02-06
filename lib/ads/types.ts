export interface Campaign {
  _id: string;
  title: string;
  slot: string;
  priority: number;
  targetCategory?: string;
  targetTags?: string[];
  creative: {
    title: string;
    format: "image" | "html";
    linkUrl: string;
    altText?: string;
    image?: {
      asset: unknown;
    };
    html?: string;
  };
}
