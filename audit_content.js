const fs = require("fs");
const path = require("path");

// Route to Page Component Mapping
const routes = {
  "/": "Home.jsx",
  "/photography-agency": "PhotographyAgencyHome.jsx",
  "/digital-agency": "DigitalAgencyHome.jsx",
  "/marketing-agency": "MarketingAgencyHome.jsx",
  "/freelancer-agency": "FreelancerAgencyHome.jsx",
  "/architecture-agency": "ArchitectureAgencyHome.jsx",
  "/creative-solution": "CreativeSolutionHome.jsx",
  "/personal-portfolio": "PersonalPortfolioHome.jsx",
  "/about": "AboutPage.jsx",
  "/service": "ServicesPage.jsx",
  "/service/:serviceDetailsId": "ServiceDetailsPage.jsx",
  "/portfolio": "PortfolioPage.jsx",
  "/portfolio/:portfolioDetailsId": "PortfolioDetailsPage.jsx",
  "/blog": "BlogPage.jsx",
  "/blog/:blogDetailsId": "BlogDetailsPage.jsx",
  "/contact": "ContactPage.jsx",
  "/team": "TeamPage.jsx",
  "/team/:teamDetails": "TeamDetails.jsx",
  "/case-study/:caseStudyDetailsId": "CaseStudyDetailsPage.jsx",
  "/faq": "FaqPage.jsx",
  "/creative-portfolio": "CreativePortfolioHome.jsx",
  "/showcase-portfolio": "ShowcasePortfolioHome.jsx",
  "/case-study-showcase": "CaseStudyShowcaseHome.jsx",
  "/video-showcase": "VideoShowcaseHome.jsx",
  "*": "ErrorPage.jsx",
};

// Component Mapping for recursive lookup
// Maps Component Name -> File Path relative to src/
const componentMapping = {
  Accordion: "components/Accordion/index.jsx",
  TestimonialSlider: "components/Slider/TestimonialSlider.jsx",
  TeamSlider: "components/Slider/TeamSlider.jsx",
  PostSlider: "components/Slider/PostSlider.jsx",
  TimelineSlider: "components/Slider/TimelineSlider.jsx",
  PricingTableList: "components/PricingTable/PricingTableList.jsx",
  FunFact: "components/FunFact/index.jsx",
  LogoList: "components/LogoList/index.jsx",
  // Adding Heroes for completeness if they have static content
  Hero: "components/Hero/index.jsx",
  Hero2: "components/Hero/Hero2.jsx",
  Hero3: "components/Hero/Hero3.jsx",
  Hero4: "components/Hero/Hero4.jsx",
  Hero5: "components/Hero/Hero5.jsx",
  Hero6: "components/Hero/Hero6.jsx",
  Hero7: "components/Hero/Hero7.jsx",
};

// Base dir is now src/ because we need to navigate to both Pages and other components
const BASE_DIR = path.join(__dirname, "src");

function extractTextFromFile(filePathRelative) {
  const filepath = path.join(BASE_DIR, filePathRelative);
  if (!fs.existsSync(filepath)) {
    return null;
  }

  const content = fs.readFileSync(filepath, "utf-8");
  const sections = [];

  // 1. Extract const variables defined in the file
  const varMap = {};
  const varRegex = /const\s+(\w+)\s*=\s*(\[[\s\S]*?\]);/g;
  let match;
  while ((match = varRegex.exec(content)) !== null) {
    varMap[match[1]] = match[2];
  }

  // 2. Scan sections
  const sectionRegex =
    /\{\/\*\s*Start\s+(.*?)\s+Section\s*\*\/\}([\s\S]*?)(\{\/\*\s*End\s+.*?\s+Section\s*\*\/\}|$)/g;

  let foundSections = false;

  while ((match = sectionRegex.exec(content)) !== null) {
    foundSections = true;
    const secName = match[1].trim();
    const secContent = match[2];
    const texts = processTextChunk(secContent, varMap);
    sections.push({
      name: secName,
      texts: texts,
    });
  }

  if (!foundSections) {
    const texts = processTextChunk(content, varMap);
    sections.push({
      name: "Main Content",
      texts: texts,
    });
  }

  return sections;
}

function processTextChunk(chunk, varMap = {}) {
  const matches = [];

  // A. Check for Component usages that need internal content extraction
  for (const [compName, compPath] of Object.entries(componentMapping)) {
    // Regex to find <ComponentName ... /> or <ComponentName>
    const compRegex = new RegExp(`<${compName}\\b`, "g");
    if (compRegex.test(chunk)) {
      // Found a known component, let's extract its content recursively
      // Note: This matches the *usage*, so we load the *definition file* once per usage.
      // This might duplicate content if used multiple times in same section, which is technically correct for a sitemap (it appears twice).

      const compSections = extractTextFromFile(compPath);
      if (compSections) {
        for (const sec of compSections) {
          matches.push(...sec.texts);
        }
      }
    }
  }

  // B. Extract direct props like title="...", subtitle="..."
  const propsRegex =
    /(?:title|subtitle|btnText|text|heading|paragraph|label|heroTitle|heroSubtitle|name|question|answer)=["'](.*?)["']/g;
  let m;
  while ((m = propsRegex.exec(chunk)) !== null) {
    const val = m[1].trim();
    if (val && !val.startsWith("/") && !val.startsWith("{")) {
      matches.push(val);
    }
  }

  // C. Extract props that reference variables: data={funfaceData}
  const dataPropRegex =
    /(?:data|heroSocialLinks|portfolioData|showcaseData|serviceData)=\{(\w+)\}/g;
  while ((m = dataPropRegex.exec(chunk)) !== null) {
    const varName = m[1];
    if (varMap[varName]) {
      const rawData = varMap[varName];
      const objPropRegex =
        /(?:title|subtitle|factNumber|text|btnText|name|testimonialText|question|answer|designation|ratings)\s*:\s*["'](.*?)["']/g;
      let m2;
      while ((m2 = objPropRegex.exec(rawData)) !== null) {
        const val = m2[1].trim();
        if (val && !val.startsWith("/") && !val.startsWith("{")) {
          matches.push(val);
        }
      }
    }
  }

  // D. Extract JSX text content: >Some text<
  const jsxTextRegex = />([^<>{}\n]+)</g;
  while ((m = jsxTextRegex.exec(chunk)) !== null) {
    const val = m[1].trim();
    if (val) {
      matches.push(val);
    }
  }

  return matches;
}

function generateSitemap() {
  let totalProjectChars = 0;
  let totalProjectElements = 0;

  console.log("Wait... Auditing content...\n");

  for (const [route, filename] of Object.entries(routes)) {
    // Pages are in components/Pages
    const sections = extractTextFromFile(
      path.join("components", "Pages", filename),
    );

    if (!sections) {
      console.log(`Error: Could not find file ${filename}`);
      continue;
    }

    console.log(`ROUTE: ${route} (${filename})`);

    let routeTotalChars = 0;
    let routeTotalElements = 0;

    for (const sec of sections) {
      const texts = sec.texts;
      const elemCount = texts.length;
      const charCount = texts.reduce((acc, t) => acc + t.length, 0);

      let preview =
        texts.length > 0
          ? `"${texts[0].substring(0, 20)}..."`
          : "No text content";
      preview = preview.replace(/<[^>]+>/g, "");

      console.log(`├── SECTION: ${sec.name}`);
      console.log(`│   ├── Text Elements: ${elemCount}`);
      console.log(`│   ├── Total Characters: ${charCount}`);
      console.log(`│   └── Content Preview: ${preview}`);

      routeTotalChars += charCount;
      routeTotalElements += elemCount;
    }

    totalProjectChars += routeTotalChars;
    totalProjectElements += routeTotalElements;
    console.log("");
  }

  console.log("Total Content Summary");
  console.log("---------------------");
  console.log(`Total Routes: ${Object.keys(routes).length}`);
  console.log(`Total Text Elements: ${totalProjectElements}`);
  console.log(`Total Characters: ${totalProjectChars}`);
}

generateSitemap();
