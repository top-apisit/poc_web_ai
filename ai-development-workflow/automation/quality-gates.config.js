/**
 * Quality Gates Configuration
 *
 * This configuration defines the quality standards and gates
 * for the AI-powered development workflow.
 *
 * Copy relevant sections to your project's configuration files.
 */

module.exports = {
  // ============================================
  // PRE-COMMIT HOOKS (lint-staged)
  // ============================================
  preCommit: {
    // Run on staged files
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
    '*.{json,md,yml,yaml}': ['prettier --write'],
    '*.{ts,tsx}': () => 'tsc --noEmit',
  },

  // ============================================
  // PULL REQUEST REQUIREMENTS
  // ============================================
  pullRequest: {
    // Code coverage thresholds
    coverage: {
      minimum: 80, // Overall minimum
      newCode: 90, // New code must have higher coverage
      branches: 75,
      functions: 80,
      lines: 80,
    },

    // Review requirements
    reviews: {
      required: 2, // Number of approvals needed
      codeOwners: true, // Require CODEOWNERS approval
      aiReviewPassing: true, // AI review must pass
      dismissStale: true, // Dismiss stale reviews on new commits
    },

    // Required status checks
    checks: {
      lint: 'required',
      typecheck: 'required',
      'test-unit': 'required',
      'test-e2e': 'required',
      security: 'required',
      'ai-review': 'required',
      build: 'required',
    },

    // Branch protection
    branches: {
      main: {
        requirePR: true,
        requiredChecks: ['lint', 'test-unit', 'test-e2e', 'security', 'build'],
        requiredReviews: 2,
        dismissStaleReviews: true,
        requireCodeOwners: true,
        enforceAdmins: true,
      },
      develop: {
        requirePR: true,
        requiredChecks: ['lint', 'test-unit', 'build'],
        requiredReviews: 1,
      },
    },
  },

  // ============================================
  // CODE QUALITY METRICS
  // ============================================
  metrics: {
    // Cyclomatic complexity
    complexity: {
      max: 15, // Block merge if exceeded
      warn: 10, // Show warning
      perFunction: 10, // Per-function limit
    },

    // Code duplication
    duplications: {
      max: 3, // Maximum % of duplicated code
      minLines: 10, // Minimum lines to consider duplicate
      minTokens: 50, // Minimum tokens to consider duplicate
    },

    // File size limits
    fileSize: {
      maxLines: 500, // Lines per file
      maxFunctions: 20, // Functions per file
      warnLines: 300,
    },

    // Dependencies
    dependencies: {
      outdated: 'warn', // Warn on outdated deps
      vulnerable: 'block', // Block on vulnerable deps
      maxDirectDeps: 50, // Limit direct dependencies
      bannedPackages: [
        'moment', // Use date-fns or dayjs
        'lodash', // Use native methods or lodash-es
        'request', // Use fetch or axios
      ],
    },
  },

  // ============================================
  // SECURITY RULES
  // ============================================
  security: {
    // Files that require security review
    sensitivePatterns: [
      '**/auth/**',
      '**/payment/**',
      '**/crypto/**',
      '**/*.env*',
      '**/secrets/**',
    ],

    // Blocked patterns in code
    blockedPatterns: [
      {
        pattern: /eval\(/,
        message: 'eval() is not allowed',
      },
      {
        pattern: /innerHTML\s*=/,
        message: 'Use textContent or sanitize HTML',
      },
      {
        pattern: /dangerouslySetInnerHTML/,
        message: 'Ensure HTML is sanitized',
        severity: 'warn',
      },
    ],

    // Secret detection
    secrets: {
      enabled: true,
      patterns: [
        /api[_-]?key/i,
        /secret[_-]?key/i,
        /password/i,
        /private[_-]?key/i,
        /access[_-]?token/i,
      ],
      allowedFiles: ['.env.example', '*.test.*', '__mocks__/**'],
    },
  },

  // ============================================
  // AI REVIEW CONFIGURATION
  // ============================================
  aiReview: {
    enabled: true,
    model: 'claude-sonnet-4-20250514',

    // Risk levels and their requirements
    riskLevels: {
      low: {
        patterns: ['docs/**', '*.md', '*.test.*'],
        autoApprove: true,
        humanReview: false,
      },
      medium: {
        patterns: ['src/**'],
        autoApprove: false,
        humanReview: true,
        minReviewers: 1,
      },
      high: {
        patterns: ['**/auth/**', '**/payment/**', '**/security/**'],
        autoApprove: false,
        humanReview: true,
        minReviewers: 2,
        requireSecurityTeam: true,
      },
      critical: {
        patterns: ['infrastructure/**', '.github/**', 'terraform/**'],
        autoApprove: false,
        humanReview: true,
        minReviewers: 2,
        requireSecurityTeam: true,
        requireTechLead: true,
      },
    },

    // Review focus areas
    reviewFocus: [
      'security-vulnerabilities',
      'logic-errors',
      'performance-issues',
      'error-handling',
      'code-style',
      'test-coverage',
    ],

    // Custom review prompts by file type
    customPrompts: {
      '*.tsx': 'Also check React best practices and accessibility.',
      '*.sql': 'Also check for SQL injection and performance.',
      'api/**': 'Also check API design and authentication.',
    },
  },

  // ============================================
  // DEPLOYMENT GATES
  // ============================================
  deployment: {
    staging: {
      requiredChecks: ['lint', 'test-unit', 'test-e2e', 'build'],
      autoDeployBranch: 'develop',
      notifications: ['slack:#deploys'],
    },
    production: {
      requiredChecks: ['lint', 'test-unit', 'test-e2e', 'security', 'build'],
      requireApproval: true,
      approvers: ['@release-managers'],
      autoDeployBranch: 'main',
      notifications: ['slack:#deploys', 'email:team@company.com'],
      smokeTests: true,
      rollbackOnFailure: true,
    },
  },

  // ============================================
  // MONITORING THRESHOLDS
  // ============================================
  monitoring: {
    errorRate: {
      warn: 0.5, // 0.5%
      critical: 1, // 1%
    },
    latency: {
      p50: 100, // ms
      p95: 500,
      p99: 1000,
    },
    availability: {
      target: 99.9, // %
    },
  },
};
