import { Subscriber } from "./subscriber.model";

// CREATE (SUBSCRIBE)
const createSubscriber = async (email: string, source?: string) => {
  const exists = await Subscriber.findOne({ email });

  if (exists) {
    return exists; // already subscribed
  }

  return await Subscriber.create({
    email,
    source,
  });
};

// GET ALL (ADMIN)
const getAllSubscribers = async () => {
  return await Subscriber.find({ isDeleted: false }).sort({ createdAt: -1 });
};

// DELETE
const deleteSubscriber = async (id: string) => {
  return await Subscriber.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

// UNSUBSCRIBE
const unsubscribe = async (email: string) => {
  return await Subscriber.findOneAndUpdate(
    { email },
    { status: "unsubscribed" },
    { new: true }
  );
};

export const SubscriberService = {
  createSubscriber,
  getAllSubscribers,
  deleteSubscriber,
  unsubscribe,
};