export function domInject(selector: string) {

  return function(target: any, key: string) {

    let element: JQuery;

    const getter = function() {
      if(!element) element = $(selector);
      return element;
    }

    Object.defineProperty(target, key, {
      get: getter
    });
  }
}
