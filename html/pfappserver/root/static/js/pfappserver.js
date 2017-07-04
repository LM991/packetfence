function getStatusMsg(t){var e;try{e=$.parseJSON(t.responseText).status_msg}catch(t){}return e||(e=_("Cannot Load Content")),e}function resetAlert(t){t.find(".alert").clearQueue().remove(),t.find(".error").removeClass("error")}function showAlert(t,e,a,n,r){void 0===r&&(r=5e3);var i=$(t).first().clone();i.find("span").first().text(a),e.before(i),n?i.fadeIn("fast"):i.fadeIn("fast").delay(r).slideUp("fast",function(){$(this).remove()})}function showWarning(t,e,a,n){showAlert(".alert-block",t,e,a,n)}function showPermanentWarning(t,e){showWarning(t,e,!0)}function showSuccess(t,e,a,n){showAlert(".alert-success",t,e,a,n)}function showPermanentSuccess(t,e){showSuccess(t,e,!0)}function showError(t,e,a,n){if(void 0===n&&(n=1e4),"string"==typeof e)showAlert(".alert-error",t,e,a,n);else{var r=t.closest("form");$.each(e,function(e,i){var o,s=r.find('[name="'+e+'"]');(o=s.length?s.closest(".control-group"):r.find('[id="'+e+'"].control-group:not(.hidden)')).length||(o=r.find('.control-group:not(.hidden) > label[for="'+e+'"].control-label').closest(".control-group")),o.addClass("error"),showTab(o,s),showCollapse(s),showAlert(".alert-error",t,i,a,n)})}}function showPermanentError(t,e){showError(t,e,!0)}function btnError(t){t.fadeOut("fast",function(t){$(this).addClass("btn-danger")}).fadeIn("fast").delay(5e3).queue(function(t){$(this).removeClass("btn-danger"),$(this).dequeue()})}function isFormInputEmpty(t){var e,a=t.closest(".control-group"),n=!1;return e="buttons-radio"==t.attr("data-toggle")?0===t.find(".active").length?null:1:t.val(),null===e||"string"==typeof e&&0===$.trim(e).length||0===e.length?(a.addClass("error"),n=!0,showTab(a,t)):a.removeClass("error"),n}function isInvalidNumber(t,e,a){var n=t.closest(".control-group"),r=!1;if(/^[0-9]+$/.test($.trim(t.val()))){var i=parseInt(t.val());(void 0!==e&&i<e||void 0!==a&&i>a)&&(r=!0)}else r=!0;return r?(n.addClass("error"),showTab(n,t)):n.removeClass("error"),r}function showCollapse(t){t.closest(".collapse").collapse("show")}function isFormValid(t){var e=!0;return t.find('input[data-required]:not(:disabled), input[type="number"]:not(:disabled)').each(function(){var t=$(this),a=t.closest(".control-group");return t.trigger("blur"),(e=!a.hasClass("error"))||showCollapse(t),e}),e}function showTab(t,e){var a=t.closest(".tab-pane");a&&a.closest("form").find('.nav-tabs a[href="#'+a.attr("id")+'"]').tab("show")}function _(t){var e=t;return labels[t]&&(e=labels[t]),e}function update_attribute(t,e,a,n){var r=t.attr(e);void 0!==r&&(r=r.replace(a,n),t.attr(e,r))}function update_attributes(t,e,a,n,r){update_attribute(t,e,n,r),t.find(a).each(function(){update_attribute($(this),e,n,r)})}function escapeRegExp(t){return t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function dynamic_list_update_all_attributes(t,e,a){t.find(".sort-handle").first().text(a+1);var n=e+"\\.[0-9]+",r=new RegExp(n),i=e+"."+a.toString();update_attributes(t,"id",'[id*="'+e+'."]',r,i),update_attributes(t,"data-base-id",'[data-base-id*="'+e+'."]',r,i),update_attributes(t,"data-template-parent",'[data-template-parent*="'+e+'."]',r,i),update_attributes(t,"name",'[name^="'+e+'."]',r,i),update_attributes(t,"for",'[for^="'+e+'."]',r,i);var o=escapeJqueryId(e+"."),s=new RegExp(escapeRegExp(o)+"[0-9]+"),d=o+a.toString();$.each(["data-template-control-group","href","data-target-wrapper","data-target","data-template-parent","data-sortable-item"],function(e,a){var n="["+a+'*="'+escapeJqueryId(o)+'"]';update_attributes(t,a,n,s,d)})}function updateAction(t,e){var a=t.val();changeInputFromTemplate(t.next(),$("#"+a+"_action"),e)}function updateCondition(t){var e=t.find(":selected").attr("data-type"),a=t.next();if(e!=a.attr("data-type")){var n=a.next();a.attr("disabled",1),n.attr("disabled",1);var r=$("#"+e+"_operator").clone();$.each(["id","name","data-required"],function(t,e){r.attr(e,a.attr(e))}),r.insertBefore(a);var i=$("#"+e+"_value").clone();$.each(["id","name","data-required"],function(t,e){i.attr(e,n.attr(e))}),i.insertBefore(n),a.attr("data-type")||(r.val(a.val()),i.val(n.val())),n.remove(),a.remove(),r.attr("data-type",e),initWidgets(i)}}function updateSoureRuleCondition(t,e){var a=t.find(":selected").attr("data-type"),n=t.next();if(a!=n.attr("data-type")){var r=n.next(),i="#"+escapeJqueryId(n.attr("id"));n.attr("disabled",1),r.attr("disabled",1),changeInputFromTemplate(n,$("#"+a+"_operator"),e),changeInputFromTemplate(r,$("#"+a+"_value"),e),$(i).attr("data-type",a)}}function escapeJqueryId(t){return t.replace(/(:|\.|\[|\]|,|=|\\)/g,"\\$1")}function changeInputFromTemplate(t,e,a){var n=e.clone();n.removeAttr("id"),n.attr("id",t.attr("id")),n.attr("name",t.attr("name")),n.attr("data-required",1),a&&t.val()&&(n.attr("multiple")?n.val(t.val().split(",")):n.val(t.val())),n.insertBefore(t),t.next(".chzn-container").remove(),t.remove(),initWidgets(n)}function initWidgets(t){t.filter(".chzn-select").chosen(),t.filter(".chzn-deselect").chosen({allow_single_deselect:!0}),t.filter(".timepicker-default").each(function(){var t=!!$(this).val().length&&"value";$(this).timepicker({defaultTime:t,showSeconds:!1,showMeridian:!1})}),t.filter(".input-date, .input-daterange input").datepicker({autoclose:!0}),t.filter(".switch").bootstrapSwitch()}function submitFormHideModal(t,e){$.ajax({async:!1,url:e.attr("action"),type:e.attr("method")||"POST",data:e.serialize()}).always(function(){t.modal("hide")}).done(function(t){$(window).hashchange()}).fail(function(t){$("body,html").animate({scrollTop:0},"fast");var e=getStatusMsg(t);showError($("#section h2"),e)})}function activateNavLink(){var t=location.hash,e=!1,a=null;t&&"#"!=t&&(a=$(".sidenav .nav a").sort(function(t,e){return e.href.length-t.href.length}).filter(function(a,n){return!1===e&&0===t.indexOf(n.hash)&&(e=!0)})),null===a&&(a=$(".sidenav .nav a").first()),a.trigger("click")}function updateSection(t){return activateNavLink(),doUpdateSection(t)}function doUpdateSection(t){var e=$("#section");return e&&($("body,html").animate({scrollTop:0},"fast"),e.loader(),e.fadeTo("fast",.5,function(){$.ajax(t).always(function(){e.fadeTo("fast",1,function(){e.loader("hide")}),resetAlert(e)}).done(function(t){e.empty(),e.append(t),e.find(".input-date, .input-daterange").datepicker({autoclose:!0}),e.find(".input-daterange input").on("changeDate",function(t){$(".datepicker").remove()}),e.find(".timepicker-default").each(function(){var t=!!$(this).val().length&&"value";$(this).timepicker({defaultTime:t,showSeconds:!1,showMeridian:!1})}),e.find(".chzn-select:visible").chosen(),e.find(".chzn-deselect:visible").chosen({allow_single_deselect:!0}),e.find(".switch").bootstrapSwitch(),"undefined"!=typeof Clipboard&&Clipboard.isSupported()?e.find(".clipboard .icon-clipboard").tooltip({title:_("Copy")}):e.find(".clipboard .icon-clipboard").remove(),e.trigger("section.loaded")}).fail(function(t){var a=getStatusMsg(t),n=e.find("h1, h2, h3").first().next();0===n.length&&(e.prepend('<div class="card-actions"><h2></h2><div></div></div>'),n=e.find("h2").first().next()),showPermanentError(n,a)})})),!0}function updateSectionFromForm(t){updateSection({url:t.attr("action"),type:t.attr("method")||"POST",data:t.serialize()})}function pfOnHashChange(t,e){return function(a){var n="/"+location.hash.replace(/^#\/*/,"");return void 0===e||""!==n&&"/"!=n||(n=e),t(n,a)}}function updateDynamicRows(t){t.each(function(t,e){$(this).find(".sort-handle").first().text(t+1),$(this).find(':input, [data-toggle="buttons-radio"] > a').each(function(){var e=$(this),a=e.attr("name"),n=e.attr("id");a&&e.attr("name",a.replace(/\.[0-9]+/,"."+t)),n&&e.attr("id",n.replace(/\.[0-9]+/,"."+t)),"SELECT"==this.tagName&&$(this).find("option").each(function(){var e=$(this),a=e.attr("id");a&&e.attr("id",a.replace(/\.[0-9]+\./,"."+t+"."));var n=e.attr("name");n&&e.attr("name",n.replace(/\.[0-9]+\./,"."+t+"."))})})})}function updateDynamicRowsAfterRemove(t){var e=t.children("tbody"),a=e.children(":not(.hidden)");t.hasClass("table-sortable")&&(a=a.filter(":has(.sort-handle)")),updateDynamicRows(a);var n=a.length;if(n<2){var r="#"+t.attr("id")+"Empty";$(r).length?0===n&&(e.prev("thead").length&&"yes"!=e.attr("data-no-remove")&&t.remove(),$(r).removeClass("hidden")):1==n&&e.children(":not(.hidden)").find('[href="#delete"]').addClass("hidden")}}function bindExportCSV(){$(".exportCSVBtn").doOnce(".exportCSVBtn",function(){var t=this;$(t).click(function(){window.location=$(t).attr("data-export-url")+"?"+$($(t).attr("data-export-form")).serialize()+"&export=export"})})}function updateExtendedDurationExample(t){function e(t){return t<10?"0"+t:t}var a=$("#extendedFrom"),n=a.data("date"),r=a.html(),i=$("#extendedTo");if(!n){var o=new Date;r=o.getFullYear()+"-"+e(o.getMonth()+1)+"-"+e(o.getDate())+" "+e(o.getHours())+":"+e(o.getMinutes())+":"+e(o.getSeconds()),a.html(r),n=Math.floor(o.getTime()/1e3),a.data("date",n)}var s=t.find('[name$=".duration.interval"]').val(),d=t.find('[name$=".duration.unit"]').val();if(s&&d){var l=s+d;if(t.find('[name$="day_base"]').is(":checked")){var c=t.find('[name$="period_base"]').is(":checked"),u={operator:t.find('[name$="operator"]').val(),interval:t.find('[name$="extended_duration.interval"]').val(),unit:t.find('[name$="extended_duration.unit"]').val()};l+=c?"R":"F",u.operator&&u.interval&&u.unit?(l+="subtract"==u.operator?"-":"+",l+=u.interval+u.unit):l+="+0D"}t.data("duration",l),$.ajax(["/configuration","duration",n,l].join("/")).done(function(t){i.html(t.status_msg)})}else i.html(r)}function searchSwitchesGenerator(t){return function(e,a){$.ajax({url:"/config/switch/search",type:"POST",data:{json:1,all_or_any:"any","searches.0.name":"id","searches.0.op":"like","searches.0.value":e}}).done(function(t){var e=$.map(t.items,function(t){return t.id});a(e)}).fail(function(e){var a=getStatusMsg(e);showError(t,a)})}}function obfuscatedTextHover(t,e,a,n){var r=t.prev();r.attr("type",e);var i=r.attr("x-placeholder");if(i){var o=r.attr("placeholder");r.attr("placeholder",i),r.attr("x-placeholder",o)}t.find("i").removeClass(a).addClass(n)}function obfuscatedTextHoverOnEvent(t){obfuscatedTextHover($(this),"text","icon-eye","icon-eye-slash")}function obfuscatedTextHoverOffEvent(t){obfuscatedTextHover($(this),"password","icon-eye-slash","icon-eye")}function setupObfuscatedTextHover(t){var e=$(t);e.off("mouseenter.pf mouseleave.pf"),e.on("mouseenter.pf",obfuscatedTextHoverOnEvent),e.on("mouseleave.pf",obfuscatedTextHoverOffEvent)}function FingerbankSearch(){}$(function(){$("body").on({mouseenter:function(t){var e=$(this);e.text(e.attr("toggle-hover")),e.toggleClass("btn-success btn-danger")},mouseleave:function(t){var e=$(this);$.trim(e.text())==e.attr("toggle-hover")&&(e.text(e.attr("toggle-value-else")),e.toggleClass("btn-success btn-danger"))},toggle:function(t){var e=$(this),a=e.attr("toggle-value");e.fadeOut("fast",function(t){e.text(e.attr("toggle-value-else")),e.hasClass("btn-danger")&&e.removeClass("btn-danger")}).fadeIn("fast"),e.attr("toggle-value",e.attr("toggle-value-else")),e.attr("toggle-value-else",a),a=e.attr("toggle-hover"),e.attr("toggle-hover",e.attr("toggle-hover-else")),e.attr("toggle-hover-else",a),a=e.attr("toggle-href"),e.attr("toggle-href",e.attr("href")),e.attr("href",a)}},".btn-toggle"),$(".dropdown-toggle").dropdown(),$("body").on("click",".btn-group .btn",function(t){var e=$(this),a=e.attr("name"),n=e.siblings('input[name="'+a+'"]');n.val(e.attr("value")),n.trigger("change")}),$("body").on("click",".dropdown-menu-form",function(t){t.stopPropagation()}),$("body").on("blur","input[data-required]",function(){isFormInputEmpty($(this))}),$("body").on("changeDate",".input-date[data-required]",function(){isFormInputEmpty($(this))}),$("body").on("blur",'input[type="number"]',function(){var t=$(this),e=t.attr("min"),a=t.attr("max");$.trim(t.val()).length>0&&isInvalidNumber(t,e,a)})}),String.prototype.asCSSIdentifier=function(){return this.replace(/[^_a-zA-Z0-9]/g,"_")},jQuery.fn.extend({setBindId:function(){return this.each(function(){var t=this;if(!$(t).attr("data-do-bind-id")){var e=$("<a></a>").uniqueId().attr("id");$(t).attr("data-do-bind-id",e)}})},doOnce:function(t,e){return $.pfBindedEvents||($.pfBindedEvents={}),$.pfBindedEvents[t]||($.pfBindedEvents[t]={}),this.each(function(){var a=this;$(a).setBindId(),$.pfBindedEvents[t][$(a).attr("data-do-bind-id")]||($.pfBindedEvents[t][$(a).attr("data-do-bind-id")]=!0,$.proxy(e,this)())})}}),$(function(){function t(t){$(".sidenav-category .active").filter(function(e,a){$(a).attr("data-category")!=t&&$(a).removeClass("active")}),$('.sidenav-category [data-category="'+t+'"]').addClass("active"),$(".sidenav-fluid .sidenav-section").each(function(){var e=$(this);e.attr("data-category")==t?e.show():e.hide()}),$(".sidenav-fluid .sidenav-section .active").removeClass("active")}var e=function(t){t.getResponseHeader("Location")&&window.location.reload(!0)};$.ajaxSetup({timeout:12e4,cache:!1,statusCode:{401:e,302:e}}),$(".sidenav-category a").click(function(e){return t($(this).parent().attr("data-category")),!0}),$(".sidenav-section a:not([data-toggle]):not([target])").click(function(e){var a=$(this).parent();return t(a.closest(".sidenav-section").attr("data-category")),a.hasClass("subsection")&&a.closest(".section").addClass("active"),a.addClass("active"),a.hasClass("section")&&0===a.find("ul").find("li.active").length&&$(a.find("ul").find("li")[0]).addClass("active"),!0}),$(".sidenav-category").on("mouseenter","[data-category]",function(t){var e=$(this),a=e.data("category"),n=e.hasClass("active");$(".sidenav-category-extend").addClass("show").find("li").each(function(){var t=$(this);n||t.data("category")!=a?t.removeClass("show"):t.addClass("show")})}),$(".sidenav-category").on("mouseleave mouseup","[data-category]",function(t){$(".sidenav-category-extend").removeClass("show").find("[data-category]").removeClass("show")}),$('#navbar [data-toggle="tooltip"]').tooltip({placement:"bottom"}),"undefined"!=typeof Clipboard&&Clipboard.isSupported()&&new Clipboard(".icon-clipboard.btn-icon").on("success",function(t){var e=$(t.trigger);e.tooltip("destroy").tooltip({title:_("Copied")}).tooltip("show"),setTimeout(function(){e.tooltip("destroy").tooltip({title:_("Copy")})},3e3)}),$("body").on("click",'[data-toggle="dynamic-list"]',function(t){t.preventDefault();var e=$(this),a=$(e.attr("data-target")),n=$(e.attr("data-target-wrapper")),r=$(e.attr("data-template-parent")),i=$(e.attr("data-template-control-group")),o=e.attr("data-base-id"),s=r.clone();return s.removeAttr("id"),s.find(":input").each(function(t,e){var a=$(e);0===a.closest('[id^="dynamic-list-template"]').length&&(a.removeAttr("disabled"),a.removeClass("disabled"))}),dynamic_list_update_all_attributes(s,o,a.children().length),a.append(s.children()),a.children().last().trigger("dynamic-list.add"),n.removeClass("hidden"),i.addClass("hidden"),!1}),$("body").on("click",'[data-toggle="dynamic-list-delete"]',function(t){t.preventDefault();var e=$(this),a=$(e.attr("data-target-wrapper")),n=$(e.attr("data-target")),r=e.attr("data-base-id"),i=n.siblings(),o=$(e.attr("data-template-control-group"));return n.remove(),0===i.length?(a.addClass("hidden"),o.removeClass("hidden")):i.each(function(t,e){dynamic_list_update_all_attributes($(e),r,t)}),!1}),$("body").on("changeDate",'.input-daterange input[name="start"]',function(t){var e=$(this).parent().data("datepicker");$(e.inputs[1]).datepicker("setStartDate",t.date)}),$("body").on("changeDate",'.input-daterange input[name="end"]',function(t){var e=$(this).parent().data("datepicker");$(e.inputs[0]).datepicker("setEndDate",t.date)}),$("body").on("click",'.input-daterange a[href*="day"]',function(t){t.preventDefault();var e=$(this).attr("href").replace(/#last([0-9]+)days?/,"$1"),a=$(this).closest(".input-daterange").data("datepicker"),n=new Date,r={yyyy:n.getFullYear(),m:n.getMonth()+1,d:n.getDate()};r.dd=(r.d<10?"0":"")+r.d,r.mm=(r.m<10?"0":"")+r.m;var i=new Date(n.getTime()-24*e*60*60*1e3),o={yyyy:i.getFullYear(),m:i.getMonth()+1,d:i.getDate()};o.dd=(o.d<10?"0":"")+o.d,o.mm=(o.m<10?"0":"")+o.m;var s=a.pickers[0].element.attr("data-date-format"),d=s.replace("yyyy",o.yyyy).replace("mm",o.mm).replace("dd",o.dd);a.pickers[0].element.val(d),a.pickers[0].update(),a.pickers[0].setEndDate(i),a.pickers[0].element.trigger({type:"changeDate",date:a.pickers[0].date});var l=(s=a.pickers[1].element.attr("data-date-format")).replace("yyyy",r.yyyy).replace("mm",r.mm).replace("dd",r.dd);return a.pickers[1].element.val(l),a.pickers[1].update(),a.pickers[1].setStartDate(n),a.pickers[1].element.trigger({type:"changeDate",date:a.pickers[1].date}),a.updateDates(),!1}),$("#section").on("admin.ordered",".admin_ordered",function(t){var e=$(this).closest("form");$.ajax({type:"POST",url:e.attr("action"),data:e.serialize()}).done(function(t){resetAlert($("#section")),showSuccess(e,t.status_msg)}).fail(function(t){var a=getStatusMsg(t);showPermanentError(e,a)})}),$("body").on("mousemove",".table-sortable tbody tr:not(.ui-draggable), .list-sortable li:not(.ui-draggable)",function(){var t=$(this),e=t.closest("table, ul").attr("id");t.draggable({scope:e,handle:".sort-handle",appendTo:"body",cursor:"move",helper:function(t){var e=[];if("TD"==t.target.tagName)$(t.target).closest("tr").first().find("td").each(function(){$(this).find('a[class!="btn-icon"], :selected, .uneditable').map(function(){$(this).hasClass("btn")||e.push($(this).text())}),$(this).find('input[type!="hidden"]:not(:checkbox)').map(function(){e.push($(this).val())})});else{var a=$(t.target).closest("li").find("a").first().clone();a.find("span").remove(),e.push(a.text())}return $('<div class="drag-row">'+e.join(" ")+"</div>")}}),t.siblings().droppable({scope:e,accept:function(t){var e,a=0,n=t.first()[0];if("TR"==n.tagName)e=n.rowIndex,a=this.rowIndex-e;else{var r=$(this).closest("ul").children();e=r.index(t),a=r.index(this)-e}return a<0||a>1},hoverClass:"drop-row",drop:function(t,e){var a=e.draggable.detach(),n=$(this);a.insertBefore(n),updateDynamicRows(n.siblings(":not(.hidden)").addBack()),n.closest("table, ul").trigger("admin.ordered")}})}),$("body").on("mousemove",".dynamic-list-sortable .sort-handle:not(.ui-draggable)",function(){var t=$(this),e=t.attr("data-sortable-scope"),a=$(t.attr("data-sortable-item"));a.draggable({scope:e,handle:".sort-handle",appendTo:"body",cursor:"move",helper:function(t){return'<div class="drag-row">'+$(t.target).attr("data-sortable-text")+"</div>"}}),a.siblings().droppable({scope:e,accept:function(t){return t.find(".sort-handle:first").text()!=$(this).find(".sort-handle:first").text()},hoverClass:"drop-dynamic-row",drop:function(t,e){var a=$(this),n=parseInt(a.find(".sort-handle:first").text(),10),r=e.draggable.find(".sort-handle:first"),i=$(r.attr("data-sortable-parent")),o=$(r.attr("data-sortable-item")),s=i.children().length,d=r.attr("data-base-id"),l=o.detach(),c=parseInt(l.find(".sort-handle:first").text(),10);n==s?i.append(l):c<n?l.insertAfter(a):l.insertBefore(a),i.children().each(function(t,e){dynamic_list_update_all_attributes($(e),d,t)}),i.trigger("dynamic-list.ordered")}})}),$("body").on("click",'.table-dynamic tbody [href="#add"]',function(t){return $(this).trigger("addrow"),!1}),$("body").on("addrow",".table-dynamic",function(t){var e=$(this),a=e.find(t.target).closest("tr"),n=e.children("tbody"),r=n.children(".hidden").first();if(r){var i=r.clone();i.removeClass("hidden"),i.find(":input").removeAttr("disabled"),i.find(".btn").removeClass("disabled"),a.length>0?i.insertAfter(a):i.insertBefore(r);var o=n.children(":not(.hidden)");if(e.hasClass("table-sortable")&&(o=o.filter(":has(.sort-handle)")),updateDynamicRows(o),o.length>=2){var s="#"+(e=n.closest("table")).attr("id")+"Empty";$(s).length&&$(s).addClass("hidden"),n.children(":not(.hidden)").find('[href="#delete"]').removeClass("hidden")}i.trigger("admin.added")}return!1}),$("body").on("click",'.table-dynamic [href="#delete"]',function(t){return $(this).trigger("deleterow"),!1}),$("body").on("deleterow",".table-dynamic",function(t){var e=$(this),a=e.find(t.target).closest("tr"),n=e.children("tbody");return a.fadeOut("fast",function(){$(this).remove(),updateDynamicRowsAfterRemove(e),n.trigger("admin.deleted")}),!1}),$("#section").on("click","a.updates_section_status_msg",function(){var t=$(this),e=t.attr("href"),a=t.data("sibling"),n=$("#section"),r=n.prev(".loader"),i=(a=a?t.closest(a):t.parent().next()).find('[data-toggle="dropdown"]');return r&&r.show(),n.fadeTo("fast",.5),$.ajax(e).always(function(){r&&r.hide(),n.stop(),n.fadeTo("fast",1)}).done(function(t){showPermanentSuccess(a,t.status_msg)}).fail(function(t){var e=getStatusMsg(t);404==t.status?showSuccess(a,e):showPermanentError(a,e)}),i.length&&i.dropdown("toggle"),!1}),$("#section").on("click",".call-modal-confirm-link",function(t){var e=$(this);if(e.hasClass("disabled"))return!1;var a=e.attr("href"),n=e.attr("data-target"),r=e.attr("data-content"),i=$(n);i.find("#content").html(r);var o=i.find("a.btn-primary").first();return i.modal({show:!0}),o.off("click"),o.attr("href",a),o.click(function(){i.modal("hide")}),!1}),$("#section").on("click",".call-modal-confirm-form",function(t){var e=$(this);if(e.hasClass("disabled"))return!1;var a,n=e.attr("data-modal"),r=e.attr("data-modal-form"),i=$("#"+n),o=e.attr("data-content"),s=i.find("a.btn-primary").first();return a=r?$("#"+r):e.closest("form"),o&&i.find("#content").html(o),isFormValid(a)&&(i.modal({show:!0}),s.off("click"),s.click(function(){return $.ajax({url:a.attr("action"),type:a.attr("method")||"POST",data:a.serialize()}).always(function(){i.modal("hide")}).done(function(t){t.status_msg?($("body,html").animate({scrollTop:0},"fast"),showSuccess($("h2").first().next(),t.status_msg)):$(window).hashchange()}).fail(function(t){$("body,html").animate({scrollTop:0},"fast");var e=getStatusMsg(t);showError($("#section h2"),e)}),!1})),!1}),$("#section").on("click",".call-modal",function(t){var e=$(this);if(e.hasClass("disabled"))return!1;var a=e.attr("href"),n=e.attr("data-modal"),r=e.attr("data-modal-content"),i=$("#"+n);r&&i.find("#content").html(r);var o=i.find("a.btn-primary").first();return i.modal({show:!0}),o.off("click"),o.click(function(){return $.ajax(a).always(function(){i.modal("hide")}).done(function(t){$(window).hashchange()}).fail(function(t){$("body,html").animate({scrollTop:0},"fast");var e=getStatusMsg(t);showError($("#section h2"),e)}),!1}),!1}),$("#section").on("click",'[data-toggle="modal"][data-target][data-href-background]',function(t){var e=$(this),a=e.attr("data-href-background"),n=$(e.attr("data-target")).find(".btn-primary").first();n.off("click"),n.click(function(){$.ajax(a).done(function(t){$(window).hashchange()}).fail(function(t){$("body,html").animate({scrollTop:0},"fast");var e=getStatusMsg(t);showError($("#section h2"),e)})})}),$("#section").on("click","#addExtendedTime",function(t){var e=$(this),a=e.closest(".extended-duration").data("duration");if(a){var n=$(e.data("target")),r=n.val(),i=!1;$.each(r.split(/ *, */),function(t,e){if(e==a)return i=!0,!1}),i||n.val(r?r+","+a:a)}return!1}),$("body").on("section.loaded",function(t){updateExtendedDurationExample($(".extended-duration")),bindExportCSV(),FingerbankSearch.setup(),setupObfuscatedTextHover(".pf-obfuscated-text + button");var e=$(".sidenav-fluid .row-fluid").first();$("#section").find(".sidenav-section").each(function(){this.id&&e.find("#"+this.id).length>0?e.find("#"+this.id).show():$(this).detach().appendTo(e).show()})}),$("#section").on("change",".extended-duration",function(t){var e=$(t.target),a=e.closest(".extended-duration");e.is('[name$="day_base"]')&&(e.is(":checked")?a.find("[name*=extended_duration], [name$=period_base]").removeAttr("disabled").removeClass("disabled"):(a.find("input[name*=extended_duration], select[name*=extended_duration], input[name$=period_base]").attr("disabled","disabled"),a.find("a[name*=extended_duration]").addClass("disabled"))),updateExtendedDurationExample(a)}),"function"==typeof init&&init(),"function"==typeof initModals&&initModals(),$("#checkup_task_toggle").click(function(t){return t.preventDefault(),$(".checkup_results").remove(),$('<li class="checkup_results disabled"><div class="text-center"><i class="icon-spin icon-circle-o-notch"></i></div></li>').insertAfter($(this).parent()),$.get("/admin/checkup",function(t){var e=$(".checkup_results");if(e.html('<a href="#" disabled>Result(s):</a>'),t.items.problems.length>0)for(var a in t.items.problems)$('<li class="checkup_results disabled"><a href="#" disabled>'+t.items.problems[a].severity+" : "+t.items.problems[a].message+"</a></li>").insertAfter(e);else $('<li class="checkup_results disabled"><a href="#" disabled>No problem detected!</a></li>').insertAfter(e)}),!1}),$("#fixpermissions_task_toggle").click(function(t){return t.preventDefault(),$(".fixpermissions_results").remove(),$('<li class="fixpermissions_results disabled"><div class="text-center"><i class="icon-spin icon-circle-o-notch"></i></div></li>').insertAfter($(this).parent()),$.get("/admin/fixpermissions",function(t){var e=$(".fixpermissions_results");e.html('<a href="#" disabled>Result(s):</a>'),$('<li class="fixpermissions_results disabled"><a href="" disabled>Fixed permissions !</a></li>').insertAfter(e)}),!1}),$("#section").on("show",".modal",function(t){FingerbankSearch.setup(),setupObfuscatedTextHover(".modal .pf-obfuscated-text + button")})}),FingerbankSearch.prototype.model_stripped=function(){return this.model.split("::Model::")[1].toLowerCase()},FingerbankSearch.prototype.search=function(t,e){var a=this,n=this.model_stripped();$.ajax({type:"POST",url:"/config/fingerbank/"+n+"/typeahead_search",headers:{Accept:"application/json"},data:{json:1,query:t,model:this.model},success:function(t){var n=$.map(t.items,function(t){return t.display});a.results=t.items;var r=a.typeahead_field.closest(".control-group");0===n.length?r.addClass("error"):r.removeClass("error"),e(n)}})},FingerbankSearch.setup=function(){$(".fingerbank-type-ahead").doOnce(".fingerbank-type-ahead",function(){var o=this;!function(){var search=new FingerbankSearch;search.typeahead_field=$(o),search.typeahead_field.attr("autocomplete","off"),search.typeahead_btn=$($(o).attr("data-btn")),search.model=$(o).attr("data-type-ahead-for"),search.add_to=$("#"+$(o).attr("data-add-to")),search.add_action=$(o).attr("data-add-action"),$(o).typeahead({source:$.proxy(search.search,search),minLength:2,items:11,matcher:function(t){return!0}}),search.typeahead_btn.click(function(e){e.preventDefault();var id,display;return $.each(search.results,function(){this.display==search.typeahead_field.val()&&(id=this.id,display=this.display)}),search.add_action?eval(search.add_action+"(search,id,display)"):void 0!==display&&(search.add_to.append('<option selected="selected" value="'+id+'">'+display+"</option>"),search.add_to.trigger("liszt:updated")),search.typeahead_field.val(""),!1})}()})};
//# sourceMappingURL=pfappserver.js.map