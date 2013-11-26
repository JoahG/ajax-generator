getFormObject = function() {
	return {
		url: $("#url").val(),
		method: $("#method").val(),
		dataType: $("#datatype").val(),
		data: $("#data").val(),
		request_headers: [
			{
				key: $("#rqhd1_key").val(),
				val: $("#rqhd1_val").val()
			},
			{
				key: $("#rqhd2_key").val(),
				val: $("#rqhd2_val").val()
			},
			{
				key: $("#rqhd3_key").val(),
				val: $("#rqhd3_val").val()
			}
		],
		success: $("#success").val(),
		error: $("#error").val()
	};
};

setRequestHeaders = function(a) {
	t = ''
	for (i in a.request_headers) {
		j = a.request_headers[i];
		t += 'e.setRequestHeader("'+j.key+'", "'+j.val+'");'+(j == a.request_headers[a.request_headers.length-1]?'\n':'')
	}
	return t
}

generateAJAX = function(a) {
	return ['\
		(function() {\n\
			$.ajax({\
				url: "'+a.url+'",\
				dataType: "'+a.dataType+'",\
				type: "'+a.method+'",\
				data: '+a.data+',\
				beforeSend: function(e) {\
					'+setRequestHeaders(a)+'\
				},\
				success: function(e) {\
					'+a.success+'\
				},\
				error: function(e) {\
					'+a.error+'\
				}\
			})\
		})\
	','\
		(function() {<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;$.ajax({<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url: "'+a.url+'",<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dataType: "'+a.dataType+'",<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: "'+a.method+'",<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: '+a.data+',<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beforeSend: function(e) {<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+setRequestHeaders(a)+'<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success: function(e) {<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+a.success+'<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error: function(e) {<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+a.error+'<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>\
		&nbsp;&nbsp;&nbsp;&nbsp;})<br>\
		})<br>\
	']
}

$(document).ready(function() {
	$("#submit").click(function(){
		$("#output").html(generateAJAX(getFormObject())[1])
	});
});