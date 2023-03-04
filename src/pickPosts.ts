import axios from 'axios';

type PickPostsArgs = {
  wpEndpoint: string;
  apiEndpoint: string;
  categories?: number[];
  postLimit?: number;
};

type Posts = Array<{
  link: any;
  title: any;
}>;

export const pickPosts = async (args: PickPostsArgs): Promise<Posts> => {
  const { wpEndpoint, apiEndpoint, categories, postLimit } = args;
  console.log('api access to be made...');

  return axios
    .get(apiEndpoint, {
      params: {
        endpoint: wpEndpoint,
        categories,
        postLimit,
      },
    })
    .then((res) => res.data as Posts)
    .catch((e) => {
      console.error('something went wrong while calling CHIgusa-iro API... error:', e);
      return [];
    });
};
