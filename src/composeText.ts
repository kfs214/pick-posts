type Args = {
  heading?: string;
  posts: {
    title: string;
    link: string;
  }[];
};

export const composeText = (args: Args) => {
  const { heading, posts } = args;

  const postsStringified = posts.map(({ title, link }) => `${title}\n${link}`).join('\n\n');

  return `${heading ? heading + '\n\n\n' : ''}${postsStringified}`;
};
