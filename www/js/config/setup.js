// App Backend URL
// var base_url = 'https://sipraja.sidoarjokab.go.id';
var base_url = 'https://sipraja-web.kreatifa.com';
// var base_url = 'http://localhost/svn/sipraja-web/public';
var site_url_mobile = base_url;
var site_url_mobile_layanan = site_url_mobile + '/mobile';
var upload_url = base_url + '/file/upload';
var site_url_files = base_url + '/assets/images/';
var site_url_image_layanan = base_url + '/file/get_file/';
var site_url_image_pas_foto_ktp = base_url + '/file/get_file/';
var site_url_image_pas_foto_kpk = base_url + '/file/get_file/';
var site_url_image_pas_foto_tdp = base_url + '/file/get_file/';
var site_url_image_bukti_bayar_imb = base_url + '/file/get_file/';
var site_url_image_pindah = base_url + '/file/get_file/';
var site_url_image_pas_foto_kua = base_url + '/file/get_file/';
var site_url_image_pendaftaran_kurir = base_url + '/file/get_file/';
var site_url_image_kurma = base_url + '/file/get_file/';

// Camera, Location, Upload & Download Setup
var Attachment = Attachment || new Object();

Attachment.getPicture = function (params, sourceType, mediaType = 'PICTURE') {
  let options = {
    quality: 80,
    targetHeight: 1920,
    targetWidth: 1920,
    sourceType: sourceType,
    allowEdit: false,
    correctOrientation: true,
    destinationType: Camera.DestinationType.FILE_URI,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType[mediaType]
  };
  navigator.camera.getPicture(function (fileURI) {
    if (fileURI.startsWith('/')) {
      fileURI = 'file://' + fileURI;
    }

    window.resolveLocalFileSystemURL(fileURI, function (fileEntry) {
      var fileURL = fileEntry.nativeURL;
      var fileName = fileURL.slice(fileURL.lastIndexOf('/') + 1);
      params.onSuccess(fileURL, fileName);
    }, function () {
      app.dialog.alert('Gagal Mendapatkan File');
    });
  }, function (error) {
    app.dialog.alert('Gagal Mendapatkan File: ' + error);
  }, options);
}

Attachment.openCamera = function (params) {
  let sourceType = Camera.PictureSourceType.CAMERA;
  Attachment.getPicture(params, sourceType);
}

Attachment.openGallery = function (params, mediaType = 'PICTURE') {
  let sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
  Attachment.getPicture(params, sourceType, mediaType);
}

Attachment.upload = function (fileURL, fileName, params, success) {
  let fileParams = { ...params, ...iamthedoor };
  cordova.plugin.http.uploadFile(encodeURI(upload_url),
    fileParams, null,
    fileURL, fileName,
    success, function (response) {
      app.dialog.close();
      if (response.status == '-4') {
        app.dialog.alert('Koneksi ke ' + base_url + ' Gagal/Terputus. Silakan Coba Lagi Nanti.');
      } else {
        app.dialog.alert('An error has occurred: Code = ' + JSON.stringify(response));
      }
    });
}

Attachment.download = function (fileName, download_url) {
  var downloader = new download();
  downloader.Initialize({
    fileSystem: 'file:///storage/emulated/0/Download',
    folder: 'Dokumen SIPRAJA',
    success: function () {
      app.dialog.close();
      app.dialog.alert('Download File Selesai di: /Download/Dokumen SIPRAJA/');
    },
    error: function (err) {
      app.dialog.close();
      app.dialog.alert('Terjadi Kesalahan: ' + err);
    }
  });
  downloader.Get(encodeURI(download_url));
}

// Date & Numeric Setup
function is_user(role_name = 'User') {
  return datauser.role_name.toLowerCase().includes(role_name.toLowerCase()) !== false;
}

function padFloor(number) {
  return (number < 10 ? '0' : '') + number;
}

Date.prototype.toDateFormat = function () {
  let day = padFloor(this.getDate());
  let month = padFloor(this.getMonth() + 1);
  return this.getFullYear() + '-' + month + '-' + day;
}
Date.prototype.toDateIndoFormat = function () {
  let day = padFloor(this.getDate());
  let month = padFloor(this.getMonth() + 1);
  return day + '-' + month + '-' + this.getFullYear();
}
Date.prototype.toMonthString = function () {
  const date = this.toLocaleDateString('id', { year: 'numeric', month: 'long', day: 'numeric' });
  return date.split(' ').join('-');
}
Date.prototype.toTimeFormat = function () {
  let hour = padFloor(this.getHours());
  let minute = padFloor(this.getMinutes());
  let second = padFloor(this.getSeconds());
  return hour + ':' + minute + ':' + second;
}

Date.prototype.toHourFormat = function () {
  let hour = padFloor(this.getHours());
  let minute = padFloor(this.getMinutes());
  return hour + ':' + minute;
}

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

Date.prototype.subDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
}

function toIdrFormat(number) {
  if (isNaN(number)) return;
  return new Intl.NumberFormat('id').format(number);
}

$(function () {
  $(document)
    .on('beforeinput', '.form-numeric', function (e) {
      if (e.originalEvent.inputType != 'deleteContentForward' && e.originalEvent.inputType != 'deleteContentBackward' &&
        (e.originalEvent.data == ' ' || isNaN(e.originalEvent.data))) {
        return false;
      }
    })
    .on('paste', '.form-numeric', function (e) {
      return isNaN(e.originalEvent.clipboardData.getData('text/plain'));
    });
});