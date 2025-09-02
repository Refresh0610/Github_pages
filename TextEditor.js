document.addEventListener('DOMContentLoaded', init);

function init(){
  const points = ["start", "end"];
  
  for(let i = 0; i < 2;){
    updateYearOption(points[i]);
    updateMonthOption(points[i])
    updateDaysOption(points[i]);
  };
};

function verify() {//optionの値を取得
  const monthSelect = document.getElementById("month");
  const daysSelect = document.getElementById("day");
  const yearSelect = document.getElementById("year");

  const monthValue = monthSelect.value;
  const dayValue = daysSelect.value;
  const yearValue = yearSelect.value;

  //選択された値をコンソールに表示
  alert(`選択された日程は ${monthValue}月 ${dayValue}日 ${yearValue}年です。`);
};

function updateDaysOption(point){
  const monthSelect = document.getElementById(point + "_month");
  const daysSelect = document.getElementById(point + "_day");
  const yearSelect = document.getElementById(point + "_year");
  const yearValue = yearSelect.value;
  //optionをリセット
  daysSelect.innerHTML = ""; 
  //月毎の日数を格納
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(isLeapYear(yearValue)){
    days[1] = 29;
  }
  
  const monthValue = monthSelect.value - 1;
  for(let i = 1; i <= days[monthValue]; i++){
    const option = document.createElement("option");
    option.className = "option";
    option.value = i;
    option.textContent = `${i}`; //表示テキスト
    daysSelect.appendChild(option);//selectに追加
  }
}

function updateMonthOption(point){
  const monthSelect = document.getElementById(point + "_month");

  for(let i = 1; i <= 12; i++){
    const option =document.createElement("option");
    option.className = "option";
    option.id = "month_option";
    option.value = i;
    option.textContent = `${i}`; //表示テキスト
    monthSelect.appendChild(option);//start_dateに追加
  }
}

function updateYearOption(point){
  const yearSelect = document.getElementById(point + "_year");

  const date = new Date();
  const thisYear = date.getFullYear();
  const maxYear = thisYear + 5;

  for(let i = thisYear; i <= maxYear; i++){
    const option = document.createElement("option");
    option.className = "option";
    option.value = i;
    option.textContent = `${i}`; //表示テキスト
    yearSelect.appendChild(option);
  }
}

function isLeapYear(y){
  return y % 4 == 0 && (y % 100 != 0 || y % 400 == 0);
}

var container = '';

function preview(){
  let x = "";
  let html = $(".ql-editor").html(); // .getHTML() は存在しないので .html() を使う
  $('.editor-boad').toggleClass('inactive');
  $('#preview').toggleClass('inactive');
  $('#re-edit').toggleClass('active');
  $('.preview-boad').toggleClass('active');
  $('.preview-container').toggleClass('active');
  $('.preview-container').html(html);
  alert(html);
  /*if(x != "/n"){
    let title = "";
    title += "";
  }*/
}

function re_edit(){
  let x = "";
  let html = $(".ql-editor").html();
  $('.editor-boad').toggleClass('inactive');
  $('#preview').toggleClass('inactive');
  $('#re-edit').toggleClass('active');
  $('.preview-boad').toggleClass('active');
  $('.preview-container').toggleClass('active');
  alert(html);
  /*if(x != "/n"){
    let title = "";
    title += "";
  }*/
}
