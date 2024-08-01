function initContactPidana(e, page) {
    console.log('initial contact pidana: ', e, page.route.query)
    loadCurrentUser(page.route.query);
    socketConnect('0');
    loadContactPidana(staffType, '0');
}
function initContactPerdata(e, page) {
    console.log('initial contact perdata: ', e, page.route.query)
    loadCurrentUser(page.route.query);
    socketConnect('1');
    loadContactPerdata(staffType, '1');
}

function initChat(e, page) {
    showChat = true;
    var category = page.route.params.category;
    console.log('initial chat: ', e, page.route.params.id)
    $$('#user-chat-title').html(page.route.query.name)
    $$('#start-consult').html('...');
    selectedUser = page.route.params.id;
    checkSelectedStaff(selectedUser, category)
    loadChatHistory(currentUserID, selectedUser, category).then(json => {
        var data = json.data;
        for (var i in data) {
            $$('#chat .messages').append(getChatItem(data[i], data[i].group));
        }
        var div = document.getElementById('chat');
        scrollToBottom(div);
    })
    $('#start-consult').off().on('click', function () {
        //socket.emit('user_request', page.route.params.id);
        //$$('#start-consult').html('Menunggu').attr('disabled','disabled')
        var state = selectedChat.status;
        var data = {
            from: currentUserID,
            to: selectedUser,
            action: state == 1 ? 'cancel' : 'request',
            category: category
        }
        console.log('category = ' + category)
        authFetch('/users/request-chat', {
            body: toQueryString(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.success) {
                if (json.status == 1) {
                    app.request.post(base_url + '/receiver/notif_chat/'+category+'/' + currentUserID, function(result){});
                }

                $$('#start-consult').html('Batalkan')
                selectedChat.status = json.status;
                if (json.status == 4) {
                    mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak_pidana');
                }
            }
        })
    })
    $('#toolbar-chat .send').off().on('click', function () {
        var msg = $$('#toolbar-chat .text-input').val();
        if (!msg || !msg.trim())
            return false;
        var data = {
            text: msg,
            from: currentUserID,
            to: page.route.params.id,
            session_id: sessionId,
            type: 0,
            category: category
        }
        sendText(data).then(function (json) {
            if (json.success) {
                $$('#chat .messages').append(getChatItem(json.data, 'sent'));
                $$('#toolbar-chat .text-input').val('')
                var div = document.getElementById('chat');
                scrollToBottom(div);

                checkOnlineUser(json.data.to, 'user', '0').then(response => {
                    if (!response.online) {
                        var bot = {
                            'time': json.data.time,
                            'text': 'Mohon maaf OPERATOR kami sekarang sedang OFFLINE.\nMohon kembali lagi beberapa saat.'
                        };
                        $('#chat .messages').append(getChatItem(bot, 'received'));
                        var div = document.getElementById('chat');
                        scrollToBottom(div);
                    }
                });
            }
        })
        //socket.emit('send_message', data);
        //$$('#toolbar-chat .text-input').val('')
    })
}
function initChatPerdata(e, page) {
    showChat = true;
    var category = page.route.params.category;
    console.log('initial chat: ', e, page.route.params.id)
    $$('#user-chat-title').html(page.route.query.name)
    $$('#start-consult-perdata').html('...');
    selectedUser = page.route.params.id;
    checkSelectedStaff(selectedUser, category)
    loadChatHistory(currentUserID, selectedUser, category).then(json => {
        var data = json.data;
        for (var i in data) {
            $$('#chat-perdata .messages').append(getChatItem(data[i], data[i].group));
        }
        var div = document.getElementById('chat-perdata');
        scrollToBottom(div);
    })
    $('#start-consult-perdata').off().on('click', function () {
        //socket.emit('user_request', page.route.params.id);
        //$$('#start-consult').html('Menunggu').attr('disabled','disabled')
        var state = selectedChat.status;
        var data = {
            from: currentUserID,
            to: selectedUser,
            action: state == 1 ? 'cancel' : 'request',
            category: category
        }
        authFetch('/users/request-chat', {
            body: toQueryString(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.success) {
                if (json.status == 1) {
                    app.request.post(base_url + '/receiver/notif_chat/'+category+'/' + currentUserID, function(result){});
                }

                $$('#start-consult-perdata').html('Batalkan')
                selectedChat.status = json.status;
                if (json.status == 4) {
                    mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak_perdata');
                }
            }
        })
    })
    $('#toolbar-chat-perdata .send').off().on('click', function () {
        var msg = $$('#toolbar-chat-perdata .text-input').val();
        if (!msg || !msg.trim())
            return false;
        var data = {
            text: msg,
            from: currentUserID,
            to: page.route.params.id,
            session_id: sessionId,
            type: 0,
            category: category
        }
        sendText(data).then(function (json) {
            if (json.success) {
                $$('#chat-perdata .messages').append(getChatItem(json.data, 'sent'));
                $$('#toolbar-chat-perdata .text-input').val('')
                var div = document.getElementById('chat-perdata');
                scrollToBottom(div);

                checkOnlineUser(json.data.to, 'user', '0').then(response => {
                    if (!response.online) {
                        var bot = {
                            'time': json.data.time,
                            'text': 'Mohon maaf OPERATOR kami sekarang sedang OFFLINE.\nMohon kembali lagi beberapa saat.'
                        };
                        $('#chat-perdata .messages').append(getChatItem(bot, 'received'));
                        var div = document.getElementById('chat-perdata');
                        scrollToBottom(div);
                    }
                });
            }
        })
        //socket.emit('send_message', data);
        //$$('#toolbar-chat .text-input').val('')
    })
}
function initContactPidanaStaff(e, page) {
    console.log('initial contact pidana staff: ', e, page.route.query)
    //if(page.route.query.user)staffId=page.route.query.user;
    loadCurrentUser(page.route.query);
    socketConnectStaff('0');
    loadContactPidanaStaff(currentUserID, '0');
}
function initContactPerdataStaff(e, page) {
    console.log('initial contact pidana staff: ', e, page.route.query)
    //if(page.route.query.user)staffId=page.route.query.user;
    loadCurrentUser(page.route.query);
    socketConnectStaff('1');
    loadContactPerdataStaff(currentUserID, '1');
}

function initChatStaff(e, page) {
    showChat = true;
    var category = page.route.params.category;
    $$('#staff-chat-title').html(page.route.query.name)
    selectedUser = page.route.params.id;
    checkSelectedUser(selectedUser, category)
    loadChatHistory(currentUserID, selectedUser, category).then(json => {
        var data = json.data;
        for (var i in data) {
            $$('#chat-staff .messages').append(getChatItem(data[i], data[i].group));
        }
        var div = document.getElementById('chat-staff');
        scrollToBottom(div);
    })
    $('#approve-consult').off().on('click', function () {
        /*socket.emit('staff_approve_request', {user_id: page.route.params.id, session_id: page.route.query.session_id});
        $$('#approve-consult').hide();
        $$('#toolbar-chat-staff').show();
        $$('#chat-staff').show();*/
        var data = {
            user_id: page.route.params.id,
            session_id: page.route.query.session_id,
            category: category
        };
        authFetch('/users/approve-chat', {
            body: toQueryString(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.success) {
                $$('#approve-consult').hide();
                $$('#toolbar-chat-staff').show();
                $$('#toolbar-chat-staff .text-input').removeAttr('disabled');
                $$('#toolbar-chat-staff .send').css('color', '#333');
                $$('#chat-staff').show();
            }
        });
    })
    $('#toolbar-chat-staff .send').off().on('click', function () {
        var msg = $$('#toolbar-chat-staff .text-input').val();
        if (!msg || !msg.trim())
            return false;
        var data = {
            text: msg,
            from: currentUserID,
            to: page.route.params.id,
            session_id: page.route.query.session_id,
            type: 1,
            category: category
        }
        sendText(data).then(function (json) {
            if (json.success) {
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
                session_id: page.route.query.session_id,
                category: category
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
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                if (json.success) {
                    mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak_pidana_staf');
                }
            });
            console.log('loadContact', currentUserID)
        });
    });
}
function initChatStaffPerdata(e, page) {
    showChat = true;
    var category = page.route.params.category;
    $$('#staff-chat-title').html(page.route.query.name)
    selectedUser = page.route.params.id;
    checkSelectedUser(selectedUser, category)
    loadChatHistory(currentUserID, selectedUser, category).then(json => {
        var data = json.data;
        for (var i in data) {
            $$('#chat-staff-perdata .messages').append(getChatItem(data[i], data[i].group));
        }
        var div = document.getElementById('chat-staff-perdata');
        scrollToBottom(div);
    })
    $('#approve-consult-perdata').off().on('click', function () {
        /*socket.emit('staff_approve_request', {user_id: page.route.params.id, session_id: page.route.query.session_id});
        $$('#approve-consult').hide();
        $$('#toolbar-chat-staff-perdata').show();
        $$('#chat-staff-perdata').show();*/
        var data = {
            user_id: page.route.params.id,
            session_id: page.route.query.session_id,
            category: category
        };
        authFetch('/users/approve-chat', {
            body: toQueryString(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            if (json.success) {
                $$('#approve-consult-perdata').hide();
                $$('#toolbar-chat-staff-perdata').show();
                $$('#toolbar-chat-staff-perdata .text-input').removeAttr('disabled');
                $$('#toolbar-chat-staff-perdata .send').css('color', '#333');
                $$('#chat-staff-perdata').show();
            }
        });
    })
    $('#toolbar-chat-staff-perdata .send').off().on('click', function () {
        var msg = $$('#toolbar-chat-staff-perdata .text-input').val();
        if (!msg || !msg.trim())
            return false;
        var data = {
            text: msg,
            from: currentUserID,
            to: page.route.params.id,
            session_id: page.route.query.session_id,
            type: 1,
            category: category
        }
        sendText(data).then(function (json) {
            if (json.success) {
                $$('#chat-staff-perdata .messages').append(getChatItem(json.data, 'sent'));
                $$('#toolbar-chat-staff-perdata .text-input').val('')
                var div = document.getElementById('chat-staff-perdata');
                scrollToBottom(div);
            }
        })
    })
    $('#stop-consult-perdata').off().on('click', function () {
        app.dialog.confirm('Selesai ?', function () {
            var data = {
                from: currentUserID,
                to: page.route.params.id,
                session_id: page.route.query.session_id,
                category: category
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
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                if (json.success) {
                    mainView.router.navigate('/tipe-d/kejaksaan_negeri/kontak_perdata_staf');
                }
            });
            console.log('loadContact', currentUserID)
        });
    });
}