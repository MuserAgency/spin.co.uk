!function(a){Craft.EntryDraftEditor=Garnish.Base.extend({$revisionBtn:null,$editBtn:null,$nameInput:null,$saveBtn:null,$spinner:null,draftId:null,draftName:null,draftNotes:null,hud:null,loading:!1,init:function(t,s,e){this.draftId=t,this.draftName=s,this.draftNotes=e,this.$revisionBtn=a("#revision-btn"),this.$editBtn=a("#editdraft-btn"),this.addListener(this.$editBtn,"click","showHud")},showHud:function(){if(this.hud)this.hud.show();else{var t=a("<div/>"),s=a('<div class="field"><div class="heading"><label for="draft-name">'+Craft.t("Draft Name")+"</label></div></div>").appendTo(t),e=a('<div class="input"/>').appendTo(s);this.$nameInput=a('<input type="text" class="text fullwidth" id="draft-name"/>').appendTo(e).val(this.draftName);s=a('<div class="field"><div class="heading"><label for="draft-notes">'+Craft.t("Notes")+"</label></div></div>").appendTo(t),e=a('<div class="input"/>').appendTo(s);this.$notesInput=a('<textarea class="text fullwidth" id="draft-notes" rows="2"/>').appendTo(e).val(this.draftNotes);var i=a('<div class="hud-footer"/>').appendTo(t),n=a('<div class="buttons right"/>').appendTo(i);this.$saveBtn=a('<input type="submit" class="btn submit disabled" value="'+Craft.t("Save")+'"/>').appendTo(n),this.$spinner=a('<div class="spinner hidden"/>').appendTo(n),this.hud=new Garnish.HUD(this.$editBtn,t,{onSubmit:a.proxy(this,"save")}),new Garnish.NiceText(this.$notesInput),this.addListener(this.$notesInput,"keydown","onNotesKeydown"),this.addListener(this.$nameInput,"textchange","checkValues"),this.addListener(this.$notesInput,"textchange","checkValues"),this.hud.on("show",a.proxy(this,"onHudShow")),this.hud.on("hide",a.proxy(this,"onHudHide")),this.hud.on("escape",a.proxy(this,"onHudEscape")),this.onHudShow()}Garnish.isMobileBrowser(!0)||this.$nameInput.trigger("focus")},onHudShow:function(){this.$editBtn.addClass("active")},onHudHide:function(){this.$editBtn.removeClass("active")},onHudEscape:function(){this.$nameInput.val(this.draftName)},onNotesKeydown:function(t){t.keyCode==Garnish.RETURN_KEY&&(t.preventDefault(),this.hud.submit())},hasAnythingChanged:function(){return this.$nameInput.val()!=this.draftName||this.$notesInput.val()!=this.draftNotes},checkValues:function(){return this.$nameInput.val()&&this.hasAnythingChanged()?(this.$saveBtn.removeClass("disabled"),!0):(this.$saveBtn.addClass("disabled"),!1)},save:function(){if(!this.loading)if(this.checkValues()){this.loading=!0,this.$saveBtn.addClass("active"),this.$spinner.removeClass("hidden");var e={draftId:this.draftId,name:this.$nameInput.val(),notes:this.$notesInput.val()};Craft.postActionRequest("entryRevisions/updateDraftMeta",e,a.proxy(function(t,s){this.loading=!1,this.$saveBtn.removeClass("active"),this.$spinner.addClass("hidden"),"success"==s&&(t.success?(this.$revisionBtn.text(e.name),this.$revisionBtn.data("menubtn").menu.$options.filter(".sel").text(e.name),this.draftName=e.name,this.draftNotes=e.notes,this.checkValues(),this.hud.hide()):this.shakeHud())},this))}else this.shakeHud()},shakeHud:function(){Garnish.shake(this.hud.$hud)}})}(jQuery);
//# sourceMappingURL=EntryDraftEditor.js.map