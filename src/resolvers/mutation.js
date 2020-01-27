const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const Mutation = {
  signup: async (parent, { name, email, password }, context) => {
    const hashedPassword = await hash(password, 10);
    const user = await context.prisma.createUser({
      name,
      email,
      password: hashedPassword
    });
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  },
  login: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new Error("Invalid password");
    }
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  },
  createProject: async (
    parent,
    { title, content, public, location, status, genres, artists, links, roles },
    context
  ) => {
    const userId = getUserId(context);
    return context.prisma.createProject({
      title,
      content,
      public,
      location,
      status,
      genres,
      artists,
      links,
      roles,
      author: { connect: { id: userId } }
    });
  },
  deleteProject: async (parent, { id }, context) => {
    return context.prisma.deleteProject({ id });
  },
  updateProject: async (
    parent,
    {
      id,
      title,
      content,
      public,
      location,
      status,
      genres,
      artists,
      links,
      roles
    },
    context
  ) => {
    return context.prisma.updateProject({
      where: { id },
      data: {
        title,
        content,
        public,
        location,
        status,
        genres,
        artists,
        links,
        roles
      }
    });
  }
};

module.exports = {
  Mutation
};
