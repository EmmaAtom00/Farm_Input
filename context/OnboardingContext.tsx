// import { checkOnboardingStatus, completeOnboarding } from '@/constant/api';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// interface OnboardingContextType {
//     hasCompletedOnboarding: boolean | null;
//     completeOnboarding: () => Promise<void>;
//     isLoading: boolean;
// }

// const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const checkStatus = async () => {
//             try {
//                 const completed = await checkOnboardingStatus();
//                 setHasCompletedOnboarding(completed);
//             } catch (error) {
//                 console.error('Error checking onboarding status:', error);
//                 setHasCompletedOnboarding(false);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         checkStatus();
//     }, []);

//     const handleCompleteOnboarding = async () => {
//         try {
//             await completeOnboarding();
//             setHasCompletedOnboarding(true);
//         } catch (error) {
//             console.error('Error completing onboarding:', error);
//         }
//     };

//     return (
//         <OnboardingContext.Provider
//             value={{
//                 hasCompletedOnboarding,
//                 completeOnboarding: handleCompleteOnboarding,
//                 isLoading,
//             }}
//         >
//             {children}
//         </OnboardingContext.Provider>
//     );
// };

// export const useOnboarding = () => {
//     const context = useContext(OnboardingContext);
//     if (!context) {
//         throw new Error('useOnboarding must be used within OnboardingProvider');
//     }
//     return context;
// };
