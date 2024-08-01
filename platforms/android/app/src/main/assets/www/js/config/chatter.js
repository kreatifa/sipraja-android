// Chat System Setup
var socket = null;
const CHAT_URL = base_url + ':3001';
var currentUserID = 0;
var currentUserType = 0; // 0 umum, 1 staff
var selectedUser = 0; // ID user kontak yang dipilih
var selectedChat = {}; // Info kontak yang dipilih
var sessionId = 0;
var showChat = false;
var currentUser = {userId: currentUserID};
var chatApiKey = '';
var lastMessageReceived = null;

const scrollToBottom = (node) => {
    node.scrollTop = node.scrollHeight;
}

function encryptData(data)
{
    //var encrypted = CryptoJS.AES.encrypt(data, dataKey);
    //return encrypted;
    //if(typeof data !== 'string')
    //      data = JSON.stringify(data);
    return window.btoa(unescape(encodeURIComponent(data)));
}

function decryptData(data)
{
    //var decrypt = CryptoJS.AES.encrypt(data, dataKey);
    //return decrypt;
    return decodeURIComponent(escape(window.atob(data)));
}

function loadCurrentUser(data)
{
    // if(data.user)currentUserID = data.user; // id user
    // if(data.type)currentUserType = data.type; // 0 user umum, 1 staff
    // if(data.group)staffType=data.group; // group of staff
    currentUserID = iamthedoor.user_id; // id user
    currentUserType = iamthedoor.role_id == 4 ? 0 : 1; // 0 user umum, 1 staff
    staffType = 38; // group of staff
    currentUser = {userId: currentUserID}
    chatApiKey = encryptData(JSON.stringify(currentUser))
}

function toQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function authFetch(url, options=null)
{
    if(!options)
    {
        params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'apikey': chatApiKey
            }
        }
    }
    else{
        params = options;
        if(params.headers)
        {
            params.headers['apikey'] = chatApiKey;
        }
        else{
            params.headers = {'apikey': chatApiKey};
        }
    }
    return fetch(CHAT_URL+url, params);
}

async function loadChatHistory(from, to)
{
    var f = await authFetch('/users/chat-history?from='+from+'&to='+to);
    return f.json();
}

function enableInput(type, enable, userTarget)
{
    if (!userTarget) userTarget = {};
    console.log('userTarget', userTarget);
    if (type == 'staff') {
        if (enable) {
            $$('#toolbar-chat-staff .text-input').removeAttr('disabled');
            $$('#toolbar-chat-staff .send').css('color', '#333');
        } else {
            $$('#toolbar-chat-staff .text-input').attr('disabled', 'disabled');
            $$('#toolbar-chat-staff .send').css('color', 'gray');
        }

        if (userTarget.status == 2) $$('#toolbar-chat-staff').show();
        else $$('#toolbar-chat-staff').hide();
    } else {
        if (enable) {
            $$('#toolbar-chat').show();
            $$('#toolbar-chat .text-input').removeAttr('disabled');
            $$('#toolbar-chat .send').css('color', '#333');
        } else {
            $$('#toolbar-chat .text-input').attr('disabled', 'disabled');
            $$('#toolbar-chat .send').css('color', 'gray');
        }

        if (userTarget.status == 2) $$('#toolbar-chat').show();
        else $$('#toolbar-chat').hide();

        if (enable) $$('#start-consult').removeAttr('disabled');
        else $$('#start-consult').attr('disabled', 'disabled');
    }
}

function getChatItem(data, mode)
{
    var time = moment(data.time);
    if(moment().format('YYYY-MM-DD')==time.format('YYYY-MM-DD'))
        time = time.format('HH:mm');
    else time = time.format('DD/MM/YY HH:mm');
    console.log(time)
    var strHtml = `<div class="message message-${mode}" style="white-space: pre-line">
          <div class="message-content">
            <div class="message-bubble">
              <div class="message-text"><div>${data.text}</div><div style="font-size:12px;text-align:right;">${time}</div></div>
            </div>
          </div>
        </div>`;
    return strHtml;
}

function socketConnect()
{
    socket = io.connect(CHAT_URL);
    socket.on('connect', function() {
        console.log('socket connected')
        socket.on('text', function(text) {
            //alert(text);
        });
        socket.on('staff_disconnected', function(id) {
            //alert('disconnect '+ id);
            console.log('staff_disconnected', id)
            loadContact(staffType);
            if(id == selectedUser){
                $$('#start-consult').html('...');
                enableInput('user', false, selectedChat);
            }
        });
        socket.on('staff_connected', function(id) {
            console.log('staff_connected', id)
            loadContact(staffType);
            if(id == selectedUser){
                checkSelectedStaff(selectedUser)
            }
        });
        socket.on('user_request_approved', function(data) {
            console.log('user_request_approved', data)
            if(data.user_id==currentUserID)
            {
                sessionId = data.session_id;
                $$('#start-consult').html('Konsultasi').removeAttr('disabled').hide();
                $$('#chat .messages').append(getChatItem({text:data.text}, 'received'));
                $$('#toolbar-chat').show();
            }
        });
        socket.on('message_received', function(data) {
            console.log('message_received', data)
            if(selectedUser == data.from && data.time != lastMessageReceived){
                lastMessageReceived = data.time;
                $$('#chat .messages').append(getChatItem(data, 'received'));
                var div = document.getElementById('chat');
                scrollToBottom(div)
            }
            //var div = $$('#chat .messages')[0];
            //console.log(div, div.scrollHeight,div.clientHeight)
            //div.scrollTop = div.scrollHeight;
        });

        socket.on('session_stopped', function(data) {
            console.log('session_stopped', data)
            $$('#chat .messages').append(getChatItem(data, 'received'));
            enableInput('user', false);
        });

        socket.emit('login', currentUserID);
    });
}

async function getOnlineStaff(category)
{
    var f = await authFetch('/users/staff?category='+category);
    return f.json();
}

async function checkOnlineUser(id, type)
{
    var f = await authFetch('/users/cek-online?id='+id+'&from='+currentUserID+'&type='+type);
    return f.json();
}

async function sendText(data)
{
    var f = await authFetch('/users/sendtext', {
        body: toQueryString(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return f.json();
}

function loadContactTemplate(user)
{
    var isOnline = user.status===1;
    var onlineStatus = isOnline?'font-size:12px;color:green':'font-size:12px;color:red';
    var strHtml = `<li>
                <a href="/tipe-d/kejaksaan_negeri/chat/${user.id}?name=${user.display_name}" class="item-link item-content">
                  <div class="item-media"><img class="img-circle img-fluid" style="width: 50px;height: 50px;object-fit: cover; object-position: center;" src="images/user.png"/></div>
                  <div class="item-inner">
                    <div class="item-row">
                      <div class="item-title">${user.display_name}</div>
                      <div class="item-after"><i style="${onlineStatus}" class="fa">&#xf111;</i></div>
                    </div>
                    <div class="item-row">
                        <div class="item-subtitle">${user.role_name}</div>
                        <div class="item-after"></div>
                    </div>
                  </div></a></li>
              <li>`;
    return strHtml;
}

function loadContact(id)
{
    getOnlineStaff(id).then(json =>{
        var strHtml='';
        var data = json.data;
        for(var i in data){
            strHtml+=loadContactTemplate(data[i]);
        }
        $$('#user-contact-list').html(strHtml)
    })
}

function checkSelectedStaff(id)
{
    checkOnlineUser(id, 'staff').then(json => {
        selectedChat = json;
        sessionId = json.session_id;
        if(json.online){

            if(json.status==0 || json.status==3 || json.status==4)$$('#start-consult').html('Konsultasi').removeAttr('disabled');
            else if(json.status==1)$$('#start-consult').html('Batalkan');
            else if(json.status==2){
                enableInput('user', true, selectedChat)
            }
        }
    })
}

// Sisi Staff
async function getUserRequest(id)
{
    var f = await authFetch('/users/request?staff_id='+id);
    return f.json();
}

function checkSelectedUser(id)
{
    checkOnlineUser(id, 'user').then(json => {
        selectedChat = json;
        if(json.online){
            console.log('user is online')
            if(json.status==0 || json.status==3)$$('#approve-consult').html('Konsultasi').removeAttr('disabled');
            else if(json.status==1)$$('#approve-consult').html('Terima').removeAttr('disabled');
            else if(json.status==2){
                enableInput('staff', true, selectedChat)
            }
        }
        else{
            console.log('user is offline')
            if(json.status==0)$$('#approve-consult').html('...').attr('disabled','disabled');
            else if(json.status==1)$$('#approve-consult').html('Terima').attr('disabled','disabled');
            else if(json.status==2){
                $$('#approve-consult').hide();
                enableInput('staff', false, selectedChat)
            }
        }
    })
}

function loadContactStaffTemplate(user)
{
    var time = moment(user.created_on);
    time = time.format('HH:mm');
    var onlineStatus = 'font-size: 12px; color: red;';
    var isOnline = user.status === 1;
    if (isOnline && (user.session_status == 1 || user.session_status == 2))
        onlineStatus = 'font-size: 12px; color:green;';
    var strHtml = `<li>
                <a href="/tipe-d/kejaksaan_negeri/chat-staff/${user.id}?session_id=${user.session_id}&name=${user.display_name}" class="item-link item-content">
                  <div class="item-media"><img class="img-circle img-fluid" style="width: 50px;height: 50px;object-fit: cover; object-position: center;" src="images/user.png"/></div>
                  <div class="item-inner">
                    <div class="item-row">
                      <div class="item-title">${user.display_name}</div>
                      <div class="item-after"><i style="${onlineStatus}" class="fa">&#xf111;</i></div>
                    </div>
                    <div class="item-row">
                        <div class="item-subtitle"></div>
                        <div class="item-after">${time}</div>
                    </div>
                  </div></a></li>
              <li>`;
    return strHtml;
}

function loadContactStaff(id)
{
    getUserRequest(id).then(json =>{
        var strHtml='';
        var data = json.data;
        for(var i in data){
            strHtml+=loadContactStaffTemplate(data[i]);
        }
        $$('#staff-contact-list').html(strHtml)
    })
}

function socketConnectStaff()
{
    socket = io.connect(CHAT_URL);
    socket.on('connect', function() {
        console.log('socket connected')
        socket.on('text', function(text) {
            //alert(text);
        });
        socket.on('user_disconnected', function(id) {
            console.log('user_disconnected', id)
            loadContactStaff(currentUserID);
            enableInput('staff', false, selectedChat)
        });
        socket.on('user_connected', function(id) {
            console.log('user_connected', id)
            loadContactStaff(currentUserID);
            enableInput('staff', id == selectedUser, selectedChat)
        });
        socket.on('user_request_wait', function(id) {
            console.log('user_request_wait', id)
            loadContactStaff(currentUserID);
        });
        socket.on('user_cancel', function(id) {
            mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak-staf');
            loadContactStaff(currentUserID);
        });
        socket.emit('login', currentUserID);
        socket.on('message_received', function(data) {
            console.log('message_received', data)
            if(selectedUser == data.from && data.time != lastMessageReceived){
                lastMessageReceived = data.time;
                $$('#chat-staff .messages').append(getChatItem(data, 'received'));
                var div = document.getElementById('chat-staff');
                scrollToBottom(div)
            }
        });
    });
}
