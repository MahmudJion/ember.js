import { deprecate } from '@ember/debug';

/**
  Checks to see if the `methodName` exists on the `obj`.

  ```javascript
  let foo = { bar: function() { return 'bar'; }, baz: null };

  Ember.canInvoke(foo, 'bar'); // true
  Ember.canInvoke(foo, 'baz'); // false
  Ember.canInvoke(foo, 'bat'); // false
  ```

  @method canInvoke
  @for Ember
  @param {Object} obj The object to check for the method
  @param {String} methodName The method name to check for
  @return {Boolean}
  @private
*/
export function canInvoke(obj: any | null | undefined, methodName: string): obj is Function {
  return obj !== null && obj !== undefined && typeof obj[methodName] === 'function';
}

/**
  @module @ember/utils
*/

/**
  Checks to see if the `methodName` exists on the `obj`,
  and if it does, invokes it with the arguments passed.

  ```javascript
  import { tryInvoke } from '@ember/utils';

  let d = new Date('03/15/2013');

  tryInvoke(d, 'getTime');              // 1363320000000
  tryInvoke(d, 'setFullYear', [2014]);  // 1394856000000
  tryInvoke(d, 'noSuchMethod', [2014]); // undefined
  ```

  @method tryInvoke
  @for @ember/utils
  @static
  @param {Object} obj The object to check for the method
  @param {String} methodName The method name to check for
  @param {Array} [args] The arguments to pass to the method
  @return {*} the return value of the invoked method or undefined if it cannot be invoked
  @public
  @deprecated Use Javascript's optional chaining instead.
*/
export function tryInvoke(
  obj: any | undefined | null,
  methodName: string,
  args: Array<any | undefined | null>
) {
  deprecate(
    `Use of tryInvoke is deprecated. Instead, consider using JavaScript's optional chaining.`,
    false,
    {
      id: 'ember-utils.try-invoke',
      until: '4.0.0',
      for: 'ember-source',
      since: {
        available: '3.24.0',
      },
      url: 'https://deprecations.emberjs.com/v3.x#toc_ember-utils-try-invoke',
    }
  );

  return _tryInvoke(obj, methodName, args);
}

export function _tryInvoke(
  obj: any | undefined | null,
  methodName: string,
  args: Array<any | undefined | null>
) {
  if (canInvoke(obj, methodName)) {
    let method = obj[methodName];
    return method.apply(obj, args);
  }
}
