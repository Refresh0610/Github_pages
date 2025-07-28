ver container = '';

function preview(){
  let x = "";
  let html = $(".ql-editor").html(); // .getHTML() は存在しないので .html() を使う
  $('#preview-container').html(html);
  console.log(html);
  /*if(x != "/n"){
    let title = "";
    title += "";*/
  }
}
