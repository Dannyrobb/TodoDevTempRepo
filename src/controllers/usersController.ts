import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import fastify from "../server";
import { User } from "../types";
import prisma from "../db/prisma";
import { OAuth2Client } from "google-auth-library";
import { getUserData } from "../api/oauth";
export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password, fname, lname } = request.body as User;
  try {
    const users = await prisma.users.findMany();
    if (users.find((user) => user.email === email)) {
      return reply.status(400).send({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        fname,
        lname,
      },
    });
    if (!newUser) {
      return reply.status(400).send({ error: "There was an error creating the user" });
    }
    reply.send({ message: "User created successfully" });
  } catch (e) {}
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    const token = (fastify as FastifyInstance & { jwt: any }).jwt.sign({ id: user.id, email: user.email });
    reply.setCookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    reply.send({ token });
  } catch (e) {
    return reply.status(400).send({ error: "There was an error creating the user" });
  }
};

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send("good job you found me");
};

export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  // const { id } = request.params as { id: string };
  // const user = users.find((u) => u.id === parseInt(id));
  // if (!user) {
  //   return reply.status(404).send({ error: "User not found" });
  // }
  // reply.send(user);
};
export async function logout(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");

  return reply.send({ message: "Logout successful" });
}

export const authUrl = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.headers({ "access-control-allow-origin": "http://localhost:5173", "referrer-policy": "no-referrer-when-downgrade" });
  const redirectUrl = "http://127.0.0.1:3000/oauth";
  const oAuth2Client = new OAuth2Client(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, redirectUrl);
  console.log(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, redirectUrl);
  //Make sure refresh token is sent
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
    prompt: "consent",
  });
  console.log(authorizeUrl);
  reply.send({ url: authorizeUrl });
};

export const getGoogleUserData = async (request: FastifyRequest, reply: FastifyReply) => {
  const { code } = request.query as { code: string };
  try {
    const redirectUrl = "http://127.0.0.1:3000/oauth";
    const oAuth2Client = new OAuth2Client(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, redirectUrl);
    const res = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(res.tokens);
    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    if (user.access_token) {
      await getUserData(user.access_token);
    } else {
      console.log("Access token is missing");
    }
  } catch (e) {
    console.log("Error with singing in with google");
  }
};

export const htmlAuth = async (request: FastifyRequest<{ Params: { credential: string } }>, reply: FastifyReply) => {
  const credential = request.params.credential;
  console.log("Credential", credential);
  const cookies = request.cookies;
  const token = cookies.g_csrf_token;
  console.log("Cookies", cookies);

  console.log("Token", token);

  const client = new OAuth2Client(process.env.CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    if (payload) {
      const userid = payload["sub"];
      console.log("payload", payload);
      console.log("userid", userid);
    }

    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  await verify().catch(console.error);
  reply.send("testing 123");
};
