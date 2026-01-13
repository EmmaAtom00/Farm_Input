# Implementation Plan: Code Quality and Consistency Fixes

- [x] 1. Create centralized API configuration
  - Create `constant/api.ts` with API_CONFIG object containing baseUrl and endpoints
  - Export API_CONFIG for use throughout the application
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 2. Convert require() statements to ES6 imports in home screen
  - Update `app/(core)/index.tsx` to use ES6 import for Farminput1.jpeg and Farminput2.jpeg
  - Replace const farmInput1/2 = require() with import statements
  - _Requirements: 1.1, 1.2_

- [x] 3. Convert require() statements to ES6 imports in authentication screens
  - Update `app/(tabs)/Login.tsx` to use ES6 import for icon.png
  - Update `app/(tabs)/Signup.tsx` to use ES6 import for icon.png
  - Replace require() calls with import statements
  - _Requirements: 1.1, 1.3, 1.4_

- [x] 4. Rename component files to PascalCase
  - Rename `components/common/card.tsx` to `components/common/Card.tsx`
  - Rename `components/common/step.tsx` to `components/common/Step.tsx`
  - Rename `components/common/feature.tsx` to `components/common/Feature.tsx`
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 5. Update component exports to match file names
  - Update `Card.tsx` to export `Card` instead of `card`
  - Update `Step.tsx` to export `Step` instead of `step`
  - Update `Feature.tsx` to export `Feature` instead of `feature`
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 6. Update component imports in home screen
  - Update `app/(core)/index.tsx` to import Card from renamed file
  - Update `app/(core)/index.tsx` to import Footer from correct path
  - Verify all component imports use correct PascalCase names
  - _Requirements: 7.1, 7.2_

- [x] 7. Update component imports in how it works screen
  - Update `app/(core)/HowItWorksScreen.tsx` to import Feature from renamed file
  - Update `app/(core)/HowItWorksScreen.tsx` to import Step from renamed file
  - Verify all component imports use correct PascalCase names
  - _Requirements: 7.1, 7.3_

- [x] 8. Update API endpoints in authentication screens
  - Update `app/(tabs)/Login.tsx` to use API_CONFIG from centralized config
  - Update `app/(tabs)/Signup.tsx` to use API_CONFIG from centralized config
  - Replace hardcoded baseUrl with API_CONFIG.baseUrl
  - _Requirements: 4.2, 4.3_

- [x] 9. Convert Footer styling from StyleSheet to Tailwind CSS
  - Update `components/layout/core/Footer.tsx` to use Tailwind CSS classes instead of StyleSheet
  - Convert all StyleSheet styles to equivalent Tailwind classes
  - Remove StyleSheet import and object
  - Maintain visual parity with original design
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 10. Delete unused button component
  - Delete `components/common/button.tsx` file
  - Verify no imports reference the deleted file
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 11. Verify application builds successfully
  - Run TypeScript compiler to check for type errors
  - Verify all imports resolve correctly
  - Confirm application builds without errors
  - _Requirements: 7.4_
