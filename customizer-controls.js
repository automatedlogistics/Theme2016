jQuery(document).ready(function(a){a("textarea.text-editor-custom-control").each(function(b,c){var d=a(c).attr("name");a(c).attr("data-customize-setting-link",d),setTimeout(function(){var b=tinyMCE.get(d);b&&b.on("change",function(){b.save(),a(c).trigger("change")})},1e3)})});
//# sourceMappingURL=customizer-controls.js.map