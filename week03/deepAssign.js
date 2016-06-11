(function()
{
    'use strict'

    if(typeof Object.assign == 'assign') return

    var isEnumerable = {}.propertyIsEnumerable

    Object.defineProperty(Object, 'deepAssign',
    {
        value: function deepAssign(target, sources)
        {
            if(target == null)
                throw new TypeError('Cannot convert undefined or null to object')

            var to = Object(target)

            for(var index = 1; index < arguments.length;)
            {
                var from = arguments[index++]
                if(from !== Object(from)) continue

                Reflect.ownKeys(from).forEach(function(key)
                {

                    if(from[key] !== null && from[key] instanceof Object && from[key].__proto__.constructor == Object)
                    {
                        if(from[key] instanceof Date || from[key] instanceof Set || from[key] instanceof Map || from[key] instanceof RegExp)
                        {
                            to[key] = new from[key].constructor(from[key])
                        } else {
                            deepAssign(to, from[key])
                        }
                    }

                    if(isEnumerable.call(from, key))
                    {
                        to[key] = from[key]
                    }

                })
            }

            return to
        },
        writable: true,
        configurable: true
    })

})()
