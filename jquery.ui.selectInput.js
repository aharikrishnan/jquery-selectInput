/*
 * jQuery UI SelectInput
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.ui.autocomplete.js
 */

(function ($, undefined) {
  $.widget("ui.selectInput", $.ui.autocomplete, {
    options: {
      minLength: 0,
      select: function (event, ui) {
        var original = $(this).data("original");
        $(original).val(ui.item._value);
      }
    },
    _create: function () {
      var widget = this;
      var doppelganger = $("<input>", {
        "type": "text"
      });
      var wrapper = $("<div>", {
        "class": "autocomplete-wrap",
        "style": "position:relative;"
      });
      var dropdown = $("<a>", {
        "href": "#",
        "class": "select-dropdown",
        "html": "<span class='show-all-layouts ui-icon ui-icon-triangle-1-s'></span>",
        "style": "position: absolute; z-index: 100; right: 0; bottom: 7px;"
      });
      doppelganger.data("original", this.element[0]);
      wrapper.append(doppelganger);
      wrapper.append(dropdown);
      widget.element.after(wrapper);
      widget.element.hide();
      widget.element = doppelganger;
      dropdown.click(function (event) {
        event.preventDefault();
        widget.search("", event);
      });
      doppelganger.on("focus", function (event) {
        widget.search("", event);
      }).on("blur", function (event) {
        widget.close(event);
      });
      this._super();
    },
    _normalize: function (items) {
      var list = this._super(items);
      return $.map(list, function (item) {
        item._value = item.value;
        item.value = item.label;
        return item;
      });
    }
  });
})(jQuery);

