import { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      jobTitle?: string;
      picture?: string;
      storeId?: string;
    };
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    jobTitle?: string;
    picture?: string;
    storeId?: string;
  }
}
