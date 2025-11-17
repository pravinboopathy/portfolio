/**
 * Social Configuration
 *
 * Loads social links from config.json
 */

type SocialConfig = {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
};

// Default values
const defaults: SocialConfig = {
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
};

// Load configuration from config.json
let configData: { social?: Partial<SocialConfig> } = {};

try {
  configData = await import('../../config.json');
} catch (error) {
  console.warn('config.json not found, using default social links');
}

export const social: SocialConfig = {
  email: configData?.social?.email || defaults.email,
  github: configData?.social?.github || defaults.github,
  linkedin: configData?.social?.linkedin || defaults.linkedin,
  twitter: configData?.social?.twitter || defaults.twitter,
};
