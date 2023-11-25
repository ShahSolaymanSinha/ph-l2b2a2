# How to run application locally?

## Step-1

install dependencies

```bash
npm install express
```

## Step-2

import express and call it

```typescript
const express = require('express');
const app = express();
```

## Step-3

Create an application on available port. For example I am using 5000 port.

```typescript
app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
```

## Step-4

Run your file with node

```bash
node server.js
```

Visit: http://localhost:5000 --> Wow, It's online.!

<br>

# Live Link

https://assignment-2-lake.vercel.app

# Route Information

```typescript
userRouter.post('/', userController.createAUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getSpecificUserByUserId);

userRouter.put('/:userId', userController.updateUserController);

userRouter.delete('/:userId', userController.userDeleteController);

userRouter.put('/:userId/orders', userController.userOrdersUpdateController);

userRouter.get('/:userId/orders', userController.userGetAllOrdersController);

userRouter.get(
  '/:userId/orders/total-price',
  userController.userGetOrdersTotalController,
);
```
