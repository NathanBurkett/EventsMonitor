/**
 * EventsMonitor Class
 */

export default class {
    /**
     * New EventsMonitor Instance
     */
    constructor() {
        this.events = [];
    }

    /**
     * Remove an event listener and splice it from the
     * events object
     * @param  {Object} obj
     * @return {void}
     */
    decoupleEvent(el, type, index = undefined) {
        // If the index isn't passed in
        if (!index) {
            // Find the event match and then return the index
            index = this.findEvent({
                el: el,
                event: type,
            }, true);
        }

        if (index) {
            // Get the event object we're decoupling
            const d = this.events[i];

            // Stop listening to the event
            d.el.removeEventListener(d.event, d.fn, false);

            // Remove the item from the this.events array
            this.events.splice(i, 1);

            return true;
        }

        return false;
    }

    /**
     * Loop the events
     * @param  {Function} fn Callback function
     * @return {this}
     */
    eachEvent(fn) {
        // Loop each event and apply a callback
        this.events.map(fn);

        return this;
    }

    /**
     * Find a specific event in this.events
     * @param  {Object}  eObj        Event object
     * @param  {boolean} returnIndex Return the index of the current item instead of the item
     * @return {mixed}
     */
    findEvent(eventObj, returnIndex = false) {
        let match;

        // Loop events
        this.eachEvent((item, index) => {
            // If the event properties match
            if (eventObj.el === item.el && eventObj.event === item.event) {
                // Return either the event object or index
                match = returnIndex ? index : item;
            }
        });

        // Return the match
        return match;
    }

    /**
     * Dcouple all events
     * @return {void}
     */
    decoupleAllEvents() {
        // Loop through events
        this.eachEvent((v, i) => {
            // Decouple event
            this.decoupleEvent(v.el, v.event, i);
        });

        return true;
    }

    /**
     * Loop all event properties and apply a callback
     * @param  {Function} fn
     * @return {this}
     */
    loopEventProperties(fn) {
        // Loop the event properties and apply a callback
        ['el', 'event', 'fn'].forEach(fn);

        return this;
    }

    /**
     * Bind event listener and push into this.events array
     * @param  {object} obj
     * @return {this}
     */
    addEvent(obj) {
        // Verify all event properties exist
        this.loopEventProperties(prop => {
            if (!obj.hasOwnProperty(prop)) {
                new Error('Event object needs ' + prop + ' property');
            }
        });

        // Listen to the event
        obj.el.addEventListener(obj.event, obj.fn, false);

        // Push the event
        this.events.push(obj);

        return this;
    }
}
