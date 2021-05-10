import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const providers = [
  Providers.Credentials({
    id: 'user',
    name: 'user',
    authorize: async (credentials) => {
      try {
        const user = await axios.post(
          `https://shipko.mavinx.com/api-client/login`,
          {
            email: credentials.email,
            password: credentials.password,
          },
        );
        if (user.status) {
          return Promise.resolve({
            status: 'success',
            data: user.data.data,
            role: 'user',
          });
        }
      } catch (e) {
        console.log(e);
        // This will return the error object to the signIn callback
        const errorMessage = e.response.data.message;

        return Promise.resolve({
          status: 'error',
          message: errorMessage,
          email: credentials.email,
        });
      }
    },
  }),
  Providers.Credentials({
    id: 'admin',
    name: 'admin',
    authorize: async (credentials) => {
      try {
        const admin = await axios.post(
          `https://shipko.mavinx.com/api-admin/login`,
          {
            email: credentials.email,
            password: credentials.password,
          },
        );

        console.log(admin);

        if (admin.status) {
          return Promise.resolve({
            status: 'success',
            data: admin.data.data,
            role: 'admin',
          });
        }
      } catch (e) {
        // This will return the error object to the signIn callback
        const errorMessage = e.response.data.message;

        return Promise.resolve({
          status: 'error',
          message: errorMessage,
          email: credentials.email,
        });
      }
    },
  }),
];

const callbacks = {
  signIn: async (user) => {
    if (user.status === 'error') {
      // Redirecting to the login page with error messsage in the URL
      return Promise.reject(new Error(`${user?.message}&email=${user?.email}`));
    }

    return Promise.resolve(user);
  },

  async jwt(token, user) {
    const updatedToken = { ...token };

    if (user) {
      console.log(user);
      updatedToken.accessToken = user.data.data.auth.token;
      updatedToken.user = {
        name: user.data.data.user.name,
        email: user.data.data.user.email,
        role: user.role,
      };
    }

    return updatedToken;
  },

  async session(session, token) {
    const updatedSession = { ...session };

    updatedSession.accessToken = token.accessToken;
    updatedSession.user = token.user;

    return Promise.resolve(updatedSession);
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    error: '/', // Changing the error redirect page to our custom login page
  },
};

export default (req, res) => NextAuth(req, res, options);
