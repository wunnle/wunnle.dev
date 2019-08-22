import matter from 'gray-matter';

async function getWorks() {

  return new Promise((resolve) => {

    const pages = (ctx => {
      const keys = ctx.keys();
      const values = keys.map(ctx);
      const data = keys.map((key, index) => {
        // Create slug from filename
        const slug = key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
        const value = values[index];
        // Parse document
        const document = matter(value.default);
        return {
          document,
          slug
        };
      });
      return data;
    })(require.context('./works', true, /\.md$/));

    resolve(pages)

  })
}

export default getWorks