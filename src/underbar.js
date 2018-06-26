(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
  	return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    //if condition: n is undefined -> return array[0]; otherwiese, array.slice(0,n)
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  	// if condition: n is undefined -> return array[array.length -1]; otherwise; array.slice(- n, array.length) (if n > length)
  	// if n === 0; return [] //
  	if (n === 0) return [];
  	else if (n === undefined) return array[array.length-1];
  	else return array.slice(-n, array.length);

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
  	if (Array.isArray(collection)){
  		for (var i = 0; i< collection.length; i++){
  			iterator(collection[i], i, collection);
  		}
  	} else if (typeof collection === 'object'){
  		  	for (var key in collection){
       iterator(collection[key], key, collection);
  	}
  }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
  	  var result = [];
  	_.each(collection, function(item, index){
  		if (test(item)){
  			result.push(item);
  		}
  	});
  	   return result;
   };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
     var result = [];
     _.each(collection, function(item, index){
         if (!test(item)){
         	result.push(item);
         }
     })
     return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
  	//reduce the duplicate copy f
  	//return the unqiue elem in an array : var result = []; 
    	// push iterator(item, index, array) into  transformed array -> if this value does not exists in it.(indexOf(array, target))
    	// then push item to result -> return result;  
  	// check arguements availability -> if isSorted is not undefined -> false/ no iterator 2. not boolean; it is iterator
  	   // 3. is boolean but no iterator //4. else  
  	//  array = [] return empty [] 
  var result = [];
  var transformed = [];
  if (array.length=== 0) return result;
  else if (isSorted === undefined) {
  	isSorted = false;
  } else if (typeof isSorted !== 'boolean'){
  	iterator = isSorted;
  	isSorted = false;
  } 
  if (iterator === undefined){
  	  _.each(array, function(item, index){
  	     if (_.indexOf(result, item) === -1 ) {
  	     	result.push(item);
  	     }	
  	  })
  } else {
  	_.each(array, function(item, index){
  		var computed = iterator(item, index, array);
  		if (_.indexOf(transformed, computed) === -1){
  			 transformed.push(computed);
  			 result.push(item);
  		}
  	})
  }
  	   return result;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(item, index){
        result.push(iterator(item));
    })
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //collection -> array 
        //iterator(acc, value, index(key), collection)
           //accumlator is undefined -> acc = collection[0] ; collection = collection.slice(1); else -> return iterator()
    //collection -> obj
        // iterator
          //acc is undefined -> acc = collection[firstkey]; delete collection[firstkey]; else -> return iterator()

   if (Array.isArray(collection)){
     if (accumulator === undefined){
     	accumulator = collection[0];
     	collection = collection.slice(1);
     } 
     	_.each(collection, function(item, index){
     	   accumulator = iterator(accumulator, item, index, collection);
     	})
     
   } else if (typeof collection === 'object'){
        if (accumulator === undefined){
            var keysArr = Object.keys(collection);
        	accumulator = collection[keysArr[0]];
        	delete collection[keysArr[0]];
        }
        _.each(collection, function(value, key){
        	accumulator = iterator(accumulator, value, key, collection);
        })
     }
   return accumulator;
 };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
     //return boolean ; starting value = false; (if none exist || false -> false)
       //check each elem if elem === target ; acc || this condition (as long it contains once it will return true)

    return _.reduce(collection, function(acc, item){
        return acc || (item === target) ;
    }, false)
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
      //return boolean (start = true && condition(coerce to boolean value) -> if one fails -> return false)
       //if iterator is undefined -> (start = true && item(coerce to boolean value)
    
    return _.reduce(collection, function(acc, item){


        return iterator === undefined? acc && !!item : acc && !!iterator(item);
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here. 
    //return boolean value ; start= false(if all are false) || iterator (item) or item (coerce it into boolean value)   
      //reduce or every
   //reduce
   /*
   return _.reduce(collection, function(acc, item){
      return iterator === undefined ? (acc || !!item) : (acc || !!iterator(item));
   }, false)
  */
   //every -> true -> return true; false -> if iterator(item) or item is true -> !(return) should be true; if all false -> should be false;
     // !(!1 && !1) = 1 ; !(!0 && !0) = 0; !(!1 && !0)= 1; !(!0 && !1) = 1 
   return !_.every(collection, function(item){
   	return iterator === undefined? !item : !iterator(item);
   })
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
      //merge other stuff into obj -> return obj 
      //how to add new obj into obj -> Object.assign(target, source)-> return target
        //collection -> push arg[1] to arg[n] into collection 
            //how to use slice method for arguements? var collection = [].slice.call(arguments,1);
        //reduce -> start : obj, Object.assign(obj, item)    
     return _.reduce(arguments, function(acc,item){
        return Object.assign(acc,item);
     },obj)

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  	//it won't overwrite existing property
     //return obj 
       //collection -> [obj, obj1, obj2]
       //reduce : each item -> obj; each: iterate thru its key and check with acc's key if not the same -> acc[key] = item[key];
         //where to get key-> iterate thru the "item"
     return _.reduce(arguments, function(acc,item){
        _.each(item, function(value, key){
        	if (!acc.hasOwnProperty(key)) {
        		acc[key] = item[key];
        	}
        })
        return acc;
     },obj)

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;


    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
      
        alreadyCalled = true;
      } 
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result;
    var oncePerUniqueArgumentList = {};
     return function() {
     	var argument = JSON.stringify(arguments);
       if (oncePerUniqueArgumentList.hasOwnProperty(argument)) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = oncePerUniqueArgumentList[argument];
      } else {

        result = func.apply(this, arguments);
        oncePerUniqueArgumentList[argument] = result;
      	}
      // The new function always returns the originally computed result.
      return result;
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
     //wait -> is number -> setTimeout(func, wait(ms));
     //return func -> pass arguments to func and apply func.apply(this, arguments);
     
      return setTimeout.apply(this, arguments);
   
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
     //make a new array copy -> array.slice();
     //how to rearrange the order in array -> re assign index for each item (get random one from n -> exchange the item & n--)
       //get random index (0-n); randomIndex = Math.floor(Math.random() * (max - min)) + min; range (min, max) max is excluded
       //exchange item : temp = arr[n] ; arr[n] = arr[r] ; arr[x] = temp, n-- 
       // reduce : start = newArr, exchange item -> return acc
     var newArr = array.slice();
     var max = array.length;
      return _.reduce(newArr, function(acc,item,index){
          var randomIndex = Math.floor(Math.random() * (max - index)) + index;
          var temp = acc[index];
          acc[index] = acc[randomIndex];
          acc[randomIndex] = temp;
          return acc;
      },newArr)
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  	    //return the transformed values in a list -> map

  	    //check if functionOrKey is function or method(args)
           //if it's not function-> method -> get function (propertyvalue) from item[method](method is its key)
  	       //.apply()-> functoin.apply(item, arguments) 
       var arg = [].slice.call(arguments, 2);
       return _.map(collection, function(item){
       	return typeof functionOrKey === 'function'? functionOrKey.apply(item, arg) : item[functionOrKey].apply(item,arg);
       })

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //collection is an array people = [{personA},{personB}] -> return a new list(array)
      //sort by - iterator(item) or item[iterator] 
        //iterator is string -> iterator = key -> value = item[iterator]
        //list.sort( function(a,b){return a.value-b.value}) ->by number
        //list.sort( functoin(a,b){ var valueA = a[key].toUpperCase(); valueB ; if (valueA < valueB) return -1; if (valueA> valueB) return 1; return 0})
    var isMethod = typeof iterator === 'string';
    if (isMethod) {
    	return collection.sort(function(a,b){
                 var A = a[iterator]
                 var B = b[iterator];
                  if (A < B) return -1;
                  if (A > B) return 1;
                  return 0;
      })
    } else {
    	return collection.sort( function(a,b){
    		var A = iterator(a);
    		var B = iterator(b);
    		      if (A < B) return -1;
                  if (A > B) return 1;
                  return 0;

    	})
    }

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //return new list of [item1[i],..,itemN[i]] -> new array
    //arguments (array of item1 to item N) -> each item has M elements
     //how many new items -> max length of item(M); how many new elem in each item -> arguments.length (N)
       //return: [arguments[0][0]-[arguments[N,0]],[arg[0][1],arg[N][1]],[arg[0,2],arg[N,2]]...[arg[0,M],arg[N,M]]]
       //for loop
      var result = [];
      var pair = [];
       for (var n = 0; n < arguments.length; n++){
       	var item = arguments[i];
       	for (var m = 0; m < item.length; m++) {
          
       	}
     }

    


  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
