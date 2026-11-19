# Getting Started with the BugLens SDK

BugLens captures frontend errors and helps you monitor unexpected issues encountered by users in your application.

To start capturing events, follow these steps:

## 1. Create an Account

First, create an account on the BugLens platform. Once your account is created and you log in, a clean dashboard will open.

## 2. Create a New Project

From the dashboard, click the **New Project** button. A project creation popup will appear.

Fill in the following details:

- **Project Name:** Enter a name for your project.
- **Site URL:** Enter the URL of your application.
- **Frontend Framework:** Select the frontend framework your application is built with. If your framework is not listed, select any available option.

Once all the details are filled in, click **Create Project**.

## 3. Get Your API Key

After creating the project, you will be redirected to your project dashboard.

There, you will find your project's API key. It will look something like this:

```text
bg_live_xxxxxxxxxxxxxxxxxxxxx
```

Keep this API key safe. It is used to connect your application with BugLens.

## 4. Integrate the BugLens SDK

To enable event capture, add the following script to your application's main HTML file, preferably just before the closing `</body>` tag.

Replace `YOUR_API_KEY` with the API key generated for your project.

```html
<script
    src="https://buglens-two.vercel.app/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>
```

## 5. Start Capturing Events

Once the script is added and your application is running, the BugLens SDK can capture frontend errors and send the collected events to BugLens for processing.

You can then open your project dashboard to monitor the errors encountered by your users, including issues that might otherwise go unnoticed.

**That's it!** Your application is now connected to BugLens and ready for frontend error monitoring.