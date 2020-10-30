# Covid Tracker Slack app

Example Slack app to track COVID19 cases worldwide.

## Pre-requisites

- Familiarity with Slack and Slack apps
- Basic knowlege of javascript/node.

## Tools and Technologies

- Node/NPM
- [Bolt for JavaScript](https://slack.dev/bolt-js/concepts): Slack sdk for javascript
- [Slack Block kit](https://api.slack.com/block-kit): Slack's UI framework for building interactive apps.
- [Slack Block kit builder](https://app.slack.com/block-kit-builder): For UI prototyping .
- [Ngrok](https://ngrok.com/): To create a public URL and tunnel requests to your own development environment
- [Covid19 public API](https://api.covid19api.com/summary)

## Features

- **Slash command** `/covid-tracker top5` to list top 5 countries by reported cases
- **AppHome**: Show worldwide cases summary on app's Home tab

## Implementation

### 1. Create a Slack app

### 2. Setup a bolt project

### 3. Slash command

- Create slash command `/covid-tracker-24 top5` in app configuration page.
- Implement `app.command` code.

### 4. App home

- Subscribe to `app_home_opened` event in app configuration page.
- Implement `app.event` code.

## Next steps ?

### 1. Explore these platform features

- Shortcut and Modals
- Interactivity
- Link Previews

### 2. App distribution

### 3. Publish to app directory

## Best practices

- Use Granular Bot Permissions and bot tokens as much as possible.
- Acknowledge events comming from slack in 3 seconds or Use `response_url`
- Understand API rate limits.
- Use interactive blocks instead of plain text messages.
