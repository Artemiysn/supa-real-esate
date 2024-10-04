import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from './modules/db';
import { Session, User } from '@auth/core/types';
 
export const authOptions = {
  callbacks: {
    session: ({ session, user } : {session: Session, user: User}) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
 
export const getServerAuthSession = () => getServerSession(authOptions);