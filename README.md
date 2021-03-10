# Techforce RPG

This is the code for the knowledge session of March 11, 2021. The workshop is meant for the participants to get familiar with ReactJS.

## Requirements

- [NodeJS](https://nodejs.org/en/download/) and NPM

Be aware that you'll need at least the following versions:

- NodeJS: 10.16 or higher
- NPM: 5.6 or higher

## Installation

Before running the program, you'll need to install all the dependencies. You can do this by executing the following command in the project root:

``` shell
$ npm install
...
added 1986 packages from 817 contributors and audited 1989 packages in 33.189s
found 0 vulnerabilities
```

It's possible that the dependency installer gives some errors while installing or that the numbers shown above are different for your local setup.
However, as long as the command finishes with a similar output as listed above, you should be good to go!

## Running the app

To start the application, you simply have to execute the following command from the project root:

``` shell
$ npm start

Compiled successfully!

You can now view techforce-rpg in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.0.1.10:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

If you get any other response than the one listed above, something went wrong.
Please contact the creator of this project for help with debugging.

## Assignments

For the workshop, a list of assignments are made available for you to expand the current application. Before starting with the assignments, it's adviced to get yourself familiar with the project and take a look around the folder structure.

The assignments vary in difficulty (they get harder further down) and are mostly independent, stand-alone features (unless stated otherwise). If you feel confident you understand the basics of React, I would suggest you take a look at the assignments and start with one that you feel comfortable with. 

**Note: For the Multiplayer assignments, please switch to the workshop-multiplayer branch!**

To make the assignments a little more easy, please familiarize yourself with the [Material UI](https://material-ui.com/) library a bit. This is a CSS library that is used in this project to make everything look super fancy! You don't have to know exactly how to implement everything strait away, but it would help if you know what kind of components are made available to you.

### **Enable controls**

Our wizard is dead in the water! None of the controls are working. Connect the controls to the rest of the application.

### **Enable physics**

Whoops, right now our wizard can fall off the edge of the board and walk through rocks. That's not how physics work! Add some basic physics to the game.
A few things to consider:

- Rocks are impenetrable, infinitely tall structures (because that's how physics work). You can't walk over them, only go around.
- You are walled in, you can't just walk off the side of the map.
- Later you'll be walking in a dungeon together with other wizards. Be prepared and make sure you can't walk through other people.

### **Enable keyboard input**

Clicking those buttons with your mouse all the time isn't very fast. Implement a listener that can listen for keyboard events so you can move even faster.

### **Create bots**

Why should you do all the work? You program stuff to let other people do stuff right?
Implement a bot that can move and fight for you!
Tip; you can open multiple instance of your bot by opening different browser tabs pointing to this application.


## Multiplayer assignments
*Note: From here, please switch to the `workshop-multiplayer` branch!*

### **Multiplayer: Connect to server**

Instead of playing all by yourself, you can now play online on the world wide web! To do this you'll need to connect the application to the server via an API.
You can enable this connection in the `src/api/game.ts` file. Over there is a subjet all available command that you can send to the server. You'll need the server IP to do so.

### **Multiplayer: Sync game state**

In order to complete this assignment, you need to finishe the [_Connect to server_](#connect-to-server) assignment first.
Now that you're connected with the server you can start syncing up the game state with the server. You can start the sync in the `src/App.tsx` file where a outcommented template has been provided.

### **Multiplayer: Update player**

In order to complete this assignment, you need to finishe the [_Connect to server_](#connect-to-server) assignment first.
Signal your personaly preferences to other players by saving your user settings on the server.
Look in `src/api/game.ts` for some useful functions.

### **Multiplayer: Sync moves**

In order to complete this assignment, you need to finishe the [_Connect to server_](#connect-to-server) assignment first.
As you may have noticed, your movements are not recognized by the server and again you're dead in the water! Quickly enable this feature again before you're eaten by other hungry wizards.
Look in `src/api/game.ts` for some useful functions.

### **Multiplayer: Attack**

In order to complete this assignment, you need to finishe the [_Connect to server_](#connect-to-server) assignment first.
Here comes the fun part. The server supports damaging other players. Don't worry though, it's too gory. Also they don't really die, they just get send to a wizard farm. At least that's what my mother told me.
You can add an attack button to the controls, or in any other location of your chosing. Additionally, look in `src/api/game.ts` for some useful functions.

### **Multiplayer: List online users**

In order to complete this assignment, you need to finishe the [_Connect to server_](#connect-to-server) assignment first.
By now there must be a lot of different tiny wizards on your screen, but it must be difficult to keep them all apart.
Implement a separate component that lists out all the different user. You can add things like health, name, color, etc.
