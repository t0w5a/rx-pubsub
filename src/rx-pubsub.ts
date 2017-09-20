import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from "rxjs/Subscription";

/**
 * PubSub service based on RxJs ReplaySubject https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/replaysubject.md
 */
export class RxPubSub {
  /**
   * Object which stores all the events and their ReplaySubject subscriptions registered by the service
   * @type {{}} Object
   */
  protected static events: any = {};

  /**
   * Publish data to an event
   * @param eventName Event which should be fired
   * @param data Data sent to all Subscribers of the event
   * @param previousMessagesNr Maximum element count of the replay buffer
   */
  static publish(eventName: string, data: any, previousMessagesNr: number = 1): void {
    // publish data on the specified eventName
    this.getSubjectByEventName(eventName, previousMessagesNr).next(data);
  }

  /**
   * Subscribe subscriber/callback to an event
   * @param eventName Event to subscribe to
   * @param callback Callback to be run when the eventName is fired
   * @param previousMessagesNr Maximum element count of the replay buffer
   * @returns {any} Subscription if callback and eventName is provided. FALSE if there is an error
   */
  static subscribe(eventName: string, callback: (data?: any) => any, previousMessagesNr: number = 1): Subscription
    | boolean {
    if (!this.isCallback(callback)) {
      return false;
    }

    return this.getSubjectByEventName(eventName, previousMessagesNr).subscribe(callback);
  }

  /**
   * Subscribe to an event only one single time.
   * After the first publish the Subscriber will be destroyed and will not receive any further data published to its event.
   * @param eventName Event to subscribe to.
   * @param callback The callback which should be called when the publish event is triggered.
   * @returns {any} Subscription if callback and eventName is provided. FALSE if there is an error
   */
  static subscribeOnce(eventName: string, callback: (data?: any) => any): Subscription | boolean {
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
   */
  static unsubscribe(subscriber: Subscription): void {
    if (subscriber) {
      subscriber.unsubscribe();
    }
  }

  /**
   * Unsubscribe a list of Subscribers from the event
   * @param subscribers The list of subscribers which should be destroyed/unsubscribed
   */
  static unsubscribeAll(subscribers: Subscription[]): void {

    if (subscribers) {
      subscribers.forEach((subscriber: Subscription) => {
        subscriber.unsubscribe();
      });
    }
  }

  /**
   * Unsubscribe all observers from the event and release resources.
   * @param eventName event which should be destroyed.
   */
  static dispose(eventName: string): void {
    if (this.events[eventName]) {
      this.getSubjectByEventName(eventName).unsubscribe();
      delete this.events[eventName];
    }
    else {
      console.warn('The event [' + eventName + '] doesn\'t exist!');
    }
  }

  /**
   * Check if a Subject attached to an Event (eventName) has Subscribers
   * @param eventName Name of the event to be checked if it has Subscribers.
   * @returns {boolean} true - if there is at least one Subscriber. false - if there are no Subscribers at all
   */
  static hasSubscribers(eventName: string): boolean {
    let result = false;
    if (this.events[eventName] && this.getSubjectByEventName(eventName).observers.length > 0) {
      result = true;
    }

    return result;
  }

  /**
   * Retrieve the entire list of the events and the Subjects attached to them
   * @returns {any} Object which contains the list of events and the Subjects attached to them
   */
  static getEvents(): any {
    return this.events;
  }

  /**
   * Alias of the method getEvents()
   * @returns {any}
   */
  static getSubjects(): any {
    return this.getEvents();
  }

  /**
   * Create RxJs ReplaySubject for the specified eventName
   * @param eventName Name of the event to which to attach the ReplaySubject object
   * @param previousMessagesNr Maximum element count of the replay buffer
   * @returns {any}
   */
  static getSubjectByEventName(eventName: string, previousMessagesNr: number = 1): ReplaySubject<any> {
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
  static isCallback(callback: (data?: any) => any): boolean {
    if (!callback || typeof callback !== 'function') {
      console.warn('Callback is missing! Subscription cancelled!');

      return false;
    }

    return true;
  }
}
