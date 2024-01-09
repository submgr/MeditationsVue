function toggleTheme() {
    if (document.body.classList.contains("dark"))
        document.body.classList.remove("dark");
    else
        document.body.classList.add("dark");
}


function autoTheme(theme = 'auto-detect') {
    switch (theme) {
        case 'auto-detect':
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                console.log("[CSS_GOD_RAYS__module] *autoTheme f.  :: dark theme detected")
                document.body.classList.add("dark");
            }else{
                console.log("[CSS_GOD_RAYS__module] *autoTheme f.  :: dark theme ISN'T detected, thus activating light theme")
                document.body.classList.remove("dark");
            }
            break;
        case 'light':
            if (document.body.classList.contains("dark")){
                document.body.classList.remove("dark");
                console.log("[CSS_GOD_RAYS__module] *autoTheme f.  :: LIGHT theme REQUESTED")
            }
            break;
        case 'dark':
            if (document.body.classList.contains("dark")){
                document.body.classList.add("dark");
                console.log("[CSS_GOD_RAYS__module] *autoTheme f.  :: DARK theme REQUESTED")
            }
            break;
    
        default:
            console.log("[CSS_GOD_RAYS__module] unexpected route inside of autoTheme's switch. please, check the code. Unique reference for search is: YT78849")
            break;
    }
}

console.log("[CSS_GOD_RAYS__module] Initializing auto detection function to get user's preference on color scheme...")
autoTheme('auto-detect');

const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
const lightModePreference = window.matchMedia('(prefers-color-scheme: light)');
darkModePreference.addEventListener("change", e => e.matches && autoTheme('auto-detect'))
lightModePreference.addEventListener("change", e => e.matches && autoTheme('auto-detect'))

console.log("[CSS_GOD_RAYS__module] Sending message to parent: BG*css_god_rays is loaded now...")
window.parent.postMessage({type: "MessageFromChild", idea: "css_god_rays", message: "loaded"}, "*");