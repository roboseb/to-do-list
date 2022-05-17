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


---To-Do---

-Add loretta
-Add item shop
-Add currency counter
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