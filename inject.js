(() => {

  class App {
    constructor() {
      this.el = document.activeElement;

      if (!this.el) {
        return;
      }

      this.fetch.then((text) => {
        this.excuseText = text;
        this.method && this.method();
      });
    }

    get fetch() {
      return fetch('https://api.githunt.io/programmingexcuses', {
        method: 'GET'
      }).then((r) => {
        return r.text();
      });
    }

    get method() {
      const el = this.el;
      const tag = el.tagName;

      if (tag === 'INPUT' && el.type === 'text') {
        return this.write;
      }

      if (tag === 'TEXTAREA') {
        return this.write;
      }

      if (el.contentEditable === "true") {
        return this.writeOnDivs;
      }

      return false;
    }

    write() {
      const el = this.el;
      const excuse = this.excuseText;

      const start = el.selectionStart;
      const end = el.selectionEnd;
      const text = el.value;
      const before = text.substring(0, start);
      const after  = text.substring(end, text.length);

      el.value = (before + excuse + after);
      el.selectionStart = el.selectionEnd = start + excuse.length;
      el.focus();
    }

    /**
     * This method is used just on contentEditable elements.
     * For example gmail reply input is a div with contenteditable=true
     */
    writeOnDivs() {
      const sel = window.getSelection();
      let range;

      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(this.excuseText));
      }
    }
  }

  new App();

})();
