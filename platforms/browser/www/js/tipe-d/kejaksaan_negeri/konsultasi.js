
function initContact(e, page) {
    console.log('initial contact: ', e, page.route.query)
    loadCurrentUser(page.route.query);
    socketConnect();
    loadContact(staffType);
}

function initChat(e, page) {
    showChat = true;
    console.log('initial chat: ', e, page.route.params.id)
    $$('#user-chat-title').html(page.route.query.name)
    $$('#start-consult').html('...');
    selectedUser = page.route.params.id;
    checkSelectedStaff(selectedUser)
    loadChatHistory(currentUserID, selectedUser).then(json => {
        var data = json.data;
        console.log(data)
        for(var i in data){
            $$('#chat .messages').append(getChatItem(data[i], data[i].group));
        }
        var div = document.getElementById('chat');
        scrollToBottom(div);
    })
    $('#start-consult').off().on('click', function(){
        //socket.emit('user_request', page.route.params.id);
        //$$('#start-consult').html('Menunggu').attr('disabled','disabled')
        var state = selectedChat.status;
        var data = {
            from: currentUserID,
            to: selectedUser,
            action: state == 1 ? 'cancel':'request'
        }
        authFetch('/users/request-chat', {
            body: toQueryString(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(res){
            return res.json();
        }).then(function(json){
            if (json.success) {
                $$('#start-consult').html('Batalkan')
                selectedChat.status = json.status;
                if (json.status == 4) {
                    mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak');
                }
            }
        })
    })
    $('#toolbar-chat .send').off().on('click', function(){
        var msg = $$('#toolbar-chat .text-input').val();
        if (!msg || !msg.trim())
          return false;
        var data = {
            text: msg,
            from: currentUserID,
            to: page.route.params.id,
            session_id: sessionId,
            type: 1
        }
        sendText(data).then(function(json){
            if(json.success)
            {
                $$('#chat .messages').append(getChatItem(json.data, 'sent'));
                $$('#toolbar-chat .text-input').val('')
                var div = document.getElementById('chat');
                scrollToBottom(div);
            }
        })
        //socket.emit('send_message', data);
        //$$('#toolbar-chat .text-input').val('')
    })
}

function initContactStaff(e, page) {
    console.log('initial contact staff: ', e, page.route.query)
    //if(page.route.query.user)staffId=page.route.query.user;
    loadCurrentUser(page.route.query);
    socketConnectStaff();
    loadContactStaff(currentUserID);
}

function initChatStaff(e, page) {
    showChat = true;
    $$('#staff-chat-title').html(page.route.query.name)
    selectedUser = page.route.params.id;
    checkSelectedUser(selectedUser)
    loadChatHistory(currentUserID, selectedUser).then(json => {
        var data = json.data;
        console.log(data)
        for(var i in data){
            $$('#chat-staff .messages').append(getChatItem(data[i], data[i].group));
        }
        var div = document.getElementById('chat-staff');
        scrollToBottom(div);
    })
    $('#approve-consult').off().on('click', function (){
        /*socket.emit('staff_approve_request', {user_id: page.route.params.id, session_id: page.route.query.session_id});
        $$('#approve-consult').hide();
        $$('#toolbar-chat-staff').show();
        $$('#chat-staff').show();*/
        var data = {
            user_id: page.route.params.id,
            session_id: page.route.query.session_id
        };
        authFetch('/users/approve-chat', {
            body: toQueryString(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).then(function(res){
            return res.json();
        }).then(function(json){
            if(json.success){
                $$('#approve-consult').hide();
                $$('#toolbar-chat-staff').show();
                $$('#toolbar-chat-staff .text-input').removeAttr('disabled');
                $$('#toolbar-chat-staff .send').css('color', '#333');
                $$('#chat-staff').show();
            }
        });
    })
    $('#toolbar-chat-staff .send').off().on('click', function (){
        var msg = $$('#toolbar-chat-staff .text-input').val();
        if (!msg || !msg.trim())
          return false;
        var data = {
            text: msg,
            from: currentUserID,
            to: page.route.params.id,
            session_id: page.route.query.session_id,
            type: 1
        }
        sendText(data).then(function(json){
            if(json.success)
            {
                $$('#chat-staff .messages').append(getChatItem(json.data, 'sent'));
                $$('#toolbar-chat-staff .text-input').val('')
                var div = document.getElementById('chat-staff');
                scrollToBottom(div);
            }
        })
    })
    $('#stop-consult').off().on('click', function () {
        app.dialog.confirm('Selesai ?', function () {
            var data = {
                from: currentUserID,
                to: page.route.params.id,
                session_id: page.route.query.session_id
            }
            // console.log('user_stop', data)
            // socket.emit('user_stop', data);
            // mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak-staf');
            authFetch('/users/stop-chat', {
                body: toQueryString(data),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                return res.json();
            }).then(function(json){
                if (json.success) {
                    mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak-staf');
                }
            });
            console.log('loadContact', currentUserID)
        });
    });
}