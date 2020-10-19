import { startServer } from "./services/serverService";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

startServer({ typeDefs, resolvers });
