$(function(){
     function buildHTML(message){
       console.log(message.content);
      if (message.image) {
        var html = 
         `<div class="main-chat__message-list__tag">
            <div class="main-chat__message-list__tag__data">
              <div class="main-chat__message-list__tag__data__name">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__tag__data__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__message-list__tag__message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html = 
         `<div class="main-chat__message-list__tag">
            <div class="main-chat__message-list__tag__data">
              <div class="main-chat__message-list__tag__data__name">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__tag__data__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__message-list__tag__message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html
      };
    }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main-chat__message-list').append(html);
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});      
       $('form')[0].reset();
       $('.main-chat__footer__send-btn').prop("disabled",false);
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
     })
     .always(function() {
      $('.main-chat__footer__send-btn').prop("disabled",false);
     })
})
});