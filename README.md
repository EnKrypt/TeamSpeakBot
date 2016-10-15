TeamSpeakBot
==

A TeamSpeak bot in javascript to manage playing audio and music using commands

## Introduction

*Note: This bot is not a TeamSpeak client itself. You have to have one running alongside it.*

The way TeamSpeakBot works is by plugging into the ClientQuery interface of an existing client. Audio is played to the default playback device and you are expected to loop that back through your client's recording device in your setup.

The bot can play audio from any mp3 or youtube URL. You also have commands for volume, seek and speed control.

There are also certain user defined commands that can be modified as necessary. The default ones provided will cover  your needs when it comes to all the edgy dank memes.

## Setting up

First install TeamSpeakBot with npm

```
$ npm install -g teamspeakbot
```

Then run TeamSpeakBot on the command line

```
$ teamspeakbot
```

You can also clone this repository and run `bot.js` with node. Whatever works for you.

Next, you need to install [`mpv`](https://mpv.io/) which is the software that will be invoked to play all the audio. Installing just the command line version will work fine.

The default keyboard shortcuts to seek in mpv is the left and right keys, but unfortunately those are hard to pipe via stdin, so we need to remap it to something else more convenient. Look through mpv's documentation and figure out how to edit/create the input.conf file for mpv. (For linux, it should be: `~/.mpv/input.conf`) The following should be the contents of that file:

```
g seek  5
a seek -5
```

After that, you need to configure your machine's audio devices such that audio coming out of mpv is redirected as the input for your TeamSpeak client.
* Windows has something called Stereo Mix that turns audio output into input. Look it up first, learn how to enable it, and change your TeamSpeak client's capture/recording settings to use that interface.
* If you are running a headless linux server via ssh, you need to configure pulseaudio and you're pretty much done. (Also note, if you're running headless, you will need to run your TeamSpeak client with a virtual framebuffer like Xvfb, otherwise it will not load).
* If neither of those are right for you, feel free to use any Virtual Audio Cable software. This is however slightly harder since you will need or configure your virtual devices appropriately, tell mpv to output to that device, and reflect the same on your TeamSpeak client's settings.

That's it. Run a command and see if it works. If it does not, fix it yourself. This is something I made for my convenience, not yours. If you really want support, write a petition to the TeamSpeak developers to not code like a bunch of cunts and I'll turn this into a community project. You see all that bullshit confuration you had to do above to run a simple bot? Yeah that's all their fault for providing zero support for external development apart from a half baked ClientQuery protocol that's so old, it's almost reached the age of consent.

Also note that support for youtube playback is a bit flaky. You will need the [`youtube-dl`](https://rg3.github.io/youtube-dl/) program installed (mpv will automatically plug into it) and it **needs** to be up to date. If you do not constantly keep updating to the latest version, the urls may not play whenever youtube changes its structure or protocols.

If you don't want to use mpv, you can edit `commands/play.js` if you'd like to use something else. You will also have to change the shortcuts used in `seek.js`, `speed.js` and `volume.js` in the `playing` directory.
