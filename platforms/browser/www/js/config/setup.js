// App Backend URL
// var base_url = 'https://sipraja.sidoarjokab.go.id';
var base_url = "https://tes-sipraja.global-inovasi.com";
// var base_url = "http://localhost/pemda/public/";
// var base_url = 'http://192.168.1.20/pemda/public';
var upload_url = base_url + "/index.php/file/upload";
var site_url_image_layanan = base_url + "/assets/images/layanan/";
var site_url_image_pas_foto_ktp = base_url + "/assets/images/pas_foto_ktp/";
var site_url_image_pas_foto_kpk =
  base_url + "/assets/images/kartu_pencari_kerja/";
var site_url_image_pas_foto_tdp = base_url + "/assets/images/iumk/";
var site_url_image_bukti_bayar_imb =
  base_url + "/assets/images/bukti_bayar_imb/";
var site_url_image_pindah = base_url + "/assets/images/pendaftar/";
var site_url_image_pas_foto_kua = base_url + "/assets/images/kua/";

// Camera, Location, Upload & Download Setup
var Attachment = Attachment || new Object();

Attachment.getPicture = function (params, sourceType) {
  let options = {
    quality: 50,
    targetHeight: 1024,
    targetWidth: 1024,
    sourceType: sourceType,
    allowEdit: false,
    correctOrientation: true,
    destinationType: Camera.DestinationType.FILE_URI,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
  };
  navigator.camera.getPicture(
    function (fileURI) {
      window.resolveLocalFileSystemURL(
        fileURI,
        function (fileEntry) {
          params.onSuccess(fileEntry);
        },
        function () {
          app.dialog.alert("Gagal Mendapatkan File");
        }
      );
    },
    function (error) {
      app.dialog.alert("Gagal Mendapatkan File: " + error);
    },
    options
  );
};

Attachment.openCamera = function (params) {
  let sourceType = Camera.PictureSourceType.CAMERA;
  Attachment.getPicture(params, sourceType);
};

Attachment.openGallery = function (params) {
  let sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
  Attachment.getPicture(params, sourceType);
};

Attachment.upload = function (fileEntry, params, success) {
  var fileURL = fileEntry.toURL();
  var fileName = fileURL.slice(fileURL.lastIndexOf("/") + 1);
  cordova.plugin.http.uploadFile(
    encodeURI(upload_url),
    params,
    null,
    fileURL,
    fileName,
    success,
    function (response) {
      app.dialog.alert(
        "An error has occurred: Code = " + JSON.stringify(response)
      );
    }
  );
};

Attachment.download = function (fileName, download_url) {
  var downloader = new download();
  downloader.Initialize({
    fileSystem: "file:///storage/emulated/0/Download",
    folder: "Dokumen SIPRAJA",
    success: function () {
      app.dialog.close();
      app.dialog.alert("Download File Selesai di: /Download/Dokumen SIPRAJA/");
    },
    error: function (err) {
      app.dialog.close();
      app.dialog.alert("Terjadi Kesalahan: " + err);
    },
  });
  downloader.Get(encodeURI(download_url));
};

// Date & Numeric Setup
function padFloor(number) {
  return (number < 10 ? "0" : "") + number;
}

Date.prototype.toDateFormat = function () {
  let day = padFloor(this.getDate());
  let month = padFloor(this.getMonth() + 1);
  return this.getFullYear() + "-" + month + "-" + day;
};

Date.prototype.toDateIndoFormat = function () {
  let day = padFloor(this.getDate());
  let month = padFloor(this.getMonth() + 1);
  return day + "-" + month + "-" + this.getFullYear();
};

Date.prototype.toTimeFormat = function () {
  let hour = padFloor(this.getHours());
  let minute = padFloor(this.getMinutes());
  let second = padFloor(this.getSeconds());
  return hour + ":" + minute + ":" + second;
};

Date.prototype.toHourFormat = function () {
  let hour = padFloor(this.getHours());
  let minute = padFloor(this.getMinutes());
  return hour + ":" + minute;
};

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.subDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

function toIdrFormat(number) {
  return new Intl.NumberFormat("id").format(number);
}
