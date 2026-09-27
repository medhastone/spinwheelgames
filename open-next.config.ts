// OpenNext Cloudflare configuration for Next.js App Router
const config = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy'
    }
  }
};

export default config;
