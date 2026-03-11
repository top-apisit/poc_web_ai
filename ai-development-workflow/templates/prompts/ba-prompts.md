# Business Analyst Prompts

## 1. Market Research

```markdown
You are a senior product strategist. Analyze the [INDUSTRY] market in 2026.

Product Context:
- Name: [PRODUCT_NAME]
- Type: [WEB/MOBILE/BOTH]
- Target: [TARGET_AUDIENCE]

Provide:
1. Top 5 competitors with their strengths/weaknesses
2. Underserved user segments
3. Feature gaps in existing solutions
4. Emerging trends (AI integration, etc.)
5. Regulatory considerations
6. Market size estimation

Format as a structured market analysis report with sections and bullet points.
```

## 2. User Persona Generation

```markdown
Create 3 detailed user personas for [PRODUCT_NAME].

Product: [BRIEF_DESCRIPTION]
Target Market: [TARGET_MARKET]

For each persona include:
1. **Demographics**
   - Name, age, occupation, location
   - Income level, education
   - Family status

2. **Psychographics**
   - Goals and motivations
   - Frustrations and pain points
   - Values and priorities

3. **Behavioral**
   - Tech savviness (1-10)
   - Current solutions used
   - Buying behavior

4. **Product Relationship**
   - Key features they'd value
   - Potential objections
   - Success metrics for them

5. **Quote**
   - One sentence that captures their core need

Format as detailed profile cards.
```

## 3. PRD Generation

```markdown
Create a comprehensive PRD for [PRODUCT_NAME].

## Context
- Product Type: [TYPE]
- Target Users: [USERS]
- Problem: [PROBLEM_STATEMENT]
- Competitors: [COMPETITORS]

## Generate PRD with:

### 1. Executive Summary
- Problem statement (2-3 sentences)
- Solution overview
- Key differentiators
- Success metrics (3-5 KPIs)

### 2. User Personas
- Reference previously generated personas
- Primary vs secondary users

### 3. User Stories (MVP)
Organize by epic. For each story:
- As a [user], I want [goal], so that [benefit]
- Acceptance criteria (Given/When/Then)
- Priority (P0-P3)
- Complexity (S/M/L/XL)

Epics to cover:
- Onboarding
- Core Feature 1
- Core Feature 2
- Settings/Profile

### 4. Feature Requirements
For MVP features:
- Description
- User flow (numbered steps)
- Edge cases
- Technical considerations
- Out of scope

### 5. Non-Functional Requirements
- Performance (load times, concurrent users)
- Security (data handling, compliance)
- Accessibility (WCAG level)
- Platforms (web, iOS, Android)

### 6. Success Metrics
- Activation metrics
- Engagement metrics
- Retention metrics
- Business metrics

### 7. Timeline & Milestones
- Phase 1: MVP (features)
- Phase 2: Enhancement (features)
- Phase 3: Scale (features)

Output as a well-structured markdown document.
```

## 4. User Story Extraction

```markdown
Extract user stories from this PRD document.

[PASTE PRD CONTENT]

For each story provide:
- ID: US-001 format
- Epic: Category name
- Story: As a [user], I want [goal], so that [benefit]
- Acceptance Criteria:
  - Given [context]
  - When [action]
  - Then [outcome]
- Priority: P0 (must have) / P1 (should have) / P2 (nice to have) / P3 (future)
- Estimate: S (1-2 days) / M (3-5 days) / L (1-2 weeks) / XL (2+ weeks)
- Dependencies: List of US-IDs this depends on

Output as a JSON array for easy import to Linear/Jira.
```

## 5. Competitive Analysis

```markdown
Perform a detailed competitive analysis for [PRODUCT_NAME].

Direct Competitors:
1. [COMPETITOR_1]
2. [COMPETITOR_2]
3. [COMPETITOR_3]

Analyze each competitor for:

### Feature Comparison Matrix
| Feature | Us | Comp1 | Comp2 | Comp3 |
|---------|----|----- -|-------|-------|

### Pricing Analysis
- Pricing models used
- Price points
- Value proposition at each tier

### User Experience
- Onboarding experience
- Key user flows
- Mobile experience
- Notable UX patterns

### Technical Approach
- Tech stack (if known)
- Integrations offered
- API availability
- Performance

### Market Position
- Target audience
- Brand positioning
- Marketing channels
- User reviews sentiment

### SWOT for Each
- Strengths
- Weaknesses
- Opportunities
- Threats

### Our Differentiation Strategy
Based on analysis, recommend:
1. Features to match (table stakes)
2. Features to beat (competitive advantage)
3. Features to skip (not our focus)
4. Unique features (differentiation)
```

## 6. Success Metrics Definition

```markdown
Define success metrics for [PRODUCT_NAME].

Product Stage: [MVP / Growth / Mature]
Business Model: [SaaS / Freemium / Marketplace / etc.]

Generate metrics framework:

### North Star Metric
- Metric name
- Definition
- Why it matters
- Target value

### Activation Metrics
- Metric | Definition | Target | Measurement Method

### Engagement Metrics
- DAU/MAU ratio
- Session frequency
- Feature adoption
- Time in app

### Retention Metrics
- D1, D7, D30 retention
- Churn rate
- Resurrection rate

### Revenue Metrics (if applicable)
- MRR/ARR
- ARPU
- LTV
- CAC

### Product Health Metrics
- Error rate
- Load time
- Support tickets
- NPS/CSAT

For each metric:
- How to measure
- Data source
- Reporting frequency
- Alert thresholds
```
