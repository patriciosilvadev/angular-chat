import Message from "../../../models/Message";
import User from "../../../models/User";
import { NEW_MESSAGE } from "../../channels";

export default {
  Message: {
    user: (message) => User.findById(message.user),
  },
  Query: {
    getMessages: () => {
      const msgs = Message.find();
      return msgs;
    },
    getMessage: (parent, { id }) => {
      const msg = Message.findById(id);
      return msg;
    },
  },
  Mutation: {
    sendMessage: async (parent, { content, user }, { pubsub }) => {
      const message = await Message.create({ content, user });
      pubsub.publish(NEW_MESSAGE, {
        newMessage: message,
      });
      return message;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};
