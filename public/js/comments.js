
var perpage = 4;//每一页显示多少条
var page = 1;  //当前页数
var pages;//总页数
var comments = [];
$('#messageBtn').on('click',function(){
	$.ajax({
		type: 'POST',
		url: '/api/comments/post',
		data:{
			contentid: $('#contentId').val(),
			content: $('#messageContent').val()
		},
		success:function(responseData){
            $('#messageContent').val('');
            console.log(responseData.data);
            comments = responseData.data.comments.reverse();
            renderComment();
		}
	})
});

//每次页面重载获取评论内容
$.ajax({
    url: '/api/comments',
    data: {
        contentid: $('#contentId').val()
    },
    success: function(responseData) {
        comments = responseData.data.reverse();
        renderComment();
    }
});


$('.pager').delegate('a','click',function(){
	if($(this).parent().hasClass('previous')){
		page--;
	}else{
		page++;
    }
    renderComment();
})

function renderComment(){
	 $('#messageCount').html(comments.length);
	 pages = Math.max(Math.ceil(comments.length / perpage),1);
	 var start = Math.max(0,(page-1)*perpage);
	 var end = Math.min(start + perpage,comments.length);
	 var $lis = $('.pager li');
	 $lis.eq(1).html(page+'/'+pages);
	 if(page <= 1){
	 	page = 1;
	 	$lis.eq(0).html('<span>没有上一页了</span>');
	 }else{
	 	$lis.eq(0).html('<a href="javascript:;">上一页</a>');
	 }
	 if(page >= pages){
	 	page = pages;
	 	$lis.eq(2).html('<span>没有下一页了</span>');
	 }else{
	 	$lis.eq(2).html('<a href="javascript:;">下一页</a>');
	 }
	 if(comments.length == 0){
        $('.messageList').html('<div class="messageBox"><p>还没有留言</p></div>');
	 }else{
	 	var html='';
	    for(var i=start;i<end;i++){
	        html += '<div class="messageBox">'+
	     	'<p class="name clear"><span class="fl">'+comments[i].username+
	     	'</span><span class="fr">'+FormDate(comments[i].postTime)+'</span></p><p>'+comments[i].content+'</p>'
	     	+'</div>';
	    }
	    $('.messageList').html(html);
	 }
}

//格式化一下时间
function FormDate(time){
	var date1 = new Date(time);
	return date1.getFullYear()+'年'+(date1.getMonth()+1)+'月'+date1.getDate()+'日'+date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds();
}