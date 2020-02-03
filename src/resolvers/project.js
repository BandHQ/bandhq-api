const Project = {
  author: ({ id }, args, context) => {
    return context.prisma.project({ id }).author();
  },

  roles: ({ id }, args, context) => {
    return context.prisma.project({ id }).roles();
  }
};

module.exports = {
  Project
};
