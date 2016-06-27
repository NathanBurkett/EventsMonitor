# EventsMonitor

This class tracks and handles event listeners we bind and want to unbind. This is especially useful when we need to properly
manage events when the DOM isn't completely rebuilt on a page request - as is the case with most SPAs. When navigating away
from the current route, simply call the `decoupleAllEvents` method to stop listening and remove the currently monitored
events.

## Instantiation
```javascript
// Instantiate the class
let Monitor = new EventsMonitor();

// Add the event tracking
Monitor.addEvent({
    el: document.querySelector("#example-anchor"),
    event: 'click',
    fn: event => {
        console.log('anchor clicked');
    }
});

```

## Removal
```javascript
// Decouple a single event
Monitor.decoupleEvent(anchor, 'click');

// Or decouple all events
Monitor.decoupleAllEvents();
```

## Available Methods
---
### `decoupleEvent` - `params(el, type, index = undefined)`
Decouples listener from element and unsets event object from EventsMonitor `this.events`
array. Optionally pass in the `index` parameter to bypass `this.findEvent` and directly
unset the `this.events` item at `index`.

__Returns__ `true` on success. 'false' on failure.

---
### `eachEvent` - `params(fn)`
Loops `this.events` and applies a callback to each.

__Returns__ `this`

---
### `findEvent` - `params(eventObject, returnIndex = false)`
Find a certain event object in `this.events`. Optionally set returnIndex to true to return
the `index` of the match instead of its event object.

__Returns__ `Object`|`integer` on success. `undefined` on failure.

---
### `decoupleAllEvents` - `params()`
Decouples all listeners currently tracked in `this.events`.

__Returns__ `true`.

---
### `loopEventProperties` - `params(fn)`
Loop the required event properties and apply a callback to each.

__Returns__ `this`.

---
### `addEvent` - `params(obj)`
Bind an event listener and push the details into `this.events`. `obj` parameter must contain
an object with `el`, `event`, and `fn` properties. Like so:
```javascript
let _Example = new EventsMonitor();

_Example.addEvent({
    el: document.querySelector('body'),
    event: 'click',
    fn: () => {
        console.log('clicked the body');
    }
});
```
__Returns__ `this`.
