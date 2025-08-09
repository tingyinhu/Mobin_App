import AsyncStorage from '@react-native-async-storage/async-storage';

// set onboarding flag status
export async function setOnboardingFlag(obFlag) {

    // console.log('updating obFlag');

    try {
        await AsyncStorage.setItem('OnboardingFlag', JSON.stringify(obFlag))
    } 
    catch (e) {
        console.log('error: ' + e);
    }
}

// get onboarding flag
export async function getOnboardingFlag() {

    let obShowFlag = null;
    // console.log('getting obFlag');

    try {
        obShowFlag = await AsyncStorage.getItem('OnboardingFlag');
    }
    catch (e) {
        console.log('error: ' + e);
    }

    return obShowFlag;
}