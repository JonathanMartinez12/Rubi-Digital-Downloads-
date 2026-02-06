export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: "Wealth Building" | "Real Estate" | "Homebuying" | "Emergency Planning";
  description: string;
  longDescription: string;
  author: string;
  coverImage: string;
  includes: string[];
  templates?: number;
  fileFormat: string[];
  featured: boolean;
  bestseller: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Generational Wealth Volume 3: The Purpose of Prosperity",
    slug: "generational-wealth-volume-3-purpose-of-prosperity",
    price: 29.99,
    originalPrice: 39.99,
    category: "Wealth Building",
    description:
      "Downloadable workbook teaching you to build strategically, give intentionally, and leave a legacy",
    longDescription:
      "This is the culminating volume of the Generational Wealth series, designed for those ready to transform their financial success into lasting impact. You will learn how to build wealth strategically, give back intentionally, and create a legacy that outlasts you. Packed with frameworks, templates, and exercises, this workbook turns prosperity into purpose.",
    author: "Rubi",
    coverImage: "/images/products/product-1.svg",
    includes: [
      "Strategic wealth building frameworks",
      "Legacy planning templates",
      "Prosperity mindset worksheets",
      "Goal-setting exercises",
      "Financial vision board templates",
    ],
    fileFormat: ["PDF"],
    featured: true,
    bestseller: true,
    tags: ["wealth building", "legacy", "prosperity", "financial planning", "workbook"],
    rating: 4.9,
    reviewCount: 143,
  },
  {
    id: "prod_002",
    name: "Next-Level Wealth - Generational Wealth Series",
    slug: "next-level-wealth-generational-wealth-series",
    price: 29.99,
    originalPrice: 34.99,
    category: "Wealth Building",
    description:
      "A strategic workbook for the middle of your financial journey",
    longDescription:
      "Designed for those who have laid the groundwork and are ready to accelerate their wealth-building journey. This workbook provides mid-career strategies, investment planning guides, and portfolio diversification templates to help you reach the next financial milestone. Whether you are growing a nest egg or planning for early retirement, this volume bridges the gap between beginner and advanced wealth creation.",
    author: "Rubi",
    coverImage: "/images/products/product-2.svg",
    includes: [
      "Mid-career wealth strategies",
      "Investment planning guides",
      "Financial milestone checklists",
      "Portfolio diversification templates",
      "Net worth tracker",
    ],
    fileFormat: ["PDF"],
    featured: false,
    bestseller: false,
    tags: ["wealth building", "investing", "mid-career", "financial planning", "workbook"],
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "prod_003",
    name: "Generational Wealth Volume 1: A Workbook for Beginners",
    slug: "generational-wealth-volume-1-workbook-for-beginners",
    price: 29.99,
    originalPrice: 39.99,
    category: "Wealth Building",
    description:
      "A step-by-step workbook to start building generational wealth",
    longDescription:
      "The very first step on your generational wealth journey starts here. This beginner-friendly workbook walks you through foundational financial concepts, actionable budgeting strategies, and savings goal worksheets that make wealth creation approachable. If you have ever felt overwhelmed by personal finance, this is the guide that meets you where you are.",
    author: "Rubi",
    coverImage: "/images/products/product-3.svg",
    includes: [
      "Beginner wealth frameworks",
      "Foundational financial planning",
      "Actionable steps for wealth creation",
      "Budget templates",
      "Savings goal worksheets",
    ],
    fileFormat: ["PDF"],
    featured: true,
    bestseller: false,
    tags: ["wealth building", "beginner", "budgeting", "savings", "workbook"],
    rating: 4.9,
    reviewCount: 215,
  },
  {
    id: "prod_004",
    name: "First-Time Homebuyer Workbook Volume 2 Digital Download",
    slug: "first-time-homebuyer-workbook-volume-2",
    price: 29.99,
    originalPrice: 37.99,
    category: "Homebuying",
    description:
      "From Closing Table through Move-In - complete homebuyer guide",
    longDescription:
      "Picking up right where Volume 1 leaves off, this workbook guides you from the closing table through your first months as a homeowner. It covers post-purchase planning, moving logistics, home inspections, and everything you need to transition smoothly into your new home. Consider it your personal roadmap for the exciting (and sometimes overwhelming) journey after you get the keys.",
    author: "Rubi",
    coverImage: "/images/products/product-4.svg",
    includes: [
      "Post-purchase planning",
      "Moving checklists",
      "New homeowner templates",
      "Home inspection guides",
      "Closing day preparation",
    ],
    fileFormat: ["PDF"],
    featured: false,
    bestseller: false,
    tags: ["homebuying", "closing", "move-in", "new homeowner", "workbook"],
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: "prod_005",
    name: "First-Time Homebuyer Workbook Volume 1",
    slug: "first-time-homebuyer-workbook-volume-1",
    price: 29.99,
    originalPrice: 34.99,
    category: "Homebuying",
    description:
      "From Credit Readiness to the Closing Table - 42 premium templates, guides, and checklists",
    longDescription:
      "The ultimate companion for anyone preparing to buy their first home. This comprehensive workbook includes 42 premium templates that walk you through every stage, from repairing your credit and getting pre-approved to searching for the perfect home and making a winning offer. Thousands of first-time buyers have used this workbook to navigate the process with confidence.",
    author: "Rubi",
    coverImage: "/images/products/product-5.svg",
    includes: [
      "Credit repair strategies",
      "Mortgage pre-approval guides",
      "Home search templates",
      "Offer worksheets",
      "Closing checklist",
      "42 premium templates included",
    ],
    templates: 42,
    fileFormat: ["PDF", "Excel"],
    featured: true,
    bestseller: true,
    tags: ["homebuying", "first-time buyer", "credit", "mortgage", "templates"],
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "prod_006",
    name: "New Homeowner Starter Kit: Your First Year",
    slug: "new-homeowner-starter-kit-your-first-year",
    price: 29.99,
    originalPrice: 34.99,
    category: "Homebuying",
    description:
      "46 essential tools, checklists & templates for first-time homeowners",
    longDescription:
      "Your first year as a homeowner comes with a steep learning curve, and this starter kit makes it manageable. With 46 essential tools, checklists, and templates, you will stay on top of seasonal maintenance, track warranties, plan improvements, and prepare for emergencies. Think of it as your homeownership survival guide for year one and beyond.",
    author: "Rubi",
    coverImage: "/images/products/product-6.svg",
    includes: [
      "First-year maintenance checklists",
      "Seasonal home care guides",
      "Emergency preparedness templates",
      "Warranty tracking sheets",
      "Home improvement planner",
    ],
    templates: 46,
    fileFormat: ["PDF", "Excel"],
    featured: false,
    bestseller: false,
    tags: ["homeowner", "maintenance", "first year", "starter kit", "templates"],
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "prod_007",
    name: "House Hacking Workbook: Live in One, Rent the Other",
    slug: "house-hacking-workbook-live-in-one-rent-the-other",
    price: 29.99,
    originalPrice: 34.99,
    category: "Real Estate",
    description:
      "A complete workbook for analyzing 2-4 unit properties",
    longDescription:
      "House hacking is one of the fastest paths to real estate investing, and this workbook gives you every tool you need to get started. Learn how to analyze 2-4 unit properties, screen tenants, calculate rental income, and maximize your return on investment. Whether you are looking at duplexes or fourplexes, this workbook will help you live for free while building equity.",
    author: "Rubi",
    coverImage: "/images/products/product-7.svg",
    includes: [
      "Property analysis spreadsheets",
      "Tenant screening templates",
      "Rental income calculators",
      "Investment ROI worksheets",
      "Lease agreement templates",
    ],
    fileFormat: ["PDF", "Excel"],
    featured: false,
    bestseller: false,
    tags: ["real estate", "house hacking", "rental", "investing", "multi-unit"],
    rating: 4.8,
    reviewCount: 94,
  },
  {
    id: "prod_008",
    name: "Emergency Home Binder INSTANT DOWNLOAD",
    slug: "emergency-home-binder-instant-download",
    price: 32.99,
    originalPrice: 39.99,
    category: "Emergency Planning",
    description:
      "Complete Family Emergency Planner - printable & editable 2026 Home Edition",
    longDescription:
      "Be prepared for anything with this comprehensive emergency home binder. Featuring over 50 essential documents, this printable and editable planner helps you organize financial records, emergency contacts, medical information, insurance documents, evacuation plans, and more. The 2026 Home Edition is designed to keep your entire household organized and ready for the unexpected.",
    author: "Rubi",
    coverImage: "/images/products/product-8.svg",
    includes: [
      "Financial records templates",
      "Emergency contacts organizer",
      "Medical information sheets",
      "Insurance document tracker",
      "Evacuation plans",
      "Home inventory sheets",
      "Password tracker",
      "50+ essential documents",
    ],
    templates: 50,
    fileFormat: ["PDF", "Word"],
    featured: true,
    bestseller: true,
    tags: ["emergency planning", "home binder", "family planner", "printable", "editable"],
    rating: 4.9,
    reviewCount: 428,
  },
  {
    id: "prod_009",
    name: "Landlording for Beginners INSTANT DOWNLOAD",
    slug: "landlording-for-beginners-instant-download",
    price: 29.99,
    originalPrice: 34.99,
    category: "Real Estate",
    description:
      "A workbook for aspiring real estate investors - complete analysis of 2-4 unit properties",
    longDescription:
      "Step into the world of landlording with confidence using this beginner-friendly workbook. It covers everything from rental property analysis and cash flow calculations to tenant management and property maintenance. Designed specifically for aspiring investors eyeing 2-4 unit properties, this guide gives you the practical tools to make smart investment decisions from day one.",
    author: "Rubi",
    coverImage: "/images/products/product-9.svg",
    includes: [
      "Rental property analysis tools",
      "Landlord legal guides",
      "Tenant management templates",
      "Cash flow calculators",
      "Property maintenance checklists",
    ],
    fileFormat: ["PDF", "Excel"],
    featured: false,
    bestseller: false,
    tags: ["real estate", "landlording", "beginner", "rental property", "investing"],
    rating: 4.7,
    reviewCount: 112,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getBestsellerProducts(): Product[] {
  return products.filter((product) => product.bestseller);
}

export function getAllCategories(): string[] {
  return [...new Set(products.map((product) => product.category))];
}
