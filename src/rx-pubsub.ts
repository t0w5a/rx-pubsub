import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from "rxjs/Subscription";

/**
 * PubSub service based on RxJs ReplaySubject
 */
export class RxPubSub {
    /**
     * Object which stores all the events and their ReplaySubject subscriptions registered by the service
     * @type {{}} Object
     */
    private events: any = {};

    /**
     * Publish data to an event
     * @param eventName Event which should be fired
     * @param data Data sent to all Subscribers of the event
     * @param previousMessagesNr Maximum element count of the replay buffer
     * @returns {RxPubSub}
     */
    public publish(eventName: string, data: any, previousMessagesNr: number = 1): RxPubSub {
        // publish data on the specified eventName
        this.getSubjectByEventName(eventName, previousMessagesNr).next(data);

        return this;
    }

    /**
     * Subscribe subscriber/callback to an event
     * @param eventName Event to subscribe to
     * @param callback Callback to be run when the eventName is fired
     * @param previousMessagesNr Maximum element count of the replay buffer
     * @returns {any} Subscription if callback and eventName is provided. FALSE if there is an error
     */
    public subscribe(eventName: string, callback: (data?: any) => any, previousMessagesNr: number = 1): Subscription|boolean {
        if (!this.isCallback(callback)) {
            return false;
        }

        let subscriber = this.getSubjectByEventName(eventName, previousMessagesNr).subscribe(callback);

        return subscriber;
    }

    /**
     * Subscribe to an event only one single time.
     * After the first publish the Subscriber will be destroyed and will not receive any further data published to its event.
     * @param eventName Event to subscribe to.
     * @param callback The callback which should be called when the publish event is triggered.
     * @returns {any} Subscriber
     */
    public subscribeOnce(eventName: string, callback: (data?: any) => any): Subscription|boolean {
        if (!this.isCallback(callback)) {
            return false;
        }

        let subscriber = this.getSubjectByEventName(eventName).subscribe(
            (data: any) => {
                callback(data);
                this.unsubscribe(subscriber);
            }
        );

        return subscriber;
    }

    /**
     * Unsubscribe a Subscriber from the event
     * @param subscriber the Subscriber which should be destroyed/unsubscribed
     * @returns {RxPubSub}
     */
    public unsubscribe(subscriber: Subscription): RxPubSub {
        subscriber.unsubscribe();

        return this;
    }

    /**
     * Unsubscribe all observers from the event and release resources.
     * @param eventName event which should be destroyed.
     * @returns {RxPubSub}
     */
    public dispose(eventName: string): RxPubSub {
        if (this.events[eventName]) {
            this.events[eventName].unsubscribe();
            delete this.events[eventName];
        }
        else {
            console.warn('The event ['+eventName+'] doesn\'t exist!');
        }

        return this;
    }

    /**
     * Create RxJs ReplaySubject for the specified eventName
     * @param eventName Name of the event to which to attach the ReplaySubject object
     * @param previousMessagesNr Maximum element count of the replay buffer
     * @returns {any}
     */
    private getSubjectByEventName(eventName: string, previousMessagesNr: number = 1): ReplaySubject<any> {
        // create new Subject if there is not such thing for the specified eventName
        if (!this.events[eventName]) {
            this.events[eventName] = new ReplaySubject(previousMessagesNr);
        }

        return this.events[eventName];
    }

    /**
     * Check if the provided parameter is a proper function
     * @param callback Function to be checked
     * @returns {boolean} true is the parameter is a function. false - if the parameter is not a function
     */
    private isCallback(callback: (data?: any) => any): boolean {
        if (!callback || typeof callback !== 'function') {
            console.warn('Callback is missing! Subscription cancelled!');

            return false;
        }

        return true;
    }
}
