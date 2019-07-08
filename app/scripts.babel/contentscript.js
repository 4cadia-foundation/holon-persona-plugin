
/*
* @document contentscript.js
* @class ContentScript
* @description Class for all hacks that all page
* */
class ContentScript {

  constructor(){}

  /*
  * @method scriptInject
  * @description Method for create tag script in container element.
  * @param {Object} content - that will  add on html script
  * @param {Object} container - element html
  * @return {Object} - return object content with the script injected
  */
  scriptInject(content, container) {
    try{

      if (!content)
        throw  new Error('Content not defined');

      if (!container)
        throw  new Error('Container not defined');

      let scriptTag = `<script async> ${content} </script>`;

      return container.insertBefore(scriptTag, container.children[0]);

    } catch (exception) {
      console.error('[ContentScript] Error: '+ exception.message);
    }
  }


}

module.exports = ContentScript;