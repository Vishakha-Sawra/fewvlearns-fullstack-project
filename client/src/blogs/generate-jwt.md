---
title: FEWV Seconds of Learing How to generate a JWT?
description: Learn about JWT in just a single article.
tags:
  - "great"
  - "awesome"
  - "rad"
---

# Prerequisites

The prerequisites will be that you should have node, and npm, installed.

Also, create an AWS account by visiting the [AWS site](https://aws.amazon.com/) and then complete your sign-up process by providing your credentials.

1. fewvlearns.io

![prerequisites](/src/assets/home-image.png)

> "In a few moments he was barefoot, his stockings folded in his pockets and his
  canvas shoes dangling by their knotted laces over his shoulders and, picking a
  pointed salt-eaten stick out of the jetsam among the rocks, he clambered down
  the slope of the breakwater."

Once that is done, open the terminal and check the node and npm version by running the command

```bash
node -v
npm -v
```

Then let's now install the amplify CLI by running the command:

```bash
npm install -g @aws-amplify/cli
```

# Create a new React Project

Then create a new react app by running the command:

```bash
npx create-react-app your-app-name
```

Once, your application is created open it into the VS code

# Set up amplify CLI

Now we have to set up the Amplify CLI on our local machine.

So for it, open the terminal and run the command:

```bash
amplify configure
```

We are just configuring it to connect to our AWS account.

After running this command it then takes you to the AWS console, where you've to sign in.
If you have already signed in, then hit enter in the terminal, then it will ask you to select the AWS region. Select the region you want.

Then we have to specify the user name that we want to use. It will again take you to the aws console where we have to Enter a User name and then select Next. You can name the user anything but I'll call it "amplify-auth".

Select the Attach policies directly and select AdministratorAccess-Amplify as the Permissions policy. Click on the Next.

Then we have a Review page, check that everything is ok, and then select Create user.

And there we have this user list where you will have the user that you created just now.

Scroll down and now our next step is to create an access key, to do that: select Create Access Key, choose CLI, and then click Next. And there you will have your access key and secret access key.

Once all is done, go back to the VS code, and then press enter. Then here we have to provide the keys. Copy the keys and paste them in the terminal.

This will update/create the AWS Profile on your local machine.

Then provide the profile name and the new user is set up successfully.

# Initialize AWS in React Project

After this, our next step is to initialize AWS Amplify in the project directory by running the command in the terminal:

```bash
amplify init
```

This is going to ask a few configuration questions: like the name of the project. Provide the name and then it's going to set up the rest of the configuration for you.

It then asks if you want to use an AWS profile, select yes, and then select which profile you want to use.

It going to now take a few minutes to set up the application.

After that is done, you will now have this **amplify** folder and an **aws-export.js** file in your project directory.

# Authenticate the React app

Now we want to add authentication to our react app, for that run the command:

```bash
amplify add auth
```

Select default configuration and then email; because you do want your user to authenticate with email right?

And that's all. Then we enter the option, **no it's done**. Now let's push all of this to amplify, so for it run the command:

```bash
amplify push
```

Select **yes** so that it can update its resources. It might take a few moments.

# Installing the packages needed

After you have successfully pushed the resources on Amplify, we need two packages to be installed in order to work with Amplify.

So, in the terminal run the command:

```bash
npm install --save aws-amplify @aws-amplify/ui-react
```

# Start writing the code.

In the **App.js** file let's start by removing all this content and then import react and the CSS file.

We also import Amplify from aws-amplify

Then we import two components, **withAuthenticator** and **Authenticator** from AWS Amplify that will help with user authentication UI.

```js
import "./App.css";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Authenticator>
          {({ signOut, user }) => (
            <main>
              <div className="App">
                <header className="App-header">
                  <button onClick={signOut}>Sign out</button>
                  <h2>My App Content</h2>
                </header>
              </div>
            </main>
          )}
        </Authenticator>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
```

**import '@aws-amplify/ui-react/styles.css';**: Then we also imports a CSS file from the @aws-amplify/ui-react package. The styles.css file contains pre-defined styles for the AWS Amplify UI components

**import awsExports from './aws-exports';** We also want to import a JavaScript object from a local file called aws-exports. The aws-exports file likely contains configuration settings for the AWS Amplify library. This could include information such as AWS region, user pool details, API endpoints, and other authentication-related configurations.
