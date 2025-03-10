# Playwright TypeScript Test Automation
## Overview
This repository contains an automated test suite built with Playwright and TypeScript. It is designed for end-to-end testing of web applications, ensuring robust and reliable software quality.
## Project Structure
```
tictuk/
├── api/                    # API request handlers or mocks
├── node_modules/           # Project dependencies
├── pages/                  # Page Object Models (POM) for structured test cases
├── playwright-report/      # Generated test reports
├── tests/                  # Test scripts
├── utils/                  # Utility functions and helpers
├── .gitignore              # Git ignore rules
├── package.json            # Project metadata and dependencies
└── playwright.config.ts    # Playwright configuration
```

## Page Object Model (POM) Structure

This project follows the Page Object Model (POM) design pattern to improve test maintainability and readability. The pages/ directory contains reusable classes representing different pages of the application.

### Benefits of Using POM

- Encapsulation: Keeps locators and actions related to a page in one place.
- Reusability: Allows using the same page objects across multiple test cases.
- Maintainability: Updating locators is easier when they are stored in one location.



## Getting Started
### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Playwright CLI
### Installation
1. Clone the repository:
```
git clone https://github.com/GianCHerrera/tictuk.git
cd tictuk
```
2. Install dependencies:
```
npm install
```
3. Install Playwright browsers:
```
npx playwright install
```
Running Tests
### Run All Tests
```
npx playwright test
```
### Run a Specific Test File
```
npx playwright test tests/example.spec.ts
```
### Run Tests in Headed Mode
```
npx playwright test --headed
```
### Run Tests with Debugging
```
npx playwright test --debug
```
## Viewing Test Reports
After running tests, you can generate and view an HTML report:
```
npx playwright show-report
```
## Configuration
### Playwright Configuration
The `playwright.config.ts` file contains the global configuration for Playwright, including browser settings, timeouts, and test directories. Modify this file to customize the test environment.

### TypeScript Configuration
The `tsconfig.json` file specifies the TypeScript compiler options. Adjust these settings as needed for your project requirements.


## Task Completion Timestamps
### Session 1
- **Start Time:** 2025/03/08 02:23 PM (UTC-5)
- **Start Time:** 2025/03/08 05:41 PM (UTC-5)

### Session 2
- **Start Time:** 2025/03/09 07:11 PM (UTC-5)
- **Start Time:** 2025/03/09 09:40 PM (UTC-5)

## Final Order Number
