import globaldata from '../modules/global';

// in obj we pass the data for search
// in vueobject we pass Vue Object, simply: we just put there "this" context from the parent Component.

/**
 * Retrieves meditation data based on the provided parameters.
 * @param {Object} obj - The object containing the parameters for the meditation search.
 * @param {Object} vueobject - The Vue object.
 * @returns {Promise} - A promise that resolves with the retrieved meditation data.
*/

export async function get(obj, vueobject) {

    // eslint-disable-next-line
    var parent_this = vueobject;

    try {
        vueobject.loading = true;
    } catch (error) {
        console.error("Unable to set loading status to TRUE.")
    }

    console.warn("Getting meditation data...")
    console.log("provided obj for search..", obj)
    var additionalurl = ""
    var preparedparams = {}
    switch (obj.servicetype) {
        case "dynamic":
            additionalurl = "getDynamicMeditation"
            var newbieprogress = 0;
            if (localStorage.getItem("newbie_progress") == null) {
                newbieprogress = 0
            } else {
                newbieprogress = parseInt(localStorage.getItem("newbie_progress"))
            }
            preparedparams = {
                newbie_progress: newbieprogress,
                language: globaldata.language.currentlang
            }

            break;
        default:
            additionalurl = "getStaticMeditation"
            preparedparams = {
                searchtype: obj.searchtype,
                searchtag: obj.searchtag,
                language: globaldata.language.currentlang
            }
            break;
    }
    vueobject.$http.get(globaldata.api.hostname + "access/meditations/" + additionalurl, {
        params: preparedparams
    }).then((response) => {
        if (response.status == 200) {
            if (response.data.status == "okay") {
                localStorage.setItem("temp/alfa_meditationdata", JSON.stringify(response.data))

                if (localStorage && localStorage.getItem("useNonProgressiveAudioPlayer") == "true") {
                    console.log("useNonProgressiveAudioPlayer? YES")
                    vueobject.$router.push({
                        name: "meditation/playnonprogressive",
                    });
                } else {
                    console.log("useNonProgressiveAudioPlayer? NO")
                    vueobject.$router.push({
                        name: "meditation/play",
                    });

                }
            } else {
                // proccessed by the server, but without successfull result.
            }
        } else {
            // can't proccess this request on server: some error happens.
        }

        
        try {
            vueobject.loading = false;
        } catch (error) {
            console.error("Unable to set loading status to FALSE.")
        }

    }).catch(function (error) {
        console.log("CATCHED AN ERROR.", error)
        vueobject.loading = false;
    });
}
