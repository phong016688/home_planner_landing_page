export type PrivacyPolicyBlock =
  | {
      kind: 'paragraph';
      text: string;
      tone?: 'default' | 'lead' | 'italic';
      spacing?: 'top';
    }
  | {
      kind: 'list';
      items: string[];
    }
  | {
      kind: 'heading';
      text: string;
    };

export type PrivacyPolicyDetail = {
  label: string;
  text: string;
  href?: string;
  external?: boolean;
};

export const privacyPolicy = {
  title: 'Privacy Policy',
  lastUpdated: 'July 25, 2026',
  details: [
    {
      label: 'App name:',
      text: 'Home Planner AI',
    },
    {
      label: 'Developer:',
      text: 'Hai Vo',
    },
    {
      label: 'Legal owner:',
      text: 'VO DUC HAI',
    },
    {
      label: 'Contact:',
      text: 'personpick11@gmail.com',
      href: 'mailto:personpick11@gmail.com',
    },
    {
      label: 'Website:',
      text: 'https://homeplanner.app/',
      href: 'https://homeplanner.app/',
      external: true,
    },
  ],
  intro: [
    {
      kind: 'paragraph',
      tone: 'lead',
      text: 'This Privacy Policy explains how Home Planner AI ("the App," "we," "us," or "our") collects, uses, processes, stores, and shares information when you use the App and related web services.',
    },
    {
      kind: 'paragraph',
      spacing: 'top',
      text: 'We value your privacy and are committed to protecting your personal room photos and interior design preferences. Home Planner AI uses artificial intelligence to help you redesign room interiors, transform house exteriors, replace furniture, estimate room dimensions, and design custom pet spaces.',
    },
  ],
  sections: [
    {
      title: '1. Information We Collect',
      blocks: [
        {
          kind: 'paragraph',
          text: 'We collect limited information required to deliver room design services and improve generative quality:',
        },
        {
          kind: 'list',
          items: [
            'Photos uploaded for room redesign, exterior facade updates, furniture replacements, or pet zone planning.',
            'Selected design preferences, such as room types (Living Room, Kitchen, Bedroom, etc.), pet types (Cat, Dog, Rabbit, etc.), and style presets.',
            'Device information including operating system version, screen resolution, and app usage metrics for performance optimization.',
          ],
        },
      ] as PrivacyPolicyBlock[],
    },
    {
      title: '2. How We Use Your Information',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Your uploaded photos are processed exclusively to generate AI room renders and estimations requested by you. We do not sell your photos or personal room data to third parties.',
        },
        {
          kind: 'list',
          items: [
            'Generating realistic AI interior, exterior, and pet space transformations.',
            'Estimating room dimensions based on user-provided reference measurements.',
            'Saving design history and favorite renders locally or synced securely with your account.',
            'Improving model accuracy and application performance.',
          ],
        },
      ] as PrivacyPolicyBlock[],
    },
    {
      title: '3. Data Storage & Security',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Uploaded images are encrypted during transit using standard SSL/TLS protocols. Photos processed by our AI algorithms are retained temporarily for generation and discarded unless saved in your user account history.',
        },
      ] as PrivacyPolicyBlock[],
    },
    {
      title: '4. Contact Us',
      blocks: [
        {
          kind: 'paragraph',
          text: 'If you have any questions or requests regarding this Privacy Policy or your data, please contact us at:',
        },
        {
          kind: 'paragraph',
          tone: 'lead',
          text: 'personpick11@gmail.com',
        },
      ] as PrivacyPolicyBlock[],
    },
  ],
};
