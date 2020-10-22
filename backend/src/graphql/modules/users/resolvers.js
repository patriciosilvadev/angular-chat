import User from "../../../models/User";
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

async function decodeToken(token) {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
      maxExpiry: 1000000000000,
    });
    const payload = ticket.getPayload();
    const userData = {
      google_id: payload["sub"],
      name: payload["name"],
      email: payload["email"],
      picture: payload["picture"],
    };
    return userData;
  } catch (error) {
    throw "Invalid Token!";
  }
}

export default {
  Query: {
    users: () => User.find(),
    user: (parent, { id }) => User.findById(id),
  },
  Mutation: {
    setUser: async (parent, { token }) => {
      const tokenPayload = await decodeToken(token);
      const userExists = await User.exists({
        google_id: tokenPayload.google_id,
      });
      if (userExists) {
        return await User.findOne({ google_id: tokenPayload.google_id });
      } else {
        return await User.create(tokenPayload);
      }
    },
  },
};
