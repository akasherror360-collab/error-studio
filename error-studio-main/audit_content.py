import os
import re

# Route to Component Mapping
routes = {
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
    "*": "ErrorPage.jsx"
}

BASE_DIR = r"c:/Users/DIGITAL MARKETING/Downloads/samplASSDD2111_sS/ERROR_STUDIO/src/components/Pages"

def extract_text_from_file(filepath):
    if not os.path.exists(filepath):
        return None

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into sections based on comments
    # Regex for comments: {/* Start ... Section */}
    section_pattern = re.compile(r"\{\/\*\s*Start\s+(.*?)\s+Section\s*\*\/\}(.*?)(\{\/\*\s*End\s+.*?\s+Section\s*\*\/\}|$)", re.DOTALL)
    
    sections = []
    
    # helper to clean and count text
    def process_text_chunk(text_chunk):
        # Extract props like title="...", subtitle="..."
        props_pattern = re.compile(r'\b(title|subtitle|btnText|text|heading|paragraph|label|heroTitle|heroSubtitle)=["\'](.*?)["\']')
        # Extract JSX text content: >Some text<
        jsx_text_pattern = re.compile(r'>([^<>{}]+)<')
        
        # Extract array data (simplistic approach for now)
        # Look for data={...}
        
        matches = []
        
        for m in props_pattern.finditer(text_chunk):
            val = m.group(2).strip()
            if val and not val.startswith("/") and not val.startswith("{"): # Ignore paths and expressions
                matches.append(val)
                
        for m in jsx_text_pattern.finditer(text_chunk):
            val = m.group(1).strip()
            if val:
                matches.append(val)
                
        # Handle some meaningful variable lookups if needed (like funfaceData)
        # For now, we stick to props and direct text for "Zero assumptions" on static content.
        
        return matches

    # Find explicitly marked sections
    found_sections = list(section_pattern.finditer(content))
    
    if found_sections:
        for match in found_sections:
            sec_name = match.group(1).strip()
            sec_content = match.group(2)
            texts = process_text_chunk(sec_content)
            sections.append({
                "name": sec_name,
                "texts": texts
            })
    else:
        # If no sections found, treat whole file as one "Main" section
        texts = process_text_chunk(content)
        sections.append({
            "name": "Main Content",
            "texts": texts
        })
        
    return sections

def generate_sitemap():
    total_project_chars = 0
    total_project_elements = 0
    
    print("Wait... Auditing content...")
    print("")

    for route, filename in routes.items():
        filepath = os.path.join(BASE_DIR, filename)
        sections = extract_text_from_file(filepath)
        
        if sections is None:
            print(f"Error: Could not find file {filename}")
            continue
            
        print(f"ROUTE: {route} ({filename})")
        
        for sec in sections:
            texts = sec["texts"]
            # Filter empty strings just in case
            texts = [t for t in texts if t.strip()]
            
            elem_count = len(texts)
            char_count = sum(len(t) for t in texts)
            preview = f'"{texts[0][:20]}..."' if texts else "No text content"
            
            # Clean up preview (remove HTML tags from preview if any leaked)
            preview = re.sub(r'<[^>]+>', '', preview)
            
            print(f"├── SECTION: {sec['name']}")
            print(f"│   ├── Text Elements: {elem_count}")
            print(f"│   ├── Total Characters: {char_count}")
            print(f"│   └── Content Preview: {preview}")
            
            total_project_chars += char_count
            total_project_elements += elem_count
            
        print("") # Empty line between routes

    print("Total Content Summary")
    print("---------------------")
    print(f"Total Routes: {len(routes)}")
    print(f"Total Text Elements: {total_project_elements}")
    print(f"Total Characters: {total_project_chars}")

if __name__ == "__main__":
    generate_sitemap()
