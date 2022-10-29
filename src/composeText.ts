type Args = {
  heading?: string;
  posts: Array<{
    title: string;
    link: string;
  }>;
};

export const composeText = (args: Args): string => {
  const { heading, posts } = args;

  const postsStringified = posts.map(({ title, link }) => `${title}\n${link}`).join('\n\n');

  return `${heading ? heading + '\n\n\n' : ''}${postsStringified}`;
};
