# KBID 3 - Cross Site Scripting

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

#### Step 1

The application shows an input field box were we can try our injections. Lets first inject a normal test string and see how our input is used in the application.

PRINTSCREEN PLACEHOLDER

As you can see below the request in our intercepting proxy that was made by the application.

PRINTSCREEN PLACEHOLDER

In the source of the application we can see that this application will take the user input and use a template variable to display it in the application.

```javascript
app.post("/home", (req, res) => {
  let userInput = req.body.string;
  res.render("index.ejs", { xss: userInput });
});
```

```markup
<center> <p style="font-size:2em;"> <%- xss %> </p> </center>
```

The variable is then used in the index.ejs to display the content suplied by the user. But as you can see the tag being used in ejs is <%- which means is not being escaped by the template engine . This indicates that is should be possible to perform a Cross Site Scripting \(XSS\) injection.

PRINTSCREEN PLACEHOLDER EJS TAGS

## Exploitation

#### Step 1

Now we have seen where the user input is being reflected in the application we will have to look what dangerous HTML characters are not properly escaped so we can build our XSS payload. So for our first check we use the following string as an input:

```text
foobar"></
```

PRINTSCREEN PLACEHOLDER

As you can see the application did not encode or blacklisted any of the dangerous HTML characters. Now lets try the XSS payload to see if this also is reflected back withouth any escaping or blacklist filtering.

```text
foobar<script>alert(123)</script>
```

PRINTSCREEN PLACEHOLDER

Again the application is not encoding or blacklisted any of the dangerous HTML characters. This payload seems to work in the intercepting proxy. Now lets try it in our Chrome browser.

PRINTSCREEN PLACEHOLDER

In Firefox we can see the XSS alert pop-up and we have successfully performed the XSS attack.

## Additional sources

Please refer to the OWASP testing guide for a full complete description about cross site scripting!

https://owasp.org/www-community/attacks/xss/
https://ejs.co/#docs
