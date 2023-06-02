---
tags: blog/javascript
date: May 30, 2023
publish: true
slug: es14
origin:
image:
description:
---
# Exciting New Features in ECMAScript 2023 (ES14)

ECMAScript, the standard specification that JavaScript is based on, has been evolving rapidly over the years. With each new edition, it introduces a set of features that aim to improve the language, making it more powerful, flexible, and easier to work with. The 14th edition, ECMAScript 2023 (also known as ES14), is no exception. This article will explore some of the coolest features introduced in ES14 that developers should start using as soon as possible.

> [!info] Transparency notice: This article was written with the help of GPT4.

## 1. Array.prototype and TypedArray.prototype Enhancements

ES14 introduces several new methods on `Array.prototype` and `TypedArray.prototype` that can significantly improve the way you work with arrays.

### 1.1 toSorted

The `toSorted` method sorts the elements of an array in place and returns the array. This method is similar to the existing `sort` method but does not mutate the original array.

```javascript
let arr = [5, 2, 1, 4, 3];
let sortedArr = arr.toSorted();
console.log(sortedArr); // Output: [1, 2, 3, 4, 5]
console.log(arr); // Output: [5, 2, 1, 4, 3]
```

### 1.2 toReversed

The `toReversed` method reverses an array in place. Like `toSorted`, this method does not mutate the original array.

```javascript
let arr = [1, 2, 3, 4, 5];
let reversedArr = arr.toReversed();
console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
console.log(arr); // Output: [1, 2, 3, 4, 5]
```

### 1.3 with

The `with` method returns a new array with one specific element from the original array replaced with a new value.

```javascript
let arr = [1, 2, 3, 4, 5];
let newArr = arr.with(2, 'a');
console.log(newArr); // Output: [1, 2, 'a', 4, 5]
```

### 1.4 findLast and findLastIndex

The `findLast` method returns the last element in the array that satisfies a provided testing function. The `findLastIndex` method, on the other hand, returns the index of the last element in the array that satisfies the provided testing function.

```javascript
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let lastFour = arr.findLast(x => x === 4);
console.log(lastFour); // Output: 4

let lastFourIndex = arr.findLastIndex(x => x === 4);
console.log(lastFourIndex); // Output: 5
```

### 1.5 toSpliced

The `toSpliced` method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. This method is similar to the existing `splice` method but does not mutate the original array.

```javascript
let arr = [1, 2, 3, 4, 5];
let newArr = arr.toSpliced(2, 1, 'a', 'b');
console.log(newArr); // Output: [1, 2, 'a', 'b', 4, 5]
console.log(arr); // Output: [1, 2, 3, 4, 5]
```

## 2. Support for #! Comments

ES14 adds support for `#!` comments at the beginning of files. This feature is often used in Unix-based systems to indicate an interpreter for script execution. This addition will better facilitate executable ECMAScript files.

```javascript
#!/usr/bin/env node
console.log("Hello, World!");
```

## 3. Symbols as Keys in Weak Collections

ES14 allows the use of most Symbols as keys in weak collections (`WeakMap` and `WeakSet`). This is a significant enhancement as it allows developers to use Symbols, which are unique and immutable, as weak references in these collections.

```javascript
let weakMap = new WeakMap();
let obj = {};
let sym = Symbol('example');

weakMap.set(sym, 'value');
console.log(weakMap.get(sym)); // Output: 'value'
```

## Conclusion

The ECMAScript 2023 (ES14) edition brings a host of new features and improvements that make JavaScript more powerful and easier to work with. The enhancements to `Array.prototype` and `TypedArray.prototype`, support for `#!` comments, and the ability to use Symbols as keys in weak collections are just a few of the cool features that developers should start using as soon as possible. As JavaScript continues to evolve, it's essential for developers to stay up-to-date with the latest features and best practices to write more efficient, maintainable, and robust code.