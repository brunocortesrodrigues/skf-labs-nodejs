# KBID XXX - CSS Injection 1 (CSSI)

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

When we start the application we can see that there is a text box that allow you to write a color name.

PRINTSCREEN PLACEHOLDER

We can write a color like:

PRINTSCREEN PLACEHOLDER

And depending on the color that we chose, this will be the color in the text below:

PRINTSCREEN PLACEHOLDER

## Exploitation

If we check how the text that we wrote in the text box is later put into the code we can see:

PRINTSCREEN PLACEHOLDER

If we try to insert a malicious code that we know it will be inserted in the source code, we can try something like this:

```text
blue;}</style><script>alert("CSSI")</script>
```

PRINTSCREEN PLACEHOLDER

This code should show an alert box or pop up alerting the text "CSSI".
If we check the website after sending the malicious request:

PRINTSCREEN PLACEHOLDER

And goal achieved!

## Additional sources

https://www.owasp.org/index.php/Testing_for_CSS_Injection_(OTG-CLIENT-005)
