---
title: "Why You Need to Normalize Redux Data"
date: "2017-12-12T02:08:56Z"
layout: post
path: "why-it-is-important-to-normalize-data-with-redux"
category: "HOW-TO"
description: "In this article, I’ll explore how to normalize data and the benefits it brings to React/Redux."
cover: "mistake.jpg"
---
In my first Redux project, I made a huge mistake. I had data from an API that had deeply nested data. I simply added this data to a Redux store without normalizing the data. This lead to a lot of code bloat and performance issues. In this article, I’ll explore how to normalize data and the benefits it brings to React/Redux.

## Un-normalized data

```js
const posts = [
	{
		id: '123',
		author: {
			id: '566754',
			firstName: 'Alice',
		},
		likes: [
			{
				id: '232456',
				firstName: 'Bob',
			}
		],
	}
]
```

To make things concrete, let’s assume we create a component to render articles:

```jsx
// Post
const Post = ({ post }) => (
	<div>
		{post.likes.map(user => (
			<User user={user} />
		))}
	</div>
)

const mapStateToProps = (state) => ({
	post: state.posts[0],
})

export default connect(mapStateToProps)(Post)

// User.jsx
const User = ({ user }) => (
	<span>{user.name}</span>
)
```

## What if we want to change information for one of the users?
If you simply mutate one of the posts, the component will not update with the user’s new information. You have to *deep clone* all the posts data or use immutable data structures. Even with ImmutableJS,  changing deep structures can get messy: 

```js
state.setIn([
	posts, action.postIndex,
	'likes',
	action.likesIndex,
	'name'
], action.name)
```

## Normalizing
We can pull out the author and each liker as a `user` object into a map of all users. Then, replace each with a reference to the `user`, instead of the object.

```js
const posts = [
	{
		id: '123',
		author: '566754',
		likers: ['232456'],
	}
]

const users = {
	'566754': {
		id: '566754',
		name: 'Alice',
	},
	'232456': {
		id: '232456',
		name: 'Bob',
	}
}
```

You could use a library such as [normalizr](https://github.com/paularmstrong/normalizr) to normalize data for you based on a schema. This is great if you have little control over your data, such as if you are using an external API.

We should also update the User component. We can pass it an  `id` that references a user and get the user object from Redux state:

```jsx
// Post.jsx
const Post = ({ post }) => (
	<div>
		{post.likes.map(userId => (
			<User id={userId} />
		))}
	</div>
)
...

// User.jsx
const User = ({ id, user }) => (
	<span>{user.name}</span>
)

const mapStateToProps = (state, ownProps) => ({
	user: state.user[ownProps.id]
})
export default connect(mapStateToProps)(User)
```

## Benefits
Now it is easy to update a user using this data. You can update the users without modifying any of the posts. 

```js
const newUsers = {
	...users,
	[userId]: {
		...users[userId],
		name: 'Bobby',
	},
}

// this time with ImmutableJS
const newUsers = users.setIn([
  userId,
  'name'
 ], 'Bobby')
```

Because the posts do not change, the Post component does not need to update, only the User component does. In a similar fashion, reordering the likes only involves sorting the list of ids and does not cause each User component to update. This can lead to a huge performance win if you have a lot of likes.