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
  updateUser: async (parent, { id, name }, context) => {
    return context.prisma.updateUser({
      where: { id },
      data: {
        name
      }
    });
  },
  createProject: async (
    parent,
    {
      title,
      content,
      isPublic,
      location,
      city,
      country,
      status,
      genres,
      artists,
      links,
      roles
    },
    context
  ) => {
    const userId = getUserId(context);
    return context.prisma.createProject({
      title,
      content,
      isPublic,
      location,
      city,
      country,
      status,
      genres: { set: genres },
      artists: { set: artists },
      links: { set: links },
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
      isPublic,
      location,
      city,
      country,
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
        isPublic,
        location,
        city,
        country,
        status,
        genres: { set: genres },
        artists: { set: artists },
        links: { set: links },
        roles
      }
    });
  },

  createRole: async (parent, { title, content, status }, context) => {
    const userId = getUserId(context);
    return context.prisma.createRole({
      title,
      content,
      status,
      project: { connect: { id: projectId } },
      author: { connect: { id: userId } }
    });
  },
  deleteRole: async (parent, { id }, context) => {
    return context.prisma.deleteRole({ id });
  },
  updateRole: async (parent, { id, title, content, status }, context) => {
    return context.prisma.updateProject({
      where: { id },
      data: {
        title,
        content,
        status
      }
    });
  }
};

module.exports = {
  Mutation
};
