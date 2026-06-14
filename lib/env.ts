function requiredEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const apiBaseUrl = requiredEnv(
  "NEXT_PUBLIC_API_BASE_URL",
  process.env.NEXT_PUBLIC_API_BASE_URL,
);

export const imageRemoteHostname = requiredEnv(
  "NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME",
  process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME,
);
