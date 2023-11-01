"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/postgres-array";
exports.ids = ["vendor-chunks/postgres-array"];
exports.modules = {

/***/ "(ssr)/./node_modules/postgres-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/postgres-array/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nexports.parse = function (source, transform) {\n  return new ArrayParser(source, transform).parse()\n}\n\nclass ArrayParser {\n  constructor (source, transform) {\n    this.source = source\n    this.transform = transform || identity\n    this.position = 0\n    this.entries = []\n    this.recorded = []\n    this.dimension = 0\n  }\n\n  isEof () {\n    return this.position >= this.source.length\n  }\n\n  nextCharacter () {\n    var character = this.source[this.position++]\n    if (character === '\\\\') {\n      return {\n        value: this.source[this.position++],\n        escaped: true\n      }\n    }\n    return {\n      value: character,\n      escaped: false\n    }\n  }\n\n  record (character) {\n    this.recorded.push(character)\n  }\n\n  newEntry (includeEmpty) {\n    var entry\n    if (this.recorded.length > 0 || includeEmpty) {\n      entry = this.recorded.join('')\n      if (entry === 'NULL' && !includeEmpty) {\n        entry = null\n      }\n      if (entry !== null) entry = this.transform(entry)\n      this.entries.push(entry)\n      this.recorded = []\n    }\n  }\n\n  consumeDimensions () {\n    if (this.source[0] === '[') {\n      while (!this.isEof()) {\n        var char = this.nextCharacter()\n        if (char.value === '=') break\n      }\n    }\n  }\n\n  parse (nested) {\n    var character, parser, quote\n    this.consumeDimensions()\n    while (!this.isEof()) {\n      character = this.nextCharacter()\n      if (character.value === '{' && !quote) {\n        this.dimension++\n        if (this.dimension > 1) {\n          parser = new ArrayParser(this.source.substr(this.position - 1), this.transform)\n          this.entries.push(parser.parse(true))\n          this.position += parser.position - 2\n        }\n      } else if (character.value === '}' && !quote) {\n        this.dimension--\n        if (!this.dimension) {\n          this.newEntry()\n          if (nested) return this.entries\n        }\n      } else if (character.value === '\"' && !character.escaped) {\n        if (quote) this.newEntry(true)\n        quote = !quote\n      } else if (character.value === ',' && !quote) {\n        this.newEntry()\n      } else {\n        this.record(character.value)\n      }\n    }\n    if (this.dimension !== 0) {\n      throw new Error('array dimension not balanced')\n    }\n    return this.entries\n  }\n}\n\nfunction identity (value) {\n  return value\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcG9zdGdyZXMtYXJyYXkvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtCQUErQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jmb3JrLy4vbm9kZV9tb2R1bGVzL3Bvc3RncmVzLWFycmF5L2luZGV4LmpzP2RlMWMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIG5ldyBBcnJheVBhcnNlcihzb3VyY2UsIHRyYW5zZm9ybSkucGFyc2UoKVxufVxuXG5jbGFzcyBBcnJheVBhcnNlciB7XG4gIGNvbnN0cnVjdG9yIChzb3VyY2UsIHRyYW5zZm9ybSkge1xuICAgIHRoaXMuc291cmNlID0gc291cmNlXG4gICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm0gfHwgaWRlbnRpdHlcbiAgICB0aGlzLnBvc2l0aW9uID0gMFxuICAgIHRoaXMuZW50cmllcyA9IFtdXG4gICAgdGhpcy5yZWNvcmRlZCA9IFtdXG4gICAgdGhpcy5kaW1lbnNpb24gPSAwXG4gIH1cblxuICBpc0VvZiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPj0gdGhpcy5zb3VyY2UubGVuZ3RoXG4gIH1cblxuICBuZXh0Q2hhcmFjdGVyICgpIHtcbiAgICB2YXIgY2hhcmFjdGVyID0gdGhpcy5zb3VyY2VbdGhpcy5wb3NpdGlvbisrXVxuICAgIGlmIChjaGFyYWN0ZXIgPT09ICdcXFxcJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHRoaXMuc291cmNlW3RoaXMucG9zaXRpb24rK10sXG4gICAgICAgIGVzY2FwZWQ6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBjaGFyYWN0ZXIsXG4gICAgICBlc2NhcGVkOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJlY29yZCAoY2hhcmFjdGVyKSB7XG4gICAgdGhpcy5yZWNvcmRlZC5wdXNoKGNoYXJhY3RlcilcbiAgfVxuXG4gIG5ld0VudHJ5IChpbmNsdWRlRW1wdHkpIHtcbiAgICB2YXIgZW50cnlcbiAgICBpZiAodGhpcy5yZWNvcmRlZC5sZW5ndGggPiAwIHx8IGluY2x1ZGVFbXB0eSkge1xuICAgICAgZW50cnkgPSB0aGlzLnJlY29yZGVkLmpvaW4oJycpXG4gICAgICBpZiAoZW50cnkgPT09ICdOVUxMJyAmJiAhaW5jbHVkZUVtcHR5KSB7XG4gICAgICAgIGVudHJ5ID0gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKGVudHJ5ICE9PSBudWxsKSBlbnRyeSA9IHRoaXMudHJhbnNmb3JtKGVudHJ5KVxuICAgICAgdGhpcy5lbnRyaWVzLnB1c2goZW50cnkpXG4gICAgICB0aGlzLnJlY29yZGVkID0gW11cbiAgICB9XG4gIH1cblxuICBjb25zdW1lRGltZW5zaW9ucyAoKSB7XG4gICAgaWYgKHRoaXMuc291cmNlWzBdID09PSAnWycpIHtcbiAgICAgIHdoaWxlICghdGhpcy5pc0VvZigpKSB7XG4gICAgICAgIHZhciBjaGFyID0gdGhpcy5uZXh0Q2hhcmFjdGVyKClcbiAgICAgICAgaWYgKGNoYXIudmFsdWUgPT09ICc9JykgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZSAobmVzdGVkKSB7XG4gICAgdmFyIGNoYXJhY3RlciwgcGFyc2VyLCBxdW90ZVxuICAgIHRoaXMuY29uc3VtZURpbWVuc2lvbnMoKVxuICAgIHdoaWxlICghdGhpcy5pc0VvZigpKSB7XG4gICAgICBjaGFyYWN0ZXIgPSB0aGlzLm5leHRDaGFyYWN0ZXIoKVxuICAgICAgaWYgKGNoYXJhY3Rlci52YWx1ZSA9PT0gJ3snICYmICFxdW90ZSkge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbisrXG4gICAgICAgIGlmICh0aGlzLmRpbWVuc2lvbiA+IDEpIHtcbiAgICAgICAgICBwYXJzZXIgPSBuZXcgQXJyYXlQYXJzZXIodGhpcy5zb3VyY2Uuc3Vic3RyKHRoaXMucG9zaXRpb24gLSAxKSwgdGhpcy50cmFuc2Zvcm0pXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLnB1c2gocGFyc2VyLnBhcnNlKHRydWUpKVxuICAgICAgICAgIHRoaXMucG9zaXRpb24gKz0gcGFyc2VyLnBvc2l0aW9uIC0gMlxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNoYXJhY3Rlci52YWx1ZSA9PT0gJ30nICYmICFxdW90ZSkge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbi0tXG4gICAgICAgIGlmICghdGhpcy5kaW1lbnNpb24pIHtcbiAgICAgICAgICB0aGlzLm5ld0VudHJ5KClcbiAgICAgICAgICBpZiAobmVzdGVkKSByZXR1cm4gdGhpcy5lbnRyaWVzXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyLnZhbHVlID09PSAnXCInICYmICFjaGFyYWN0ZXIuZXNjYXBlZCkge1xuICAgICAgICBpZiAocXVvdGUpIHRoaXMubmV3RW50cnkodHJ1ZSlcbiAgICAgICAgcXVvdGUgPSAhcXVvdGVcbiAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyLnZhbHVlID09PSAnLCcgJiYgIXF1b3RlKSB7XG4gICAgICAgIHRoaXMubmV3RW50cnkoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWNvcmQoY2hhcmFjdGVyLnZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5kaW1lbnNpb24gIT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXJyYXkgZGltZW5zaW9uIG5vdCBiYWxhbmNlZCcpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVudHJpZXNcbiAgfVxufVxuXG5mdW5jdGlvbiBpZGVudGl0eSAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/postgres-array/index.js\n");

/***/ })

};
;