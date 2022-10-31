/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { pickPosts } from './pickPosts';
import { composeText } from './composeText';

const getProperties = () => {
  const endpoint = PropertiesService.getScriptProperties().getProperty('endpoint');

  const heading = PropertiesService.getScriptProperties().getProperty('heading') ?? '';

  const footer = PropertiesService.getScriptProperties().getProperty('footer') ?? '';

  const postLimitProperty = PropertiesService.getScriptProperties().getProperty('postLimit') ?? '';
  const postLimit = isNaN(+postLimitProperty) ? 1 : +postLimitProperty;

  const categoriesProperty =
    PropertiesService.getScriptProperties().getProperty('categories') ?? '';
  const categories = categoriesProperty
    .split(' ')
    .map((categoryStr) => +categoryStr)
    .filter((e) => !isNaN(e));

  const subject = PropertiesService.getScriptProperties().getProperty('subject') ?? '';
  const address = PropertiesService.getScriptProperties().getProperty('address');

  return { endpoint, address, subject, heading, postLimit, categories, footer };
};

const app = async (): Promise<void> => {
  const { endpoint, address, subject, heading, postLimit, categories, footer } = getProperties();
  if (!endpoint || !address) {
    console.log(
      `${endpoint ? '' : 'endpoint'}${address ? '' : 'address'} is missing. ending process...`
    );
    return;
  }

  const posts = await pickPosts({
    endpoint,
    postLimit,
    categories,
  });

  if (!posts.length) {
    console.log('picked 0 post. ending process...');
    return;
  }

  const composedTextStringified = JSON.stringify(composeText({ heading, posts, footer }));
  try {
    console.log('sending e-mail...');
    GmailApp.sendEmail(address, subject, composedTextStringified);
  } catch (error) {
    console.error(error);
  }

  console.log('completed!');
};

void app();
