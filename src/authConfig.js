export const msalConfig = {
    auth: {
        clientId: "662d94ed-38d5-494e-a046-eabdd43d6584",
        authority: "https://login.microsoftonline.com/b7cfda6d-56ed-46ea-b26f-c84e3b9bd53c",
        redirectUri: process.env.REACT_APP_REDIRECT_URI 
        // || "https://black-wave-0e8810e03.6.azurestaticapps.net/"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
};
