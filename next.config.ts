import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
export const dynamic = 'force-static'

export async function POST() {

  return Response.json({ oi: [] })
}