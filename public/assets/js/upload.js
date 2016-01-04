/*! formstone v0.8.35 [upload.js] 2015-12-28 | MIT License | formstone.it */

!function(a,b){"use strict";function c(a){if(b.support.file){var c="";a.label!==!1&&(c+='<div class="'+u.target+'">',c+=a.label,c+="</div>"),c+='<input class="'+u.input+'" type="file"',a.multiple&&(c+=" multiple"),c+=">",this.addClass(u.base).append(c),a.$input=this.find(t.input),a.queue=[],a.total=0,a.uploading=!1,a.disabled=!0,a.aborting=!1,this.on(v.click,t.target,a,i).on(v.dragEnter,a,k).on(v.dragOver,a,l).on(v.dragLeave,a,m).on(v.drop,a,n),a.$input.on(v.change,a,j),h.call(this,a)}}function d(a){b.support.file&&(a.$input.off(v.namespace),this.off([v.click,v.dragEnter,v.dragOver,v.dragLeave,v.drop].join(" ")).removeClass(u.base).html(""))}function e(b,c){var d;b.aborting=!0;for(var e in b.queue)b.queue.hasOwnProperty(e)&&(d=b.queue[e],("undefined"===a.type(c)||c>=0&&d.index===c)&&(d.started&&!d.complete?d.transfer.abort():f(b,d,"abort")));b.aborting=!1,q(b)}function f(a,b,c){b.error=!0,a.$el.trigger(v.fileError,[b,c]),a.aborting||q(a)}function g(a){a.disabled||(this.addClass(u.disabled),a.$input.prop("disabled",!0),a.disabled=!0)}function h(a){a.disabled&&(this.removeClass(u.disabled),a.$input.prop("disabled",!1),a.disabled=!1)}function i(a){w.killEvent(a);var b=a.data;b.disabled||b.$input.trigger(v.click)}function j(a){w.killEvent(a);var b=a.data,c=b.$input[0].files;!b.disabled&&c.length&&o(b,c)}function k(a){w.killEvent(a);var b=a.data;b.$el.addClass(u.dropping).trigger(v.fileDragEnter)}function l(a){w.killEvent(a);var b=a.data;b.$el.addClass(u.dropping).trigger(v.fileDragOver)}function m(a){w.killEvent(a);var b=a.data;b.$el.removeClass(u.dropping).trigger(v.fileDragLeave)}function n(a){w.killEvent(a);var b=a.data,c=a.originalEvent.dataTransfer.files;b.$el.removeClass(u.dropping),b.disabled||o(b,c)}function o(a,b){for(var c=[],d=0;d<b.length;d++){var e={index:a.total++,file:b[d],name:b[d].name,size:b[d].size,started:!1,complete:!1,error:!1,transfer:null};c.push(e),a.queue.push(e)}a.$el.trigger(v.queued,[c]),a.autoUpload&&p(a)}function p(a){a.uploading||(y.on(v.beforeUnload,function(){return a.leave}),a.uploading=!0,a.$el.trigger(v.start,[a.queue])),q(a)}function q(a){var b=0,c=[];for(var d in a.queue)!a.queue.hasOwnProperty(d)||a.queue[d].complete||a.queue[d].error||c.push(a.queue[d]);a.queue=c;for(var e in a.queue)if(a.queue.hasOwnProperty(e)){if(!a.queue[e].started){var f=new FormData;f.append(a.postKey,a.queue[e].file);for(var g in a.postData)a.postData.hasOwnProperty(g)&&f.append(g,a.postData[g]);r(a,f,a.queue[e])}if(b++,b>=a.maxQueue)return;d++}0===b&&(y.off(v.beforeUnload),a.uploading=!1,a.$el.trigger(v.complete))}function r(b,c,d){c=b.beforeSend.call(x,c,d),d.size>=b.maxSize||c===!1||d.error===!0?f(b,d,c?"size":"abort"):(d.started=!0,d.transfer=a.ajax({url:b.action,data:c,dataType:b.dataType,type:"POST",contentType:!1,processData:!1,cache:!1,xhr:function(){var c=a.ajaxSettings.xhr();return c.upload&&c.upload.addEventListener("progress",function(a){var c=0,e=a.loaded||a.position,f=a.total;a.lengthComputable&&(c=Math.ceil(e/f*100)),b.$el.trigger(v.fileProgress,[d,c])},!1),c},beforeSend:function(){b.$el.trigger(v.fileStart,[d])},success:function(a){d.complete=!0,b.$el.trigger(v.fileComplete,[d,a]),q(b)},error:function(a,c,e){f(b,d,e)}}))}var s=b.Plugin("upload",{widget:!0,defaults:{action:"",autoUpload:!0,beforeSend:function(a){return a},customClass:"",dataType:"html",label:"Drag and drop files or click to select",leave:"You have uploads pending, are you sure you want to leave this page?",maxQueue:2,maxSize:5242880,multiple:!0,postData:{},postKey:"file"},classes:["input","target","multiple","dropping","disabled"],methods:{_construct:c,_destruct:d,disable:g,enable:h,abort:e,start:p}}),t=s.classes,u=t.raw,v=s.events,w=s.functions,x=b.window,y=b.$window;v.complete="complete",v.fileComplete="filecomplete",v.fileDragEnter="filedragenter",v.fileDragLeave="filedragleave",v.fileDragOver="filedragover",v.fileError="fileerror",v.fileProgress="fileprogress",v.fileStart="filestart",v.start="start",v.queued="queued"}(jQuery,Formstone);