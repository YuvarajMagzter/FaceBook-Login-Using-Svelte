
export async function load({ params, locals, cookies, url }) {
    let data = "Test";

    return {data};
}

export const actions = {
    signByFB: async ({request, cookies, url}) => {
        try {
            const formData = await request.formData();
            const recaptchaResponse = formData.get('captchaFB');
            const accessToken = formData.get('id_token_FB');
            const fbid = formData.get('fbidFB');
            const email = formData.get('emailFB');
            const name = formData.get("nameFB");

            let recievedData = {
                "recaptchaResponse" : recaptchaResponse,
                "email" : btoa(email),
                "fbid" : btoa(fbid),
                "fbName" : name,
                "accessToken" : accessToken
            }

            return recievedData;
            
        } catch {
            console.error("Error: ", error);
        }


    }
}