RxPubSub
=====
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Git repository](#git)
6. [Version](#version)

### <a name="description"></a>1. Description
`rx-pubsub` or `RxPubSub` is a "Publish and Subscribe" service 
based on [RxJs ReplaySubject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/replaysubject.md). 

### <a name="installation"></a>2. Installation
Install the module into your application and save it as a dev 
dependency in your `package.json` file  
```
npm install rx-pubsub --save-dev
```

### <a name="usage"></a>3. Usage
In order to use the `RxPubSub` service you have to include/import 
it into your application:

```typescript
import {RxPubSub} from "rx-pubsub";
```

If you want to use it in a plain/vanilla Javascript project then you 
might just include the js file into your html/page application:
```html
<script type="application/javascript" src="./node_modules/rx-pubsub/dist/rx-pubsub.min.js"></script>
```

Create new RxPubSub object and use it.  
  
#### Example
```javascript
let eventName = 'testEvent';
  
console.log('register 1st subscriber to the event');
let sub1 = RxPubSub.subscribe(eventName, (data) => {
    console.log('1st subscriber receives data: ', data);
});  
console.log('register 2nd subscriber to the same event');
let sub2 = RxPubSub.subscribe(eventName, (data) => {
    console.log('2nd subscriber receives data: ', data);
});
  
console.log('publish data to the event');
RxPubSub.publish(eventName, {testProp: 'test Value'});
  
console.log('register 3rd subscriber to the same event');
let sub3 = RxPubSub.subscribe(eventName, (data) => {
    console.log('3rd subscriber receives data: ', data);
});

```

#### Output
```
register 1st subscriber to the event
register 2nd subscriber to the same event
publish data to the event
  
1st subscriber receives data: 
Object {testProp: "test Value"}
  
2nd subscriber receives data: 
Object {testProp: "test Value"}
  
register 3rd subscriber to the same event
  
3rd subscriber receives data:
Object {testProp: "test Value"}
```

### <a name="methods"></a>4. Methods

#### publish(eventName: string, data: any, previousMessagesNr: number = 1)
Publish data to an event  
  
*Parameters:*  
**eventName** - Event which should be fired  
**data** - Data sent to all Subscribers of the event  
**previousMessagesNr** - Maximum element count of the replay 
buffer  
  
*Return:*  
Method returns `void`.
  
  
#### subscribe(eventName: string, callback: (data?: any) => any, previousMessagesNr: number = 1)
Register a new subscriber/callback to an event  
  
*Parameters:*  
**eventName** - Event to subscribe to  
**callback** - Callback to be called when the eventName is 
fired  
**previousMessagesNr** - Maximum element count of the replay 
buffer  
  
*Return:*  
Method returns Subscription if `callback` and `eventName` is 
provided. **FALSE** if there is an error.
  
  
#### subscribeOnce(eventName: string, callback: (data?: any) => any)
Subscribe to an event only one single time.  
After the first publish the Subscriber will be destroyed and 
will not receive any further data published to its `eventName`.  
  
*Parameters:*  
**eventName** - Event to subscribe to  
**callback** - Callback to be called when the eventName is 
fired  
**previousMessagesNr** - Maximum element count of the replay 
buffer  
  
*Return:*  
Method returns Subscription if `callback` and `eventName` is 
provided. **FALSE** if there is an error.
  
  
#### unsubscribe(subscriber: Subscription)
Unsubscribe a Subscriber from the event.    
  
*Parameters:*  
**subscriber** - the Subscriber which should be 
destroyed/unsubscribed  
  
*Return:*  
Method returns `void`.
  
  
As the `subscribe()` and `subscribeOnce()` methods returns back the [RxJs/Subscription](https://github.com/ReactiveX/rxjs/blob/master/doc/subscription.md) 
object you can use its available methods. The most important thing is the `unsubscribe()` 
method provided directly by the [RxJs/Subscription](https://github.com/ReactiveX/rxjs/blob/master/doc/subscription.md).  
Hence, if you have the Subscription object:
```javascript
let eventName = 'testEvent';
  
let subscription = RxPubSub.subscribe(eventName, (data) => {
    console.log('received data: ', data);
});  
```
you can unsubscribe it using the `RxPubSub` method:
```javascript
RxPubSub.unsubscribe(subscription);
```
or using the `rxjs/Subscription` method:
```javascript
subscription.unsubscribe();
```
  
  
#### unsubscribeAll(subscribers: Subscription[])
Unsubscribe a list of Subscribers from the event    
  
*Parameters:*  
**subscribers** - The list of subscribers which should be destroyed/unsubscribed  
  
*Return:*  
Method returns `void`.
  
  
#### dispose(eventName: string)
Unsubscribe all observers from the event and release resources. 
  
*Parameters:*  
**eventName** - event which should be destroyed.  
  
*Return:*  
Method returns `void`.
  
  
#### hasSubscribers(eventName: string)
Check if a Subject attached to the event `eventName` has 
Subscribers.  
  
*Parameters:*  
**eventName** - Name of the event to be checked if it 
has Subscribers.  
  
*Return:*  
Method returns `boolean`:  
*true* - if there is at least one Subscriber  
*false* - if there are no Subscribers at all
  
  
#### getEvents()
Retrieve the entire list of the events and 
the Subjects attached to them.  
  
*Return:*  
Method returns an `Object` which contains the list of the
events and the Subjects attached to them.
  
  
#### getSubjects()
An alias for the `getEvents()` method.    
  
*Return:*  
Method returns an `Object` which contains the list of the
events and the Subjects attached to them.
  
  
### <a name="git"></a>5. Git repository
[https://github.com/t0w5a/rx-pubsub](https://github.com/t0w5a/rx-pubsub)

### <a name="version"></a>6. Version
0.2.1