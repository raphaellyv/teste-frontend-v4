/** @type {import('next').NextConfig} */
import moduleAlias from 'module-alias'

moduleAlias.addAlias('punycode', 'punycode/')

const nextConfig = {
  devIndicators: false
};

export default nextConfig;
