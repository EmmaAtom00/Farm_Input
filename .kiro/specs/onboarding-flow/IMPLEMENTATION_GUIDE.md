# Onboarding Flow Implementation Guide

## Overview

This implementation ensures that the onboarding screens only appear when a user launches the app for the first time. After completing the onboarding, the user is directed to the main app, and the onboarding screens won't appear again.

## Architecture

### 1. **OnboardingContext** (`context/OnboardingContext.tsx`)
- Manages onboarding state globally
- Checks AsyncStorage on app startup to determine if user has completed onboarding
- Provides `useOnboarding` hook for components to access onboarding state
- Exports `completeOnboarding()` function to mark onboarding as complete

### 2. **Root Layout** (`app/_layout.tsx`)
- Wraps the entire app with `OnboardingProvider`
- Uses `useOnboarding` hook to conditionally render navigation stacks
- Shows loading indicator while checking onboarding status
- Routes to `(main)` folder (onboarding screens) if not completed
- Routes to `(core)` and `(auth)` if onboarding is completed

### 3. **Main Layout** (`app/(main)/_layout.tsx`)
- Contains the onboarding flow
- Routes to the `(onboarding)` folder

### 4. **Onboarding Layout** (`app/(main)/(onboarding)/_layout.tsx`)
- Defines the three onboarding screens:
  - TrackYourInput (Screen 1)
  - ComparePrices (Screen 2)
  - JoinBuyingGroups (Screen 3)

### 5. **Onboarding Screens**
Each screen includes:
- Progress indicator (3 dots showing current step)
- Icon and title
- Description
- Feature list with checkmarks
- "Next" button to proceed to next screen
- "Skip for now" button to skip onboarding

**Final Screen (JoinBuyingGroups):**
- "Get Started" button calls `completeOnboarding()`
- Saves onboarding status to AsyncStorage
- Redirects to home screen `/(core)`

### 6. **API Configuration** (`constant/api.ts`)
- `checkOnboardingStatus()`: Checks if user has completed onboarding
- `completeOnboarding()`: Marks onboarding as complete in AsyncStorage
- Uses key: `"hasseenonboarding"`

## Flow Diagram

```
App Launch
    ↓
OnboardingProvider checks AsyncStorage
    ↓
    ├─ If NOT completed → Show (main)/(onboarding) screens
    │   ├─ TrackYourInput
    │   ├─ ComparePrices
    │   └─ JoinBuyingGroups → completeOnboarding() → Redirect to (core)
    │
    └─ If completed → Show (core) and (auth) screens
```

## Key Features

✅ **First-time only**: Onboarding only shows on first app launch
✅ **Persistent state**: Uses AsyncStorage to remember completion
✅ **Progress tracking**: Visual progress indicator on each screen
✅ **Skip option**: Users can skip onboarding and go straight to app
✅ **Loading state**: Shows loading indicator while checking status
✅ **Error handling**: Gracefully handles AsyncStorage errors

## Usage

### For Users:
1. First app launch → Onboarding screens appear
2. Complete all 3 screens or skip
3. After completion → Redirected to home screen
4. Subsequent launches → Onboarding skipped, goes straight to home

### For Developers:
To reset onboarding (for testing):
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clear onboarding status
await AsyncStorage.removeItem('hasseenonboarding');
```

## Files Modified/Created

- ✅ `context/OnboardingContext.tsx` (NEW)
- ✅ `app/_layout.tsx` (UPDATED)
- ✅ `app/(main)/_layout.tsx` (NEW)
- ✅ `app/(main)/(onboarding)/_layout.tsx` (UPDATED)
- ✅ `app/(main)/(onboarding)/TrackYourInput.tsx` (UPDATED)
- ✅ `app/(main)/(onboarding)/ComparePrices.tsx` (UPDATED)
- ✅ `app/(main)/(onboarding)/JoinBuyingGroups.tsx` (UPDATED)
- ✅ `constant/api.ts` (UPDATED)

## Testing

To test the onboarding flow:

1. **First launch**: App should show onboarding screens
2. **Complete onboarding**: Click "Get Started" on final screen
3. **Verify redirect**: Should go to home screen
4. **Restart app**: Onboarding should NOT appear again
5. **Skip onboarding**: Click "Skip for now" to bypass screens
6. **Reset for testing**: Use AsyncStorage.removeItem() to clear status
