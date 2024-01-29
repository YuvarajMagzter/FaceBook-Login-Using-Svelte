
<script>
    let token;
    export let form;
    export let data;

    console.log(form, "form-data");
</script>

<svelte:head>
    <script src="https://www.google.com/recaptcha/api.js?render=6LePk50UAAAAAAMVdVXntpM-xrLezBXtD7jc_BEt"></script>
</svelte:head>

<body onload="generateRecaptcha(); onFBLoad();">
    
    <h1>Log in by facebook</h1>

    <p>{form?.recievedData}</p>

    <button onclick="signInWithFB()">Facebook</button>

    <form action="?/signByFB" method="post">
        <input type="hidden" name="captchaInput" id="captchaInput">
        <input type="hidden" name="id_token_FB" id="id_token_FB">
        <input type="hidden" name="fbidFB" id="fbidFB">
        <input type="hidden" name="emailFB" id="emailFB">
        <input type="hidden" name="nameFB" id="nameFB">

        <button type="submit" id="submitFB" name="submitFB" style="display: none;">Submit</button>

        <script>
            function signInWithFB() {
                console.log("Fb button has clicked....");
        
                // Pass a callback function to getUserInfo
                FB.login(function(response) {
                    if (response.authResponse) {
                        // User is logged in and granted permission
                        console.log(response, 'response from fb');
                        let accessToken = response.authResponse.accessToken;
                        console.log(accessToken, "accessToken");
        
                        document.getElementById("id_token_FB").value = accessToken;
        
                        getUserInfo(accessToken, function(userInfo) {
                            console.log(userInfo, "userInfo................");
                            if (userInfo) {
                                document.getElementById("fbidFB").value = userInfo.id;
                                document.getElementById("emailFB").value = userInfo.name;
                                document.getElementById("nameFB").value = userInfo.email;
        
                                document.getElementById("submitFB").click();
                            } else {
                                console.error('Error fetching user information.');
                            }
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, { scope: 'email' });
        
                console.log("FB page loaded.");
            }
        
            function getUserInfo(accessToken, callback) {
                console.log("This is coming to getUserInfo block.");
                // Make a request to the Facebook Graph API to get user information
                FB.api('/me', { fields: 'id,name,email', access_token: accessToken }, function(response) {
                    if (response && !response.error) {
                        // User information retrieved successfully
                        callback({
                            id: response.id,
                            name: response.name,
                            email: response.email
                        });
                    } else {
                        // Error fetching user information
                        console.error('Error fetching user information:', response.error);
                        callback(null);
                    }
                });
            }
        </script>
    </form>
    
    <script>
        async function generateRecaptcha() {
            console.log("onload function for recaptcha has been generated.");
    
            const siteKey = "6LePk50UAAAAAAMVdVXntpM-xrLezBXtD7jc_BEt";
            const recaptcha = await grecaptcha.execute(siteKey, {
                action: "submit",
            });
    
            token = recaptcha;
            console.log(token, "Token for Client");

            document.getElementById("captchaInput").value = token;
        }

        function onFBLoad() {
            console.log("onlod function has been called for fb......");
    
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : 2267056250101760,
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v12.0'
                });
            };
    
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    </script>
</body>