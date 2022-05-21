# to-do-list
To-Do List project for the Odin Project.

--Features---


---Devlog---

May 9th, 2022

    God, it takes so long to set up all the webpack stuff. There's probably a better way to do it that I just missed, whatever. Now have the dev server running, so seeing updates might even be more convenient than it was without webpack at all. Pretty sick.

    So this is gonna be a slightly bigger project than the restaurant page. I'm thinking maybe three days, four max. Shouldn't be all that hard to set up a basic to-do list. After that, I'm adding a little lady friend similar to kurippi from whichever project she was in. I was gonna make this an rpg style to-do list, but those already exist, so I want something slightly more unique. Similar concept here, but the gameification is through a dating sim instead. Super basic though. No dialogue, just a gift system, a currency, and some emotions from Loretta maybe. That's her name btw.

May 10th, 2022

    Things are going pretty well. Started adding more of the basic funcitonality you'd expect from a to-do list program. No major bugs or issues today, until I tried adding a bunch of line breaks to the displayed tasks. They all get ignored but the last one, and every time I google it I only get results for people trying to have their output match my issue. 

    Classic, "fixed it, but I have no idea what the issue was." Instead of adding new lines to the inner text, I just made a variable that I would add to and the set the inner text to the variable. Works great. Don't know why I needed it.

May 11th, 2022

    Another pretty solid day. I was able to quickly fix the remove project button, which was not working properly at the end of my time yesterday. Also added a checkbox for tasks, which required slighly reworking a few things, but it's pretty solid now.

May 15th, 2022

    I actually did work for 6 hours on this on the 12th. Then I got busy one day and didn't work. Then I somehow got sick again, and am currently all stuffed up. Oh well, better one day lost than almost a week. Base project is largely done. I think I may as well pimp this out with all the features I imagined. Probably won't double the development time to add the dating sim stuff and local storage. Might take six hours to customize the radio buttons though.

    Did not take six hours to do the radio buttons.

May 16th, 2022

    So I was sick yesterday again and wasn't able to do a full day of work. Today will therefore be the day to learn local storage. Seems crazy useful, but I got stuck on it yesterday. Making good progress so far today. Projects lists will be easy to save since at base level they only have a name, but adding tasks to them and saving all the task info will likely be tricky given the limited JSON files.

    Local storage is done, and a lot was learned. Most important thing was using JSON.parse and JSON.stringify. Insanely useful here and I'm sure in many other cases.

May 17th, 2022

    Pretty long project this one. Expecting another two days out of it to finish the store and currency systems. Prett damn proud of it though. Most of my other stuff has either had a compromise or two, or I just decided it was done when I may have had other ideas left. Almost did that here, but though if I went all out it would make a pretty cute portfolio piece. Only think I might be skipping is an edit task/project option. Might add to the overall charm though. As an aside, I was assaulted by a youtube scam ad for some bootcamp crap that specifically showcased a meme roasting a to-do list as a portfolio piece. Here's hoping this project will have some relevance down the line. If nothing else, it will have given me a ton of practice with new and old skill alike. Shoutout to my boy SUI UZI for getting me through some of this.

    Flex-grow items with overflowing content in a flexbox are fucked. Spent probably an hour on this one issue in my romance section, and it was somehow fixed by giving the items min-height: 0. Thanks stack overflow.

May 18th, 2022 

    Optimistically, this will be my last day on this project. Depends on how fancy I want to get with displaying all the romance stuff. The actual logic for it should be relatively straightforward, although setting up image paths has been a slight pain so far.

    As a quick aside, my task and project factory functions have been pretty stupid so far. Technically doesn't look that bad, but the way I've made the item factory I believe works basically the same in only three lines of code.
    Yeesh.

May 19th, 2022

    Tentatively calling today the last day. Only a couple bits of functionality to add, and then some cleanup with the effects. Also need to finish icon art. Basically just animations after that.

May 20th, 2022

    I keep finding little things that bug me. The project panel should be able to scroll. Wouldn't it be great if you could reset local data? Loretta really needs to be more dynamic. There need to be more little effects overall. Why is the custom cursor bugging out? There should be a default project that takes you on a tour of the site. Shouldn't Loretta have a win condition? All this little stuff adds up, and makes the site pretty cool, but means my estimates for developement time are always off. 

    Been around a week and a half since I started, and yeah I missed a couple days. Still, a ton of time went into this. Not really sure how much time people are investing on average. Am I slow? Do my projects suffer from feature-creep? Regardless, I'm happy with my progress through TOP. Great, now I want to add mobile support with a media query. Great.

    Looking at my first devlog, I expected this to be three or four day project. Ha.


---To-Do---

DONE-Add loretta
DONE-Add item shop
DONE-Add currency counter
DONE-Add task button
CANCEL-Edit task button
DONE-task projects
-animate opening and closing tasks
CANCEL-show a project is empty with a message
DONE-remove task button
DONE-remove project button
DONE-Custom font
-fix cursor bugs
DONE-customize radio buttons
DONE-Differentiate priorities
DONE-sort by priority
DONE-Add local storage
DONE-Add character limit to project names
DONE-Add face changes for loretta
DONE-add currency counter and logic
DONE-add item shop
DONE-add inventory
-Add ending to Loretta path?
DONE-add animations/effects for finishing task and gifting
DONE-fix resolution on item icons
DONE-Highlight task value somehow
DONE-add limit to points value
DONE-reset different data buttons?
DONE-Add arrow to show you can scroll
DONE-local storage for hat location
DONE-add scroll for overflowing tasks/projects
DONE-change default tasks
DONE-message for cant afford things
DONE-Add tour project
DONE-Add animations for loretta
-make project list scrollable
-mobile support with media query/change grid setup
-maintain order of projects when loading from local storage
-fix wide hat bug