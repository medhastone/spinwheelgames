import { WheelItem } from './types';

export type SearchIntentType =
  | 'transactional/use tool'
  | 'informational'
  | 'educational'
  | 'entertainment'
  | 'classroom'
  | 'event'
  | 'decision'
  | 'party'
  | 'sports';

export type PageCategoryType = 'tool' | 'subtool' | 'category' | 'guide';

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoContentBlock {
  heading: string;
  body: string[];
}

export interface SeoInternalLink {
  label: string;
  href: string;
  context: string;
}

export interface ExternalCitation {
  sourceName: string;
  sourceUrl: string;
  publisher: string;
  keyFinding: string;
}

export interface EeatEditorialMeta {
  authorName: string;
  authorRole: string;
  reviewedBy: string;
  reviewedRole: string;
  lastUpdatedDate: string;
  testingMethodology: string;
  isoCompliance?: string;
}

export interface SeoQuickFacts {
  toolName: string;
  purpose: string;
  bestFor: string;
  modes: string[];
  customization: string[];
  accountRequired: string;
  cost: string;
  selectionMethod: string;
}

export interface SeoConcreteExample {
  title: string;
  scenario: string;
  userChoices: string[];
  result: string;
  explanation: string;
}

export interface KeywordContentMatrixItem {
  url: string;
  pageName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticTerms: string[];
  searchIntent: string;
  targetAudience: string;
  problemSolved: string;
  toolType: string;
  uniqueValue: string;
  internalLinks: string[];
  sourceRequirements: string[];
  indexable: boolean;
}

export interface SeoPageData {
  slug: string;
  fullPath: string;
  pageType: PageCategoryType;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  directAnswer?: string;
  quickFacts?: SeoQuickFacts;
  concreteExample?: SeoConcreteExample;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  semanticTerms?: string[];
  targetAudience?: string;
  problemSolved?: string;
  uniqueValue?: string;
  primaryIntent: SearchIntentType;
  secondaryIntents: SearchIntentType[];
  categoryKey: string;
  parentCategoryPath: string;
  parentCategoryName: string;
  defaultWheelData: {
    title: string;
    description: string;
    items: { id: string; text: string; weight: number; color?: string }[];
    paletteKey: string;
  };
  instructions: string[];
  whoItsUsefulFor?: { audience: string; benefit: string }[];
  useCases: { title: string; description: string; benefit?: string }[];
  customizationOptions: { title: string; description: string }[];
  tips?: string[];
  featureBadges?: string[];
  resultExplanation: string;
  uniqueExamples: string[];
  comparisonTable?: { headers: string[]; rows: string[][] };
  uniqueContentBlocks: SeoContentBlock[];
  faqs: SeoFaqItem[];
  relatedTools: { name: string; path: string; description: string }[];
  relatedWheels: { name: string; path: string; count: number }[];
  relatedGuides: { name: string; path: string; readingTime: string }[];
  internalLinks: SeoInternalLink[];
  breadcrumbs: { name: string; item: string }[];
  eeatMeta?: EeatEditorialMeta;
  externalCitations?: ExternalCitation[];
}

export interface TopicCluster {
  id: string;
  name: string;
  pillarPath: string;
  h1: string;
  metaDescription: string;
  primaryIntent: SearchIntentType;
  supportingTools: string[]; // Paths to tools
  supportingGuides: string[]; // Paths to guides
  subpages?: string[]; // Specific experiences
  clusterSummary: string;
}
