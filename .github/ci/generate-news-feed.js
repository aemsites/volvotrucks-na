import { Feed } from 'feed';
import fs from 'fs';

async function main() {
  let newsFeedConfigurations;

  async function getConfigs() {
    try {
      const NEWS_FEED_CONFIGS = await import('/generate-news-feed-config.js');
      newsFeedConfigurations = NEWS_FEED_CONFIGS;
    } catch (error) {
      console.error('Error importing or processing object:', error);
    }
  }
  getConfigs()

  const {
    ENDPOINT,
    FEED_INFO_ENDPOINT,
    TARGET_DIRECTORY,
    LIMIT,
  } = newsFeedConfigurations;

  const TARGET_FILE = `${TARGET_DIRECTORY}/feed.xml`;
  const PARSED_LIMIT = Number(LIMIT)

  const allPosts = await fetchBlogPosts(ENDPOINT, PARSED_LIMIT);
  console.log(`found ${allPosts.length} posts`);

  const feedMetadata = await fetchBlogMetadata(FEED_INFO_ENDPOINT);

  const newestPost = allPosts
    .map((post) => new Date(post.publishDate * 1000))
    .reduce((maxDate, date) => (date > maxDate ? date : maxDate), new Date(0));
  const feed = new Feed({
    title: feedMetadata.title,
    description: feedMetadata.description,
    id: feedMetadata.link,
    link: feedMetadata.link,
    updated: newestPost,
    generator: 'AEM News feed generator (GitHub action)',
    language: feedMetadata.lang,
  });
  allPosts.forEach((post) => {
    const link = feedMetadata["site-root"] + post.path;
    feed.addItem({
      title: post.title,
      id: link,
      link,
      content: post.description,
      date: new Date(post.publishDate * 1000),
      published: new Date(post.publishDate * 1000),
    });
  });

  if (!fs.existsSync(TARGET_DIRECTORY)) {
    fs.mkdirSync(TARGET_DIRECTORY);
  }
  fs.writeFileSync(TARGET_FILE, feed.atom1());
  console.log('wrote file to ', TARGET_FILE);
}

async function fetchBlogPosts(endpoint, limit) {
  let offset = 0;
  const allPosts = [];

  while (true) {
    const api = new URL(endpoint);
    api.searchParams.append('offset', JSON.stringify(offset));
    api.searchParams.append('limit', limit);
    const response = await fetch(api, {});
    const result = await response.json();
    allPosts.push(...result.data);
    if (result.offset + result.limit < result.total) {
      // there are more pages
      offset = result.offset + result.limit;
    } else {
      break;
    }
  }
  return allPosts;
}

async function fetchBlogMetadata(infoEndpoint) {
  const infoResponse = await fetch(infoEndpoint);
  const feedInfoResult = await infoResponse.json();
  return feedInfoResult.data[0];
}
main()
  .catch((e) => console.error(e));
  