# Updated Onboarding Flow - Post-Login

## New Flow Architecture

```
App Launch
    ↓
Show (core) - Public pages (Home, How It Works)
    ↓
User clicks "Sign Up" or "Sign In"
    ↓
Show (auth) - Login/Signup screens
    ↓
User successfully logs in
    ↓
Check onboarding status in AsyncStorage
    ├─ If NOT completed → Show (main)/(onboarding) screens
    │   ├─ TrackYourInput
    │   ├─ ComparePrices
    │   └─ JoinBuyingGroups → completeOnboarding() → Go to Dashboard
    │
    └─ If completed → Go directly to Dashboard
```

## Key Changes

### 1. Root Layout (`app/_layout.tsx`)
- Simplified to always show (core), (auth), and (main)
- No conditional rendering based on onboarding status
- Navigation flow is controlled by individual screens

### 2. Login Screen (`app/(auth)/Login.tsx`)
- After successful login, checks onboarding status
- If NOT completed: Routes to `/(main)/(onboarding)/TrackYourInput`
- If completed: Routes to `/(main)/dashboard`

### 3. Dashboard (`app/(main)/dashboard.tsx`)
- New screen that appears after onboarding is complete
- Shows user stats, quick actions, and recent activity
- Accessible only after user logs in and completes onboarding

### 4. Onboarding Screens
- Only accessible after user logs in
- Final screen redirects to dashboard (not home)
- Skip buttons redirect to home `/(core)`

## Navigation Paths

### First-Time User Flow:
```
(core) → (auth)/Login → (main)/(onboarding)/TrackYourInput 
→ ComparePrices → JoinBuyingGroups → (main)/dashboard
```

### Returning User Flow:
```
(core) → (auth)/Login → (main)/dashboard
```

### Skip Onboarding:
```
(core) → (auth)/Login → (main)/(onboarding)/TrackYourInput 
→ [Skip] → (core)
```

## File Structure

```
app/
├── _layout.tsx (Root - shows all stacks)
├── (core)/
│   ├── index.tsx (Home)
│   └── HowItWorksScreen.tsx
├── (auth)/
│   ├── Login.tsx (Checks onboarding after login)
│   └── Signup.tsx
└── (main)/
    ├── _layout.tsx
    ├── dashboard.tsx (NEW - Post-onboarding dashboard)
    └── (onboarding)/
        ├── _layout.tsx
        ├── TrackYourInput.tsx
        ├── ComparePrices.tsx
        └── JoinBuyingGroups.tsx (Redirects to dashboard)
```

## Implementation Details

### Login Flow:
```typescript
// After successful login
const hasCompletedOnboarding = await checkOnboardingStatus();

if (hasCompletedOnboarding) {
  router.replace('/(main)/dashboard');
} else {
  router.replace('/(main)/(onboarding)/TrackYourInput');
}
```

### Onboarding Completion:
```typescript
// On final screen "Get Started" button
await completeOnboarding();
router.replace('/(main)/dashboard');
```

## Benefits

✅ **Public Access First**: Users can browse home and how-it-works before signing in
✅ **Authenticated Onboarding**: Onboarding only shows after user logs in
✅ **Smart Routing**: Returning users skip onboarding and go straight to dashboard
✅ **Skip Option**: Users can skip onboarding and return to home
✅ **Clean Separation**: Public (core) vs Authenticated (main) flows

## Testing Scenarios

1. **First-time user**:
   - Visit home → Sign up → Complete onboarding → See dashboard

2. **Returning user**:
   - Visit home → Sign in → See dashboard (no onboarding)

3. **Skip onboarding**:
   - Visit home → Sign up → Skip onboarding → Back to home

4. **Reset for testing**:
   ```typescript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   await AsyncStorage.removeItem('hasseenonboarding');
   ```
