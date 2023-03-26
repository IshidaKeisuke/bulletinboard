/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  env: {
      NEXT_PUBLIC_HASURA_ENDPOINT: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
      NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
  },
};
