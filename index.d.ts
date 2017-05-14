// Type definitions for RxPubSub
// Project: RxPubSub
// Definitions by: tomsa.md

/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

export as namespace RxPubSub;

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */


/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace RxPubSub {
    export class RxPubSub {
        public publish(eventName: string, data: any, previousMessagesNr?: number): RxPubSub;

        public subscribe(eventName: string, callback: (data?: any) => any, previousMessagesNr?: number): Subscription|boolean;

        public subscribeOnce(eventName: string, callback: (data?: any) => any): Subscription|boolean;

        public unsubscribe(subscriber: any): RxPubSub;

        public dispose(eventName: string): RxPubSub;

        public hasSubscribers(eventName: string): boolean;

        public getEvents(): any;

        public getSubjects(): any;
    }

    export class Subscription {
        public unsubscribe(): void;
    }
    ;
}

export = RxPubSub;

