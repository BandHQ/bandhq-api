const Project = {
  author: ({ id }, args, context) => {
    return context.prisma.project({ id }).author();
  }
};

module.exports = {
  Project
};
