export type TSubscriberStatus = "active" | "unsubscribed";

export type TSubscriber = {
  email: string;

  status: TSubscriberStatus;

  source?: string; // homepage, footer, popup
  isDeleted?: boolean;
};