!function(e){function t(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return e[s].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="javascripts/",t(0)}([function(e,t,i){e.exports=i(1)},function(e,t,i){"use strict";!function(e){return!!e.Craft&&void(Craft.ReasonsPlugin={FieldLayoutDesigner:i(2),ConditionalsRenderer:i(4),ASSET_SOURCE_HANDLE:"assetSource",CATEGORY_GROUP_HANDLE:"categoryGroup",TAG_GROUP_HANDLE:"tagGroup",GLOBAL_SET_HANDLE:"globalSet",ENTRY_TYPE_HANDLE:"entryType",SECTION_HANDLE:"section",USERS_HANDLE:"users",FIELDS_HANDLE:"field",SOLSPACE_CALENDAR_HANDLE:"solspaceCalendar",ASSET_SOURCE_ACTION:"assetSources/saveSource",CATEGORY_ACTION:"categories/saveCategory",CATEGORY_GROUP_ACTION:"categories/saveGroup",TAG_ACTION:"tagManager/saveTag",TAG_GROUP_ACTION:"tags/saveTagGroup",GLOBAL_SET_CONTENT_ACTION:"globals/saveContent",GLOBAL_SET_ACTION:"globals/saveSet",ENTRY_ACTION:"entries/saveEntry",ENTRY_REVISION_ACTION:"entryRevisions/saveDraft",ENTRY_TYPE_ACTION:"sections/saveEntryType",USERS_ACTION:"users/saveUser",USERS_FIELDS_ACTION:"users/saveFieldLayout",FIELDS_ACTION:"fields/saveField",SOLSPACE_CALENDAR_EVENTS_ACTION:"calendar/events/saveEvent",SOLSPACE_CALENDAR_SETTINGS_ACTION:"calendar/calendars/saveCalendar",SOLSPACE_CALENDAR_LEGACY_SETTINGS_ACTION:"calendar/settings/saveSettings",RENDER_CONTEXT:"render",LAYOUT_DESIGNER_CONTEXT:"fld",FIELD_DESIGNER_CONTEXT:"field",init:function(e){this.data=e,this.initPrimaryForm()},initPrimaryForm:function(){this.destroyPrimaryForm(),Garnish.requestAnimationFrame(function(){var e=Craft.cp.$primaryForm&&Craft.cp.$primaryForm.length?Craft.cp.$primaryForm:$("#content form:first");e&&e.length&&(this.primaryForm=this.initForm(e))}.bind(this))},destroyPrimaryForm:function(){this.primaryForm&&(this.primaryForm.destroy(),delete this.primaryForm)},initElementEditor:function(e){var t=this.getConditionals(e);if(!t)return!1;var i=(new Date).getTime(),s=function(){var e=(new Date).getTime(),n=$(".elementeditor:last"),a=n.length>0&&n.closest(".hud"),r=!!(a&&a.length>0)&&a.data("elementEditor"),o=!!r&&r.$form;o?(r._reasonsForm=new this.ConditionalsRenderer(o,t),r.hud.on("hide",$.proxy(this.destroyElementEditorForm,this,r))):e-i<2e3&&Garnish.requestAnimationFrame(s)}.bind(this);s()},destroyElementEditorForm:function(e){var t=e._reasonsForm||null;t&&(t.destroy(),delete e._reasonsForm)},initForm:function(e){var t=this.getElementSourceFromForm(e),i=!!t&&this.getFormContext(e);if(!t||!i)return!1;var s=t.type+(t.id?":"+t.id:""),n=this.getConditionals(s);switch(i){case this.LAYOUT_DESIGNER_CONTEXT:return new this.FieldLayoutDesigner(e,n);case this.FIELD_DESIGNER_CONTEXT:return null;case this.RENDER_CONTEXT:return n?new this.ConditionalsRenderer(e,n):null}return null},getConditionals:function(e){return e?this.data.conditionals&&this.data.conditionals.hasOwnProperty(e)?this.data.conditionals[e]:null:this.data.conditionals||{}},getToggleFields:function(){return this.data.toggleFields?this.data.toggleFields:[]},getToggleFieldById:function(e){e=parseInt(e);for(var t=this.getToggleFields(),i=t.length,s=0;s<i;++s)if(parseInt(t[s].id)===e)return t[s];return!1},getFieldIds:function(){return this.data.fieldIds?this.data.fieldIds:{}},getFieldIdByHandle:function(e){var t=this.getFieldIds();return!(!t||!t.hasOwnProperty(e))&&t[e]},getToggleFieldTypes:function(){return this.data.toggleFieldTypes?this.data.toggleFieldTypes:[]},getElementSourceFromForm:function(e){if(e.data("elementEditor"))return!1;var t=e.find('input[type="hidden"][name="namespace"]').val();t&&(t+="-");var i,s,n=e.find('input[type="hidden"][name="action"]').val();switch(n){case this.ASSET_SOURCE_ACTION:i=this.ASSET_SOURCE_HANDLE,s='input[type="hidden"][name="sourceId"]';break;case this.CATEGORY_ACTION:case this.CATEGORY_GROUP_ACTION:i=this.CATEGORY_GROUP_HANDLE,s='input[type="hidden"][name="groupId"]';break;case this.GLOBAL_SET_CONTENT_ACTION:case this.GLOBAL_SET_ACTION:i=this.GLOBAL_SET_HANDLE,s='input[type="hidden"][name="setId"]';break;case this.ENTRY_ACTION:case this.ENTRY_REVISION_ACTION:var a=e.find('select#entryType, input[type="hidden"][name="entryTypeId"], input[type="hidden"][name="typeId"], #'+t+"entryType");i=a.length?this.ENTRY_TYPE_HANDLE:this.SECTION_HANDLE,s=a.length?'select#entryType, input[type="hidden"][name="entryTypeId"], input[type="hidden"][name="typeId"], #'+t+"entryType":'input[type="hidden"][name="sectionId"], #'+t+"section";break;case this.ENTRY_TYPE_ACTION:i=this.ENTRY_TYPE_HANDLE,s='input[type="hidden"][name="entryTypeId"]';break;case this.TAG_ACTION:case this.TAG_GROUP_ACTION:i=this.TAG_GROUP_HANDLE,s='input[type="hidden"][name="tagGroupId"], input[type="hidden"][name="groupId"]';break;case this.USERS_ACTION:case this.USERS_FIELDS_ACTION:i=this.USERS_HANDLE;break;case this.FIELDS_ACTION:i=this.FIELDS_HANDLE,s='input[type="hidden"][name="fieldId"]';break;case this.SOLSPACE_CALENDAR_LEGACY_SETTINGS_ACTION:i=this.SOLSPACE_CALENDAR_HANDLE;break;case this.SOLSPACE_CALENDAR_EVENTS_ACTION:i=this.SOLSPACE_CALENDAR_HANDLE,s='input[type="hidden"][name="calendarEvent[calendarId]"]';break;case this.SOLSPACE_CALENDAR_SETTINGS_ACTION:i=this.SOLSPACE_CALENDAR_HANDLE,s='input[type="hidden"][name="calendarId"]';break;case this.COMMERCE_PRODUCT_TYPE_ACTION:case this.COMMERCE_PRODUCT_ACTION:i=this.COMMERCE_PRODUCT_TYPE_HANDLE,s='input[type="hidden"][name="typeId"]'}return!!i&&{type:i,id:!!s&&0|e.find(s).val()}},getFormContext:function(e){if(e.data("elementEditor"))return!1;var t=e.find('input[type="hidden"][name="action"]').val();switch(t){case this.GLOBAL_SET_CONTENT_ACTION:case this.ENTRY_ACTION:case this.ENTRY_REVISION_ACTION:case this.TAG_ACTION:case this.CATEGORY_ACTION:case this.USERS_ACTION:case this.SOLSPACE_CALENDAR_EVENTS_ACTION:case this.COMMERCE_PRODUCT_ACTION:return this.RENDER_CONTEXT;case this.ASSET_SOURCE_ACTION:case this.CATEGORY_GROUP_ACTION:case this.GLOBAL_SET_ACTION:case this.ENTRY_TYPE_ACTION:case this.TAG_GROUP_ACTION:case this.USERS_FIELDS_ACTION:case this.SOLSPACE_CALENDAR_LEGACY_SETTINGS_ACTION:case this.SOLSPACE_CALENDAR_SETTINGS_ACTION:case this.COMMERCE_PRODUCT_TYPE_ACTION:return this.LAYOUT_DESIGNER_CONTEXT;case this.FIELDS_ACTION:return this.FIELD_DESIGNER_CONTEXT}return!1}})}(window),window.jQuery&&/*!
	     * jQuery.fn.hasAttr()
	     *
	     * Copyright 2011, Rick Waldron
	     * Licensed under MIT license.
	     *
	     */
!function(e){e.fn.hasAttr=function(e){for(var t=0,i=this.length;t<i;t++)if(void 0!==this.attr(e))return!0;return!1}}(jQuery)},function(e,t,i){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),a=i(3);e.exports=function(){function e(t,i){s(this,e),t&&t.length&&(this.$el=t,this.conditionals=i,this.settings={formSelector:"form:first",fieldSettingsSelector:"a.settings",fieldSelector:".fld-field",tabSelector:".fld-tabs .fld-tab"},this.templates={input:function(e){return'<input type="'+e.type+'" name="'+(e.name||"")+'" value="'+(e.value||"")+'" />'},modal:function(){return'<div class="modal elementselectormodal reasonsModal"><div class="body" /><div class="footer"><div class="buttons rightalign first"><div class="btn close submit">Done</div></div></div></div>'}},this.init())}return n(e,[{key:"init",value:function(){var e=Craft.ReasonsPlugin.getToggleFields();this.toggleFieldIds=$.map(e,function(e){return parseInt(e.id)}),this.$conditionalsInput=$(this.templates.input({name:"_reasons",type:"hidden"})),this.$conditionalsIdInput=$(this.templates.input({name:"_reasonsId",value:this.id||"",type:"hidden"})),this.$el.append(this.$conditionalsInput).append(this.$conditionalsIdInput).on("submit",$.proxy(this.onFormSubmit,this)),Garnish.requestAnimationFrame($.proxy(function(){this.refresh()},this)),this.$el.on("mousedown",this.settings.fieldSelector,$.proxy(this.onFieldMouseDown,this)),Garnish.$doc.on("click",".menu a",$.proxy(this.onFieldSettingsMenuItemClick,this))}},{key:"destroy",value:function(){this.$el.off("mousedown",this.settings.fieldSelector,$.proxy(this.onFieldMouseDown,this)),Garnish.$doc.on("click",".menu a",$.proxy(this.onFieldSettingsMenuItemClick,this))}},{key:"refresh",value:function(){var e,t,i,s,n=this,r={};this.$el.find(this.settings.tabSelector).each(function(){e=$(this).find(n.settings.fieldSelector),s=[],e.each(function(){if(t=$(this),i=parseInt(t.data("id")),n.toggleFieldIds.indexOf(i)>-1){var e=Craft.ReasonsPlugin.getToggleFieldById(i);e&&s.push(e)}}),e.each(function(){t=$(this),i=parseInt(t.data("id")),t.data("_reasonsBuilder")?t.data("_reasonsBuilder").update({toggleFields:s}):t.data("_reasonsBuilder",new a({fieldId:i,toggleFields:s,rules:n.conditionals&&n.conditionals.hasOwnProperty(i)?n.conditionals[i]:null}));var e=t.data("_reasonsBuilder").getConditionals();if(e?(r[i]=e,t.addClass("reasonsHasConditionals")):t.removeClass("reasonsHasConditionals"),!t.data("_reasonsSettingsMenuItemInitialized")){var o=t.find(n.settings.fieldSettingsSelector),l=o.data("menubtn")||!1;if(!l)return;var d=l.menu.$container;d.find("ul").children(":first").clone(!0).insertBefore(d.find("ul:first li:last")).find("a:first").data("_reasonsField",t).attr("data-action","toggle-conditionals").text(Craft.t("Edit conditionals")),t.data("_reasonsSettingsMenuItemInitialized",!0)}})}),0===Object.keys(r).length?this.$conditionalsInput.attr("value",""):this.$conditionalsInput.attr("value",JSON.stringify(r))}},{key:"onFieldMouseDown",value:function(e){var t=this,i=function e(i){$("body").off("mouseup",e),Garnish.requestAnimationFrame(function(){t.refresh()})};$("body").on("mouseup",i)}},{key:"onFieldSettingsMenuItemClick",value:function(e){var t=$(e.target),i=t.data("_reasonsField");if("toggle-conditionals"===t.data("action")){if(e.preventDefault(),e.stopPropagation(),!t.data("_reasonsModal")){var s=this,n=i.data("_reasonsBuilder"),a=$(this.templates.modal()),r=new Garnish.Modal(a,{resizable:!0,autoShow:!1,onShow:function(){Garnish.requestAnimationFrame(function(){s.refresh()})},onHide:function(){Garnish.requestAnimationFrame(function(){s.refresh()})}});n.get().appendTo(a.find(".body")),a.on("click",".close",function(e){r.hide()}),t.data("_reasonsModal",r)}t.data("_reasonsModal").show()}Garnish.requestAnimationFrame($.proxy(function(){this.refresh()},this))}},{key:"onFormSubmit",value:function(){this.refresh()}}]),e}()},function(e,t){"use strict";var i=Garnish.Base.extend({$container:null,init:function(e){if(this.setSettings(e,i.defaults),this.templates=this.settings.templates,this.fieldId=this.settings.fieldId,this.$container=$(this.templates.builderUi()),this.$builder=this.$container.find(".reasonsBuilder:first"),this.$rule=this.$container.find(".reasonsRule:first").clone(!0),this.$statement=this.$container.find(".reasonsStatement:first").clone(!0),this.$statement.find(".reasonsRule").remove(),this.$message=this.$container.find(".reasonsMessage:first"),this.$container.on("click",".reasonsAddRule",$.proxy(this.onReasonsAddRuleClick,this)).on("click",".reasonsRemoveRule",$.proxy(this.onReasonsRemoveRuleClick,this)).on("click",".reasonsAddStatement",$.proxy(this.onReasonsAddStatementClick,this)).on("change",".reasonsRuleToggleField select",$.proxy(this.onReasonsRuleToggleFieldChange,this)).on("change",".reasonsRuleCompare select",$.proxy(this.onReasonsRuleCompareChange,this)).on("change",".reasonsRuleValue *:input",$.proxy(this.onReasonsRuleValueChange,this)),this.$builder.html(""),this.setToggleFields(this.settings.toggleFields),this.settings.rules&&this.settings.rules.length>0)for(var t=0;t<this.settings.rules.length;++t)this.addStatement({rules:this.settings.rules[t]});this.refresh(),i.instances.push(this)},get:function(){return this.$container},disable:function(){this.$container.addClass("disabled")},enable:function(){this.$container.removeClass("disabled")},update:function(e){this.setSettings(e,this.settings),this.setToggleFields(this.settings.toggleFields),this.refresh()},setToggleFields:function(e){if(!e)return!1;this.settings.toggleFields=[],this.settings.toggleFieldIds=[];for(var t=0;t<e.length;++t)parseInt(e[t].id)!==this.fieldId&&(this.settings.toggleFields.push(e[t]),this.settings.toggleFieldIds.push(parseInt(e[t].id)));for(var i="",t=0;t<this.settings.toggleFields.length;++t)i+=this.templates.toggleSelectOption(this.settings.toggleFields[t]);this.$rule.find(".reasonsRuleToggleField select").html(i)},refresh:function(){this.settings.rules=[];var e=this.settings.toggleFields;if(0===e.length)return this.disable(),this.$message.text(Craft.t("No toggle fields available.")),!1;this.enable(),this.$message.text("");var t,i,s,n,a,r,o,l=this,d=this.$container.find(".reasonsStatement");d.each(function(){return t=[],i=$(this),s=i.find(".reasonsRule"),s.each(function(){if(n=$(this),a=n.find(".reasonsRuleToggleField select"),r=parseInt(a.val()),l.settings.toggleFieldIds.indexOf(r)===-1)return void n.remove();o="";for(var i=0;i<l.settings.toggleFields.length;++i)o+=l.templates.toggleSelectOption(e[i],parseInt(e[i].id)===r);a.html(o),t.push({fieldId:r,compare:n.find(".reasonsRuleCompare select").val(),value:n.find(".reasonsRuleValue *:input:first").val()})}),0===t.length?void i.remove():void l.settings.rules.push(t)})},getConditionals:function(){return!!(this.settings.rules&&this.settings.rules.length>0)&&this.settings.rules},addStatement:function(e){e=$.extend({rules:!1},e);var t=this.$statement.clone(!0),i=e.rules;if(this.$builder.append(t),i)for(var s=0;s<i.length;++s)this.addRule($.extend({target:t},i[s]));else this.addRule({target:t});return t},addRule:function(e){e=$.extend({fieldId:null,compare:null,value:null},e);var t=this.$rule.clone(!0),i=e.target||this.$builder.find(".reasonsStatement:last"),s=e.fieldId,n=e.compare,a=e.value;return s&&t.find(".reasonsRuleToggleField select").val(s),i.length>0&&(i.find(".reasonsRules:first").append(t),t.find(".reasonsRuleToggleField select").trigger("change"),n&&t.find(".reasonsRuleCompare select").val(n),a&&t.find(".reasonsRuleValue *:input:first").val(a),t)},onReasonsAddRuleClick:function(e){e.preventDefault();var t=$(e.currentTarget).parents(".reasonsStatement");this.addRule({target:t})},onReasonsRemoveRuleClick:function(e){e.preventDefault();var t=$(e.currentTarget),i=t.parents(".reasonsRule");i.remove(),this.refresh()},onReasonsAddStatementClick:function(e){e.preventDefault(),this.addStatement()},onReasonsRuleToggleFieldChange:function(e){e.preventDefault();var t=$(e.currentTarget),i=t.parents(".reasonsRule"),s=i.find(".reasonsRuleValue"),n=t.val(),a=Craft.ReasonsPlugin.getToggleFieldById(n),r=a.type,o=a.settings,l="";switch(r){case"Lightswitch":l=this.templates.select([{true:Craft.t("on")},{false:Craft.t("off")}]);break;case"Dropdown":case"MultiSelect":case"Checkboxes":case"RadioButtons":case"ButtonBox_Buttons":case"ButtonBox_Colours":case"ButtonBox_TextSize":case"ButtonBox_Width":for(var d,u=o.options,h=[],c=0;c<u.length;++c)d={},d[u[c].value]=u[c].label,h.push(d);l=this.templates.select(h,"MultiSelect"===r||"Checkboxes"===r);break;case"Number":l=this.templates.number(o);break;case"ButtonBox_Stars":for(var d,f=parseInt(o.numStars)+1,h=[],c=0;c<f;++c)d={},d[""+c]=c,h.push(d);l=this.templates.select(h);break;case"PositionSelect":for(var d,u=o.options,h=[],c=0;c<u.length;++c)d={},d[u[c]]=u[c].charAt(0).toUpperCase()+u[c].slice(1),h.push(d);l=this.templates.select(h);break;case"Entries":case"Categories":case"Tags":case"Assets":case"Users":case"Calendar_Event":var h=[{null:Craft.t("Empty").toLowerCase()},{notnull:Craft.t("Not empty").toLowerCase()}];l=this.templates.select(h);break;default:l=this.templates.input(o)}s.html(l)},onReasonsRuleCompareChange:function(e){e.preventDefault()},onReasonsRuleValueChange:function(e){e.preventDefault()}},{defaults:{fieldId:null,toggleFields:null,rules:null,templates:{select:function(e,t){for(var i,s,n,a=[],r=0;r<e.length;++r)i=e[r],s=Object.keys(i)[0],n=i[s],a.push('<option value="'+s+'">'+n+"</option>");return'<div class="'+(t?"multiselect":"select")+'"><select'+(t?" multiple":"")+">"+a.join("")+"</select></div>"},toggleSelectOption:function(e,t){return'<option value="'+e.id+'" data-type="'+e.type+'"'+(t?" selected":"")+">"+e.name+"</option>"},number:function(e){return'<div class="input"><input class="text" type="number" value="0" min="'+e.min+'" max="'+e.max+'" autocomplete="off"></div>'},input:function e(t){var e="";return t=$.extend({initialRows:4,placeholder:"",multiline:!1},t),e+="1"===t.multiline?'<textarea rows="'+t.initialRows+'" placeholder="'+t.placeholder+'" autocomplete="off"></textarea>':'<input class="text" type="text" size="20" value="" placeholder="'+t.placeholder+'" autocomplete="off">','<div class="input">'+e+"</div>"},builderUi:function(){return'<div class="reasonsBuilderUi"><div class="wrapper"><div class="heading"><span>'+Craft.t("Show this field if")+'</span></div><div class="reasonsBuilder"><div class="reasonsStatement"><span class="delimiter">'+Craft.t("or")+'</span><div class="reasonsRules"><div class="reasonsRule"><div class="reasonsRuleParams"><div class="select reasonsRuleToggleField"><select /></div><div class="select reasonsRuleCompare"><select><option value="==">'+Craft.t("is equal to")+'</option><option value="!=">'+Craft.t("is not equal to")+'</option></select></div><div class="reasonsRuleValue" /></div><div class="reasonsRuleAmend"><a class="delete icon reasonsRemoveRule" title="'+Craft.t("Remove rule")+'"></a><a class="add icon reasonsAddRule" title="'+Craft.t("and")+'"></a></div><span class="reasonsRuleLead">'+Craft.t("and")+'</span></div></div></div></div><div class="reasonsAdd"><a class="btn reasonsAddStatement">'+Craft.t("Add rules")+'</a></div></div><div class="reasonsMessage"></div></div>'}}},instances:[]});e.exports=i},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}();e.exports=function(){function e(t,s){return i(this,e),this.settings={fieldsSelector:".field:not(#title-field)",livePreviewEditorSelector:".lp-editor",elementEditorSelector:".elementeditor",lightswitchContainerSelector:".lightswitch",positionSelectContainerSelector:".btngroup"},this.$el=t,this.id=this.$el.attr("id"),this.id||(this.id="_reasonsForm-"+Math.random().toString(36).slice(2),this.$el.attr("id",this.id)),this.conditionals=s,$(this.init.bind(this)),this}return s(e,[{key:"init",value:function(){this.addEventListeners(),this.addLivePreviewListeners(),this.render()}},{key:"addEventListeners",value:function(){Garnish.$doc.on("click",this.settings.fieldsSelector+'[data-toggle="1"]',this.onInputWrapperClick.bind(this)).on("change keyup",this.settings.fieldsSelector+'[data-toggle="1"] *:input, '+this.settings.fieldsSelector+'[data-toggle="1"] '+this.settings.lightswitchContainerSelector,this.onFieldInputChange.bind(this)).on("click","a[data-buttonbox-value]",this.onFieldInputChange.bind(this));for(var e,t=this,i=["elementselect","categoriesfield"],s=0;s<i.length;++s)$(this.settings.fieldsSelector+" ."+i[s]).each(function(){if(!$(this).hasAttr("data-reasonselementselect")){var i=(new Date).getTime(),s=function(){e=$(this).data("elementSelect"),e?(e.on("selectElements",t.onElementSelectChange.bind(t)),e.on("removeElements",t.onElementSelectChange.bind(t)),$(this).attr("data-reasonselementselect",""),t.onElementSelectChange()):(new Date).getTime()-i<2e3&&Garnish.requestAnimationFrame(s)}.bind(this);s()}})}},{key:"removeEventListeners",value:function(){Garnish.$doc.off("click",this.settings.fieldsSelector+'[data-toggle="1"]',this.onInputWrapperClick.bind(this)).off("change keyup",this.settings.fieldsSelector+'[data-toggle="1"] *:input, '+this.settings.fieldsSelector+'[data-toggle="1"] '+this.settings.lightswitchContainerSelector,this.onFieldInputChange.bind(this)).off("click","a[data-buttonbox-value]",this.onFieldInputChange.bind(this));var e,t=this;$("[data-reasonselementselect]").each(function(){e=$(this).data("elementSelect"),e&&(e.off("selectElements",t.onElementSelectChange.bind(t)),e.off("removeElements",t.onElementSelectChange.bind(t))),$(this).removeAttr("[data-reasonselementselect]")})}},{key:"addLivePreviewListeners",value:function(){function e(){Craft.livePreview?(this._livePreview=Craft.livePreview,this._livePreview.on("enter",$.proxy(this.onLivePreviewEnter,this)),this._livePreview.on("exit",$.proxy(this.onLivePreviewExit,this)),this._livePreviewPollId&&delete this._livePreviewPollId):(new Date).getTime()-i<2e3&&(this._livePreviewPollId=Garnish.requestAnimationFrame(t))}var t=e.bind(this),i=(new Date).getTime();t()}},{key:"removeLivePreviewListeners",value:function(){this._livePreviewPollId&&(Garnish.cancelAnimationFrame(this._livePreviewPollId),delete this._livePreviewPollId),this._livePreview&&(this._livePreview.off("enter",$.proxy(this.onLivePreviewEnter,this)),this._livePreview.off("exit",$.proxy(this.onLivePreviewExit,this)),delete this._livePreview)}},{key:"destroy",value:function(){this.removeEventListeners(),this.removeLivePreviewListeners()}},{key:"render",value:function(){this.initToggleFields()&&this.evaluateConditionals()}},{key:"getFieldsSelector",value:function(){var e=[this.settings.fieldsSelector];return this.isLivePreview?e.unshift(this.settings.livePreviewEditorSelector):e.unshift("#"+this.id),e.join(" ")}},{key:"initToggleFields",value:function(){if(this.$fields=$(this.getFieldsSelector()),0===this.$fields.length)return!1;for(var e,t=Object.keys(this.conditionals),i=[],s=0;s<t.length;++s){e=this.conditionals[t[s]][0];for(var n=0;n<e.length;++n)i.push(e[n].fieldId)}var a,r,o,l,d=this;return this.$fields.each(function(){a=$(this),void 0!==a.attr("id")&&(r=a.attr("id").split("-"),r.length<3||r.length>4||(o=r.slice(-2,-1)[0]||!1,o&&(l=Craft.ReasonsPlugin.getFieldIdByHandle(o),l&&a.attr("data-id",l),d.conditionals[l]&&a.attr("data-target",1),i.indexOf(parseInt(l))>-1&&a.attr("data-toggle",1))))}),!0}},{key:"evaluateConditionals",value:function(){var e,t,i,s,n,a,r,o,l,d=this,u=$(this.getFieldsSelector()+'[data-target="1"]');u.removeClass("reasonsHide").removeAttr("aria-hidden").removeAttr("tabindex").each(function(){if(e=$(this),t=d.conditionals[e.data("id")]||!1){for(var u=t.length,h=u,c=0;c<u;++c){i=!0,s=t[c];for(var f=0;f<s.length;++f)if(n=s[f],a=$(d.getFieldsSelector()+'[data-id="'+n.fieldId+'"]'),0!==a.length){switch(o=Craft.ReasonsPlugin.getToggleFieldById(n.fieldId),l=null,o.type){case"Lightswitch":r=a.find("*:input:first"),r.length>0&&(l="1"===r.val()?"true":"false");break;case"Checkboxes":case"RadioButtons":case"ButtonBox_Buttons":case"ButtonBox_Stars":case"ButtonBox_Width":l=a.find("input:checkbox:checked,input:radio:checked").map(function(){return $(this).val()}).get();break;case"Entries":case"Categories":case"Tags":case"Assets":case"Users":case"Calendar_Event":var g=a.find("[data-reasonselementselect]").data("elementSelect")||null;l=g&&g.totalSelected?"notnull":"null";break;default:r=a.find("*:input:first"),l=r.val()}switch($.isArray(l)&&(l=l.join("")),$.isArray(n.value)&&(n.value=n.value.join("")),n.compare){case"!=":l==n.value&&(i=!1);break;case"==":default:l!=n.value&&(i=!1)}if(!i){h--;break}}}h<=0&&e.addClass("reasonsHide").attr("aria-hidden","true").attr("tabindex","-1")}})}},{key:"onLivePreviewEnter",value:function(){this.isLivePreview=!0,this.render()}},{key:"onLivePreviewExit",value:function(){this.isLivePreview=!1,this.render()}},{key:"onInputWrapperClick",value:function(e){$(e.currentTarget).find("input:first").trigger("change")}},{key:"onFieldInputChange",value:function(e){this.evaluateConditionals()}},{key:"onElementSelectChange",value:function(e){Garnish.requestAnimationFrame(this.evaluateConditionals.bind(this))}}]),e}()}]);