# KBID xxx - Auth-bypass-simple

## Running the app nodeJs

First make sure nodejs and npm are installed on your host machine.
After installation, we go to the folder of the lab we want to practice.
"i.e /skf-labs/XSS, /skf-labs/RFI/" and run the following commands:

```
$ npm install
```

```
$ npm start
```

Now that the app is running let's go hacking!

## Reconnaissance

While most applications require authentication to gain access to private information or to execute tasks, not every authentication method is able to provide adequate security. Negligence, ignorance, or simple understatement of security threats often result in authentication schemes that can be bypassed by simply tampering with cookie values.

Let's log in with admin/admin as the application suggests.

PRINTSCREEN PLACEHOLDER

We see an API key, let's check the cookies:

PRINTSCREEN PLACEHOLDER

## Exploitation

We have a cookie called userId, maybe this application is relying on this cookie for authentication, let's try changing it to 2.

PRINTSCREEN PLACEHOLDER

Refreshing the page:

PRINTSCREEN PLACEHOLDER

The application did indeed use this cookie for authentication and now we have access to another user's API key.

## Additional sources

https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control

https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/04-Testing_for_Bypassing_Authentication_Schema
