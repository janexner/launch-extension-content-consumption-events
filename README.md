# "Content Consumption Events" Extension for Launch, by Adobe

A set of Events for Launch, revolving about content consumption

## Events provided

"Scroll 25%", "Scroll 33%", "Scroll 50%", "Scroll 66%", "Scroll 75%", and "Scroll 100%" 

These events fire when a visitor has scrolled 25%/33%/50%/66%/75%/100% of the scrollable distance on the page.

Example: if the browser window is 500px high, and the page is 700px long, the visitor can scroll 200px down. The "Scroll 50%" Event would fire as soon as the visitor scrolls 100px down or further.

"Scroll Depth"

This event works exactly like the above, except that the scroll depth in percent of page height can be specified in the Event settings.

### Threshold for scroll depth (in % of the page height)

Specify a scrollable distance in % (such as "12.5" or "90")

Once the visitor has scrolled past the distance, the Event will trigger.

In the example above, and with this set to "90", the Event would trigger when the visitor scrolls down at least 180px.

"Scroll Depth actually read"

Configurable with depth, reading speed (default 200wpm) and word count (takes Data Elements!), tries to only fire if visitor actually read down to the given scroll depth, rather than scrolling down quickly.

## Common Settings

All Events come with 2 settings:

### Fire once per page only

If this box is ticked, the Event, once it has triggered, will not trigger again.

If the box is not ticked, the Event will fire every time a scrolling activity puts the page below the threshold.

### Delay before measuring height of page (in milliseconds)

Sometimes, pages are built dynamically. The height of such a page should only be measured after a delay.

Specify how long to wait before measuring page height and starting the Event listener.

Delay is in milliseconds.