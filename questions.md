#### 1. What is the difference between Component and PureComponent? give an
example where it might break my app.

`Component`. Re-renders when there is as change in prop or state.
`PureComponent`. Only re-renders when the values of prop or state are different to the previous ones. It implements `shouldComponentUpdate` with shallow comparison to achieve that.
shallowComparison will only detect a difference in the following cases:
- primitive types: exam, string `'a' === 'b'` is false, a re-render will happen.
- complex types(objects, arrays): exam. 
	```javascript
  const user1 = { name: 'test', address: { zipCode: 50 }};
	const user2 = user1;
  user2.address.zipCode = 51;
  user1 === user2 /* is true because they both point to the same reference, a re-render won’t happen. */
  ```
  If we wanted a re-render we’d have to do something like:

  ```javascript
  const user2 = { …user1, address:{ zipCode: 51 }};
  user1 === user2 /* is false now because we used the spread operator to copy the content of user1 into another object, a re-render will occour. */
  ```


It depends on what do you mean by breaking, one example can be that both Component and PureComponent won’t re-render in a case where you are mutating an array, example just using .push() to add an item to the content of a prop or state. That will not change the reference of the array therefor not resulting in a component re-render.


#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of
why is that?

Mostly because context changes will update the component event when shouldComponentUpdate returns false. It can be dangerous because you are counting on the fact the component won’t re-render in certain scenarios, but it will if the context is updated. This can lead to unexpected behaviour

#### 3. Describe 3 ways to pass information from a component to its PARENT.

- Create a callback function in the Parent and pass it as a prop to the Child, whenever you need to pass information to the parent you can use that callback and pass the data as params to the parent.
 ```javascript
 const handleClick = (event) => {/* ... */}
 <Child handleClick={handleClick}>
 ```
- The option above might cause prop drilling if we have a multiple level component tree, in order to avoid that we can create a Context provider at the top, then inside the children we get the callback from the context like this:
 ```javascript
 const { callback } = useContext(AppContext)
 ```

- Third option and not recommended because this one goes against how we usually handle things in react, from parent to children. But in a scenario where we are left with no option and have to access a function in an imperative way we can: Create a ref of the child in the parent, then access that child functions to retrieve data.

 ```javascript
  // warning: accessing function with ref because there is no option left,
  // do not replicate.
  this.childRef = createRef();
  <Child ref={this.childRef} />
  {/* ... */}
  this.childRef.current.function();
 ```
Again, I do not recommend this one at all, but it can be useful in exceptional cases we should always comment this one with a warning if possible.


#### 4. Give 2 ways to prevent components from re-rendering.
- `ShouldComponentUpdate()`. Returning false so the component doesn’t re-render.
- Using `PureComponent` or React.Memo HOC. These two implement shouldcomponentUpdate with shallowcomparison so they won’t re-render if the props or state contain the same previous value.

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments allow us to group nodes, a react component can only return one one. For example.

```javascript
const Component = () => <div>Contente</div>;
```
But more often than not we need to return more than one node, example:
```javascript
<li>item</li>
<li>item2</li>
```
In that case we ca use Fragments to return only one:
```javascript
<>
   <li>item</li>
   <li>item2</li>
</>
```

the app can break if you return more than one node.

#### 6. Give 3 examples of the HOC pattern.

Higher order components are functions that take a component and return another one.
`React.memo`. Is A HOC that receives a functional Component and only re-renders if there is a change in props.
`connect`. Is A HOC that allows us to map state from Redux to the Component we are using.
`withRouter`. Is a HOC that allows us to access React router state from the component’s props. Exam, history, location and more.

#### 7. what's the difference in handling exceptions in promises, callbacks and
async...await.

In promises we handle errors by using
```javascript
.catch((error) => { /* handle error */ })
```
In callbacks we can use error-first callbacks, we expect the error as the first parameter of the callback.

```javascript
const callback = (error, data) => {
if(error) {
// handle error
} else {
// receive data
} }
fs.readFile('test.txt', callback);
```
In a asynchronous function we use try/catch:

```javascript
const retrieveData = async () => {
try {
 await fs.readFile('test.txt');

} catch (error) {
 // handle error
  }
}
```

#### 8. How many arguments does setState take and why is it async.
setState receives 2 arguments.
The `first`, returns an object with the new state values, you can directly place an object like this
`this.setState({ stateKey: 'newValue'})` or use a function that return an Object
```javascript
setState((currentState, currentProps) => {
  returns { stateKey: `${currentState.stateKey}${newValue}`}
});
```

The `second`. For performance setState adds changes to a queue so it can run multiple udpates in a single pass. Because of that the second parameter is a function that will run after the state has been updated.
```javascript
setState({ stateKey: 'newValue'}, () => {
  /* execute code after stateKey gets updated*/
});
```

#### 9. List the steps needed to migrate a Class to Function Component.
- Migrate the state to useState() hook
- Migrate lifecycle methods to useEffect() hooks
- Remove this. from methods or variables.
- Remove extends Component.

#### 10. List a few ways styles can be used with components.
Inline styles.
```javascript
<div styles={{ width: '250px', display: 'flex' }} />
```
className. Import the css file and use the class
```javascript
// css file
.container {
width: ‘250px’;
display: ‘flex’;
}
// component
<div className="container">
```
#### 11. How to render an HTML string coming from the server.
using dangerouslyHtml. This one is not recommended
```javascript
 <div dangeraslySetInnerHtml={'<p> test </p>'}  />
```
