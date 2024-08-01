var counter = 1;
var addformupload_status = true;
var counter_pasangan = 1;
var add_form_upload_pasangan_status = true;

function addrow() {
  if (addformupload_status == false) {
    app.dialog.alert('Pastikan form upload terisi');
  } else {
    addformupload_status = false;
    var formupload_html = '<li data-index="'+counter+'" ><ul>'+
    '<li class="item-content item-input">'+
      '<div class="item-inner">'+
        '<div class="row">'+
          '<div class="col-60">'+
            '<div class="item-inner">'+
              '<div class="item-input-wrap">'+
                '<input id="fileid'+counter+'" class="fileid" type="hidden" name="fileid['+counter+']">'+
                '<input class="filecode" id="filecode'+counter+'" type="hidden" readonly="" name="filecode[]">'+
                '<input class="fileurl" id="fileurl'+counter+'" type="text" name="fileurl['+counter+']" placeholder="URL file">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-20 preview_files">'+
          '</div>'+
          '<div class="col-20">'+
            '<a id="'+counter+'" onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</li>'+
    '<li class="item-content item-input">'+
      '<div class="item-inner">'+
        '<div class="row">'+
          '<div class="col-80">'+
            '<div class="item-inner">'+
              '<div class="item-input-wrap">'+
                '<input type="text" class="filedesc" name="keteranganid[]" placeholder="Keterangan File">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-20">'+
            '<a id="'+counter+'" onclick="deleterow(this.id)" class="button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</li></ul></li>';
    $$('#formupload-wrapper-list').append(formupload_html);
    counter++;
  }
}

function add_row_pindah() {
  if (addformupload_status == false) {
    app.dialog.alert('Pastikan form upload terisi');
  } else {
    addformupload_status = false;
    var formupload_html = '<li data-index="'+counter+'" ><ul>'+
    '<li class="item-content item-input">'+
      '<div class="item-inner">'+
        '<div class="row">'+
          '<div class="col-60">'+
            '<div class="item-inner">'+
              '<div class="item-input-wrap">'+
                '<input id="fileid'+counter+'" class="fileid" type="hidden" name="fileid['+counter+']">'+
                '<input class="filecode" id="filecode'+counter+'" type="hidden" readonly="" name="filecode[]">'+
                '<input class="fileurl" id="fileurl'+counter+'" type="text" name="fileurl['+counter+']" placeholder="URL file">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-20 preview_files">'+
          '</div>'+
          '<div class="col-20">'+
            '<a id="'+counter+'" onclick="upload_file_pindah(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</li>'+
    '<li class="item-content item-input">'+
      '<div class="item-inner">'+
        '<div class="row">'+
          '<div class="col-80">'+
            '<div class="item-inner">'+
              '<div class="item-input-wrap">'+
                '<input type="text" name="keteranganid[]" placeholder="Keterangan File">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-20">'+
            '<a id="'+counter+'" onclick="deleterow(this.id)" class="button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</li></ul></li>';
    $$('#formupload-wrapper-list').append(formupload_html);
    counter++;
  }
}

function add_row_pasangan() {
  if (add_form_upload_pasangan_status == false) {
    app.dialog.alert('Pastikan form upload terisi');
  } else {
    add_form_upload_pasangan_status = false;
    var formupload_html = '<li data-index="'+counter_pasangan+'" ><ul>'+
    '<li class="item-content item-input">'+
      '<div class="item-inner">'+
        '<div class="row">'+
          '<div class="col-60">'+
            '<div class="item-inner">'+
              '<div class="item-input-wrap">'+
                '<input id="fileid_pasangan'+counter_pasangan+'" class="fileid_pasangan" type="hidden" name="fileid_pasangan['+counter_pasangan+']">'+
                '<input class="file_code_pasangan" id="file_code_pasangan'+counter+'" type="hidden" readonly="" name="file_code_pasangan[]">'+
                '<input class="fileurl_pasangan" id="fileurl_pasangan'+counter+'" type="text" name="fileurl_pasangan['+counter+']" placeholder="URL file">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-20 preview_files">'+
          '</div>'+
          '<div class="col-20">'+
            '<a id="'+counter_pasangan+'" onclick="upload_file_pasangan(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</li>'+
    '<li class="item-content item-input">'+
      '<div class="item-inner">'+
        '<div class="row">'+
          '<div class="col-80">'+
            '<div class="item-inner">'+
              '<div class="item-input-wrap">'+
                '<input type="text" name="keteranganid_pasangan[]" placeholder="Keterangan File">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-20">'+
            '<a id="'+counter_pasangan+'" onclick="delete_row_pasangan(this.id)" class="delete_row_pasangan button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</li></ul></li>';
    $$('#formupload-wrapper-list-pasangan').append(formupload_html);
    counter_pasangan++;
  }
}

function deleterow(deleteid) {
  app.dialog.confirm('Apakah anda yakin akan menghapusnya?', function() {
    $$('#formupload-wrapper-list [data-index="'+deleteid+'"]').remove();
    addformupload_status = true;
  })
}

function delete_row_pasangan(deleteid) {
  app.dialog.confirm('Apakah anda yakin akan menghapusnya?', function() {
    $$('#formupload-wrapper-list-pasangan [data-index="'+deleteid+'"]').remove();
    add_form_upload_pasangan_status = true;
  })
}

function uploadfile(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'layanan'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .fileid').val(data[0].id);
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .fileurl').val(fileName);
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .filecode').val(data[0].code);
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .preview_files').html('');
        var preview_files ='<a id="'+uploadfileid+'" onclick="preview_files('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .preview_files').html(preview_files);
      });
    },
  });
}

function upload_file_pindah(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'pendaftar'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .fileid').val(data[0].id);
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .fileurl').val(fileName);
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .filecode').val(data[0].code);
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .preview_files').html('');
        var preview_files ='<a id="'+uploadfileid+'" onclick="preview_files_pindah('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('#formupload-wrapper-list li[data-index="'+uploadfileid+'"] .preview_files').html(preview_files);
      });
    },
  });
}

function upload_file_pasangan(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'layanan'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        add_form_upload_pasangan_status = true;
        $$('#formupload-wrapper-list-pasangan li[data-index="'+uploadfileid+'"] .fileid_pasangan').val(data[0].id);
        $$('#formupload-wrapper-list-pasangan li[data-index="'+uploadfileid+'"] .fileurl_pasangan').val(fileName);
        $$('#formupload-wrapper-list-pasangan li[data-index="'+uploadfileid+'"] .file_code_pasangan').val(data[0].code);
        $$('#formupload-wrapper-list-pasangan li[data-index="'+uploadfileid+'"] .preview_files').html('');
        var preview_files ='<a id="'+uploadfileid+'" onclick="preview_files_pasangan('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('#formupload-wrapper-list-pasangan li[data-index="'+uploadfileid+'"] .preview_files').html(preview_files);
      });
    },
  });
}

function uploadpasfoto(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'pas_foto_ktp'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('.pas_foto_path').val(fileName);
        $$('.pas_foto').val(data[0].code);
        var preview_files ='<a id="preview_pas_foto_button" onclick="preview_pas_foto('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_pas_foto').html(preview_files);
      });
    },
  });
}

function uploadfotokpk(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'kartu_pencari_kerja'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('.pas_foto_path').val(fileName);
        $$('.pas_foto').val(data[0].code);
        var preview_files ='<a id="preview_pas_foto_button" onclick="preview_foto_kpk('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_pas_foto').html(preview_files);
      });
    },
  });
}

function uploadfotokua(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'kua'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('.pas_foto_path').val(fileName);
        $$('.pas_foto').val(data[0].code);
        var preview_files ='<a id="preview_pas_foto_button" onclick="preview_foto_kua('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_pas_foto').html(preview_files);
      });
    },
  });
}

function uploadfotokuapasangan(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'kua'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('.pas_foto_pasangan_path').val(fileName);
        $$('.pas_foto_pasangan').val(data[0].code);
        var preview_files ='<a id="preview_pas_foto_button" onclick="preview_foto_kua_pasangan('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_pas_foto_pasangan').html(preview_files);
      });
    },
  });
}

function uploadfototdp(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'iumk'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('.pas_foto_path').val(fileName);
        $$('.pas_foto').val(data[0].code);
        var preview_files ='<a id="preview_pas_foto_button" onclick="preview_foto_tdp('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_pas_foto').html(preview_files);
      });
    },
  });
}

function uploadbuktibayar(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'bukti_bayar_imb'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('.pas_foto_path').val(fileName);
        $$('.pas_foto').val(data[0].code);
        var preview_files ='<a id="preview_pas_foto_button" onclick="preview_bukti_bayar('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_pas_foto').html(preview_files);
      });
    },
  });
}

function uploadfilewaris(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'layanan'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('#formupload-wrapper-list-waris li[data-index="'+uploadfileid+'"] .fileid').val(data[0].id);
        $$('#formupload-wrapper-list-waris li[data-index="'+uploadfileid+'"] .fileurl').val(fileName);
        $$('#formupload-wrapper-list-waris li[data-index="'+uploadfileid+'"] .filecode').val(data[0].code);
        $$('#formupload-wrapper-list-waris li[data-index="'+uploadfileid+'"] .preview_files').html('');
        var preview_files ='<a id="'+uploadfileid+'" onclick="preview_files_waris('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('#formupload-wrapper-list-waris li[data-index="'+uploadfileid+'"] .preview_files').html(preview_files);
      });
    },
  });
}

function uploadfileijinkeramaian(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function(fileEntry) {
      var fileURL = fileEntry.toURL();
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      Attachment.upload(fileEntry, {subdir: 'layanan'}, function(success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('#file_id_spt').val(data[0].id);
        $$('#file_url_spt').val(fileName);
        $$('#file_code_spt').val(data[0].code);
        var preview_files ='<a id="preview_spt_button" onclick="preview_files('+data[0].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_files_spt').html(preview_files);
      });
    },
  });
}

function find_document(id,disable) {
  if (disable == true) {
    var disable = 'disabled';
    var hiding = 'style="visibility:hidden"';
  } else {
    var disable = '';
    var hiding = '';
  }
  counter = 1;
  var attachments_html = '';
  app.request.post(site_url_mobile+'/siurban_mobile/get_attachments/'+id+'/'+tablename,'', function(attachments) {
    for (var i = 0; i < attachments.length; i++) {
      attachments_html += '<li data-index="'+counter+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid'+counter+'" class="fileid" type="hidden" name="fileid['+counter+']">'+
                  '<input class="filecode" id="filecode'+counter+'" type="hidden" readonly="" name="filecode[]" value="'+attachments[i].code+'">'+
                  '<input class="fileurl" id="fileurl'+counter+'" value="'+attachments[i].file_name+'" type="text" name="fileurl['+counter+']" '+disable+' placeholder="URL file">'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
              '<a id="'+counter+'" onclick="preview_files('+attachments[i].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>'+
            '</div>'+
            '<div class="col-20 ">'+
              '<a id="'+counter+'" '+hiding+' onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-20">'+
              '<div class="item-inner">'+
                '<p>Ket : </p>'+
              '</div>'+
            '</div>'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" name="keteranganid[]" value="'+attachments[i].desc+'" '+disable+' placeholder="Keterangan File">'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20">'+
              '<a id="'+counter+'" '+hiding+' onclick="deleterow(this.id)" class="button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li></ul></li>';
      counter++;
    }
    $$('#formupload-wrapper-list').append(attachments_html);
  }, function() {},'json');
}

function find_document_pasangan(id,disable) {
  if (disable == true) {
    var disable = 'disabled';
    var hiding = 'style="visibility:hidden"';
  } else {
    var disable = '';
    var hiding = '';
  }
  counter = 1;
  var attachments_html = '';
  app.request.post(site_url_mobile+'/siurban_mobile/get_attachments_pasangan/'+id+'/'+tablename,'', function(attachments) {
    for (var i = 0; i < attachments.length; i++) {
      attachments_html += '<li data-index="'+counter+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid_pasangan'+counter+'" class="fileid_pasangan" type="hidden" name="fileid_pasangan['+counter+']">'+
                  '<input class="file_code_pasangan" id="file_code_pasangan'+counter+'" type="hidden" readonly="" name="file_code_pasangan[]" value="'+attachments[i].code+'">'+
                  '<input class="fileurl_pasangan" id="fileurl_pasangan'+counter+'" value="'+attachments[i].file_name+'" type="text" name="fileurl_pasangan['+counter+']" '+disable+' placeholder="URL file">'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
              '<a id="'+counter+'" onclick="preview_files('+attachments[i].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>'+
            '</div>'+
            '<div class="col-20 ">'+
              '<a id="'+counter+'" '+hiding+' onclick="upload_file_pasangan(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-20">'+
              '<div class="item-inner">'+
                '<p>Ket : </p>'+
              '</div>'+
            '</div>'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" name="keteranganid_pasangan[]" value="'+attachments[i].desc+'" '+disable+' placeholder="Keterangan File">'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20">'+
              '<a id="'+counter+'" '+hiding+' onclick="delete_row_pasangan(this.id)" class="delete_row_pasangan button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li></ul></li>';
      counter++;
    }
    $$('#formupload-wrapper-list-pasangan').append(attachments_html);
  }, function() {},'json');
}

function preview_files(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_layanan+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_files_pindah(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_pindah+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_pas_foto(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_pas_foto_ktp+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_foto_kpk(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_pas_foto_kpk+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_foto_kua(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_pas_foto_kua+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_foto_kua_pasangan(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_pas_foto_kua+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_foto_tdp(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_pas_foto_tdp+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_bukti_bayar(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_bukti_bayar_imb+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function preview_files_pasangan(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function(image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.popup.create({
        content: '<div class="popup">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_pindah+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function get_berkas(berkas, attachments = null, view = 'edit') {
  var content = '';
  var counter = 0;

  berkas.forEach(function(item, index) {
    let uploadbtn = '';
    if (view == 'edit') {
      uploadbtn = '<div class="col-20">'+
        '<a id="'+index+'" onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;">'+
          '<i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i>'+
        '</a>'+
      '</div>';
    }

    if (Array.isArray(attachments) && attachments[counter] && attachments[counter].desc == item) {
      content += '<li data-index="'+index+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid'+index+'" class="fileid" type="hidden" name="fileid['+index+']" value="'+attachments[counter].id+'">'+
                  '<input class="filecode" id="filecode'+index+'" type="hidden" readonly="" name="filecode[]" value="'+attachments[counter].code+'">'+
                  '<input class="fileurl" id="fileurl'+index+'" type="text" name="fileurl['+index+']" placeholder="URL file" value="'+attachments[counter].file_actual+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
              '<a id="'+index+'" onclick="preview_files('+attachments[counter].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>'+
            '</div>'+
            uploadbtn+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-100">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" class="filedesc" name="filedesc[]" placeholder="Keterangan File" value="'+attachments[counter].desc+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li></ul></li><hr>';

      counter++;
    } else {
      content += '<li data-index="'+index+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid'+index+'" class="fileid" type="hidden" name="fileid['+index+']">'+
                  '<input class="filecode" id="filecode'+index+'" type="hidden" readonly="" name="filecode[]">'+
                  '<input class="fileurl" id="fileurl'+index+'" type="text" name="fileurl['+index+']" placeholder="URL file" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
            '</div>'+
            uploadbtn+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-100">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" class="filedesc" name="filedesc[]" placeholder="Keterangan File" value="'+item+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li></ul></li><hr>';
    }
  });

  $$('#formupload-wrapper-list').html(content);
}

function get_berkas_sktm(berkas, attachments = null, view = 'edit') {
  var content = '';
  var counter = 0;

  berkas.forEach(function(item, index) {
    let uploadbtn = '';
    if (view == 'edit') {
      uploadbtn = '<div class="col-20">'+
        '<a id="'+index+'" onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;">'+
          '<i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i>'+
        '</a>'+
      '</div>';
    }

    if (Array.isArray(attachments) && attachments[counter] && attachments[counter].desc == item) {
      content += '<li data-index="'+index+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid'+index+'" class="fileid" type="hidden" name="fileid['+index+']" value="'+attachments[counter].id+'">'+
                  '<input class="filecode" id="filecode'+index+'" type="hidden" readonly="" name="filecode[]" value="'+attachments[counter].code+'">'+
                  '<input class="fileurl" id="fileurl'+index+'" type="text" name="fileurl['+index+']" placeholder="URL file" value="'+attachments[counter].file_actual+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
              '<a id="'+index+'" onclick="preview_files('+attachments[counter].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>'+
            '</div>'+
            uploadbtn+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-100">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" class="filedesc" name="keteranganid[]" placeholder="Keterangan File" value="'+attachments[counter].desc+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li></ul></li><hr>';

      counter++;
    } else {
      content += '<li data-index="'+index+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid'+index+'" class="fileid" type="hidden" name="fileid['+index+']">'+
                  '<input class="filecode" id="filecode'+index+'" type="hidden" readonly="" name="filecode[]">'+
                  '<input class="fileurl" id="fileurl'+index+'" type="text" name="fileurl['+index+']" placeholder="URL file" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
            '</div>'+
            uploadbtn+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-100">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" class="filedesc" name="keteranganid[]" placeholder="Keterangan File" value="'+item+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li></ul></li><hr>';
    }
  });

  $$('#formupload-wrapper-list').html(content);
}