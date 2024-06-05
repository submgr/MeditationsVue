import * as YandexAds from 'cordova-plugin-yandex-ads/www/yandexads';
declare const vkBridge;

import { Capacitor } from '@capacitor/core';
import {
    AdMob, BannerAdPluginEvents, BannerAdOptions, AdMobBannerSize, InterstitialAdPluginEvents, AdOptions, AdLoadInfo, BannerAdSize, BannerAdPosition, AdMobError,
    RewardAdPluginEvents, AdMobRewardItem, RewardAdOptions
} from '@capacitor-community/admob';

const admobConfig = {
    banner_block_id: "ca-app-pub-1091706109493372/7990659366",
    interstitial_block_id: "ca-app-pub-1091706109493372/3070285425",
    rewardedinterstitial_block_id: "ca-app-pub-1091706109493372/8793423386",
    testing_devices: ['5ddf471b-2cdb-4513-ad53-0f0859a9254a'],
    is_testing: true
}

export async function prepareAdsService(adsSpecificNetwork = null) {
    console.log("[ADS_ENGINE] Performing runAdsService() now...")

    switch (adsSpecificNetwork) {
        case "vkminiapps":
            localStorage.setItem("adsSpecificNetwork", "vkminiapps")
            break;
        case "YandexWebAds":
            localStorage.setItem("adsSpecificNetwork", "YandexWebAds")

            break;
        default:
            if (Capacitor.isNativePlatform()) {
                await YandexAds.init({
                    rewardedBlockId: 'R-M-9152925-3',
                    interstitialBlockId: 'R-M-9152925-2',
                    bannerBlockId: 'R-M-9152925-1',
                    options: { // This is for banner ads
                        overlap: false, // Show under all elements (works only on android)
                        bannerAtTop: false, // Show banner on top of screen, otherwise on bottom
                        bannerSize: YandexAds.BANNER_728x90, // Your banner size
                    },
                });

                const { status } = await AdMob.trackingAuthorizationStatus();

                if (status === 'notDetermined') {
                    /**
                     * If you want to explain TrackingAuthorization before showing the iOS dialog,
                     * you can show the modal here.
                     * ex)
                     * const modal = await this.modalCtrl.create({
                     *   component: RequestTrackingPage,
                     * });
                     * await modal.present();
                     * await modal.onDidDismiss();  // Wait for close modal
                     **/
                }

                AdMob.initialize({
                    testingDevices: admobConfig.testing_devices,
                    initializeForTesting: admobConfig.is_testing,
                });

                console.log("Now called for initialization Yandex.Ads and Google Admob for further access.")

            } else {
                // non-native platforms like YandexGames and VK Mini Apps go here!

                // No Need To Initialize Yandex Games Ads
                // No Need To Initialize VK Mini Apps Ads
            }
            break;
    }

}


// banner ads goes here!

export async function showBanner() {
    console.log("[ADS_ENGINE] Performing showBanner() now...")
    if (localStorage.getItem("premiumuser") == "true") {
        console.log("[ADS_ENGINE] Premium user, aren't goint to show ad...")
        // nothing... we don't show ads to premium users :)
    } else {
        if (Capacitor.isNativePlatform()) {
            // Native
            console.log("[ADS_ENGINE] Native Platform Detected...")
            showAdmobBanner();
        } else {
            // Non-Native
            //alert("non native")
            console.log("[ADS_ENGINE] Non-Native Platform Detected...")
            showNonNativeBanner();
        }
    }


}

export async function showAdmobBanner() {
    console.log("[ADS_ENGINE] Performing showAdmobBanner() now...")
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        // Subscribe Banner Event Listener
    });
    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
        // Subscribe Change Banner Size
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
        // Subscribe Change Banner Size
    });
    AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (info: AdMobError) => {
        console.error("[ADS_ENGINE] Catched an error! Print of AdMobError: " + JSON.stringify(info))
        showYandexAdsBanner();
    });
    const options: BannerAdOptions = {
        adId: admobConfig.banner_block_id,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        // npa: true
    };
    AdMob.showBanner(options);
    setupAdSizeListener();
}

function setupAdSizeListener() {
    var eventOnAdSize = AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info: AdMobBannerSize) => {
        const appMargin = info.height;
        const ion_router_outlet = document.querySelector('ion-router-outlet');

        if (!ion_router_outlet) {
            console.error('Ion router outlet not found');
            return;
        }

        if (appMargin === 0) {
            document.querySelector('ion-router-outlet').style.marginBottom = `0px`;
            let style = document.createElement('style');
            style.innerHTML = `ion-modal, ion-action-sheet {
            margin-bottom: 0px;
        }`
            document.head.appendChild(style);
            return;
        }

        if (appMargin > 0) {
            const safeAreaBottom = 5; //in px
            const calculatedNeededMargin = safeAreaBottom + appMargin; //in px
            document.querySelector('ion-router-outlet').style.marginBottom = `${calculatedNeededMargin}px`;

            let style = document.createElement('style');
            style.innerHTML = `ion-modal, ion-action-sheet, ion-action-sheet {
            margin-bottom: ${calculatedNeededMargin}px;
        }`
            document.head.appendChild(style);
        }
    });
}

export async function showYandexAdsBanner() {
    console.log("[ADS_ENGINE] Performing showYandexAdsBanner() now...")
    YandexAds.loadBanner();

    window.addEventListener("bannerDidLoad", function () {
        YandexBannerOffsetBottom(90);
        YandexAds.showBanner();
    });
}

function YandexBannerOffsetBottom(banner_height = 0) {
    const appMargin = banner_height;
    const ion_router_outlet = document.querySelector('ion-router-outlet');

    if (!ion_router_outlet) {
        console.error('Ion router outlet not found');
        return;
    }

    if (appMargin === 0) {
        document.querySelector('ion-router-outlet').style.marginBottom = `0px`;

        let style = document.createElement('style');
        style.innerHTML = `ion-modal, ion-action-sheet {
            margin-bottom: 0px;
        }`
        document.head.appendChild(style);


        return;
    }

    if (appMargin > 0) {
        const safeAreaBottom = 8; //in px
        const calculatedNeededMargin = safeAreaBottom + appMargin; //in px
        document.querySelector('ion-router-outlet').style.marginBottom = `${calculatedNeededMargin}px`;

        let style = document.createElement('style');
        style.innerHTML = `ion-modal, ion-action-sheet {
            margin-bottom: ${calculatedNeededMargin}px;
        }`
        document.head.appendChild(style);
    }
}

export async function hideBanner() {
    console.log("[ADS_ENGINE] Performing hideBanner() now...")
    if (Capacitor.isNativePlatform()) {
        // Native    
        AdMob.hideBanner();
        YandexAds.hideBanner();
        YandexBannerOffsetBottom(0);
    } else {
        // Non-Native
        // alert("non native")
        hideNonNativeBanner();
    }
}

// interstitial ads goes here!

export async function showInterstitial() {
    console.log("[ADS_ENGINE] Performing showInterstitial() now...")
    showAdmobInterstitial();
}

export async function showAdmobInterstitial() {
    console.log("[ADS_ENGINE] Performing showAdmobInterstitial() now...")
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
        // Subscribe prepared interstitial
    });
    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error: AdMobError) => {
        // Subscribe prepared interstitial
        showYandexAdsInterstitial();
    });

    const options: AdOptions = {
        adId: admobConfig.interstitial_block_id,
        isTesting: admobConfig.is_testing
        // npa: true
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
}

export async function showYandexAdsInterstitial() {
    console.log("[ADS_ENGINE] Performing showYandexAdsInterstitial() now...")
    YandexAds.loadInterstitial();

    window.addEventListener("interstitialLoaded", function () {
        YandexAds.showInterstitial();
    });
}

// rewarded interstitial ads goes here!

export async function showRewarded() {
    console.log("[ADS_ENGINE] Performing showRewarded() now...")
    showAdmobRewarded();
}

export async function showAdmobRewarded() {
    console.log("[ADS_ENGINE] Performing showAdmobRewarded() now...")
    AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
        // Subscribe prepared rewardVideo
    });

    AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
        // Subscribe user rewarded
        console.log(rewardItem);
    });

    AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (error: AdMobError) => {
        // Subscribe user rewarded
        showYandexAdsRewarded();
    });

    const options: RewardAdOptions = {
        adId: admobConfig.rewardedinterstitial_block_id,
        isTesting: admobConfig.is_testing
        // npa: true
        // ssv: {
        //   userId: "A user ID to send to your SSV"
        //   customData: JSON.stringify({ ...MyCustomData })
        //}
    };
    await AdMob.prepareRewardVideoAd(options);
    const rewardItem = await AdMob.showRewardVideoAd();
}

export async function showYandexAdsRewarded() {
    console.log("[ADS_ENGINE] Performing showYandexAdsRewarded() now...")
    YandexAds.showRewardedVideo();

    window.addEventListener("rewardedVideoLoaded", function () {
        YandexAds.showRewardedVideo();
    });
}

declare const Ya;

export async function showNonNativeBanner() {
    var adsSpecificNetwork = localStorage.getItem("adsSpecificNetwork");
    console.log("Catched in f() -showNonNativeBanner-, value of adsSpecificNetwork:", adsSpecificNetwork)
    switch (adsSpecificNetwork) {
        case "vkminiapps":
            //alert("VK Banner Ad PATH SELECTED")
            vkBridge.send('VKWebAppShowBannerAd', {
                banner_location: 'bottom'
            })
                .then((data) => {
                    if (data.result) {
                        // alert("VK Banner Ad is Ready")
                        // Баннерная реклама отобразилась
                    }
                })
                .catch((error) => {
                    // Ошибка
                    // alert("VK Banner Ad ERROR" + error)
                    console.log(error);
                });
            break;
        case "YandexWebAds":
            console.log("YandexWebAds Banner Ad PATH SELECTED, doing yaContextCb.push...")
            setTimeout(() => {
                (<any>window).yaContextCb.push(()=>{
                    Ya.Context.AdvManager.render({
                        "blockId": "R-A-9154386-2",
                        "type": "fullscreen",
                        "platform": "touch"
                    })
                })
            }, 5000);
            break;
        default:
            break;
    }
}

export async function hideNonNativeBanner() {
    var adsSpecificNetwork = localStorage.getItem("adsSpecificNetwork");
    console.log("Catched in f() -hideNonNativeBanner-, value of adsSpecificNetwork:", adsSpecificNetwork)
    switch (adsSpecificNetwork) {
        case "vkminiapps":
            //alert("VK Banner Ad PATH SELECTED")
            vkBridge.send('VKWebAppHideBannerAd', {
                banner_location: 'bottom'
            })
                .then((data) => {
                    if (data.result) {
                        // alert("VK Banner Ad is Ready")
                        // Баннерная реклама скрылась
                    }
                })
                .catch((error) => {
                    // Ошибка
                    // alert("VK Banner Ad ERROR" + error)
                    console.log(error);
                });
            break;

        default:
            break;
    }
}