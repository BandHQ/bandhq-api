const { getUserId } = require("../utils");

const Query = {
  user: (parent, args, context) => {
    const userId = getUserId(context);
    return context.prisma.user({ id: userId });
  },

  user: (parent, args, context) => {
    const userId = getUserId(context);
    return context.prisma.user({ id: userId });
  },

  projects: (parent, args, context) => {
    return context.prisma.projects({ where: { isPublic: true } });
  },
  // filterProjects: (parent, { searchString }, context) => {
  //   return context.prisma.projects({
  //     where: {
  //       OR: [
  //         {
  //           title_contains: searchString,
  //         },
  //         {
  //           content_contains: searchString,
  //         },
  //       ],
  //     },
  //   })
  // },
  project: (parent, { id }, context) => {
    return context.prisma.project({ id });
  }
};

module.exports = {
  Query
};
