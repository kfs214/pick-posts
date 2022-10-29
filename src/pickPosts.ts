import WPAPI from 'wpapi';

type PickPostsArgs = {
  endpoint: string;
  categories?: number[];
  postLimit?: number;
};

const MAX_POST_LENGTH = 100;

const getPickedPostLimit = (inputPostLimit?: number) => {
  if (inputPostLimit === 0) return 0;
  if (!inputPostLimit) return 1;
  if (inputPostLimit > MAX_POST_LENGTH) {
    console.log(`up to ${MAX_POST_LENGTH} posts to be picked`);
    return MAX_POST_LENGTH;
  }
  return inputPostLimit;
};

const getPickedOffsets = (totalPosts: number, length: number) => {
  const candidates = [...Array(totalPosts).keys()];

  if (totalPosts <= length) {
    console.log(`matched posts: ${totalPosts}. all of them to be returned`);
    return candidates;
  }

  const pickedOffsets: number[] = [];

  [...Array(length)].forEach(() => {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const [pickedItem] = candidates.splice(randomIndex);

    pickedOffsets.push(pickedItem);
  });

  return pickedOffsets;
};

export const pickPosts = async (args: PickPostsArgs) => {
  const { endpoint, categories, postLimit } = args;
  const wp = new WPAPI({ endpoint });

  const pickedPostLimit = getPickedPostLimit(postLimit);
  console.log(`up to ${pickedPostLimit} post(s) to be picked`);

  const wpPostsRequest = (categories ? wp.posts().param({ categories }) : wp.posts()).perPage(1);

  const {
    _paging: { total: totalPosts },
  } = await wpPostsRequest.param({ _fields: ['id'] }).get();
  console.log('matched posts:', totalPosts);

  const pickedOffsets = getPickedOffsets(totalPosts, pickedPostLimit);

  const posts = await Promise.all(
    pickedOffsets.map(async (pickedOffset) =>
      wpPostsRequest
        .param({ _fields: ['title', 'link'] })
        .offset(pickedOffset)
        .get()
        .catch((e) => {
          console.error(e);
          return;
        })
    )
  );

  return posts
    .filter((e) => e)
    .map(
      ([
        {
          link,
          title: { rendered },
        },
      ]) => ({ link, title: rendered })
    );
};
