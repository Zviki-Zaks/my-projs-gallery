'use strict';

var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.alert').hide()

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide()
  renderQuest();
  $('.quest').show()
}

function renderQuest() {
  const currQuest = getCurrQuest()
  $('.quest h2').text(`${currQuest.txt}`)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // gLastRes = res
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      showAlert(res)
      setTimeout(()=>{
        $('.quest').hide()
        onRestartGame()}, 1000)
    } else {
      showAlert(res)
      setTimeout(()=>{
        $('.quest').hide()
        $('.new-quest').show()
      },1000)
    }
  } else {
    gLastRes = res
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  if (!newGuess || !newQuest) return
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame();
  $('#newGuess').val('');
  $('#newQuest').val('');
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
  init()
}

function showAlert(res){
  const $elJinnImg = $('.jinn');
  const yesAlert = `Yes, I knew it!`
  const noAlert = `I dont know...teach me!`
  var txt = (res==='yes')? yesAlert : noAlert
  if(res==='no') $elJinnImg.fadeOut(700).fadeIn('slow');
  if(res==='yes') animateRotate(360);
  $('.alert').text(`${txt}`)
  $('.alert').show()
  setTimeout(()=>{$('.alert').hide()}, 1000)
}

function animateRotate(angle) {
  // caching the object for performance reasons
  var $elem = $('.jinn');

  // we use a pseudo object for the animation
  // (starts from `0` to `angle`), you can name it as you want
  $({deg: 0}).animate({deg: angle}, {
      duration: 500,
      step: function(now) {
          // in the step-callback (that is fired each step of the animation),
          // you can use the `now` paramter which contains the current
          // animation-position (`0` up to `angle`)
          $elem.css({
              transform: 'rotate(' + now + 'deg)'
          });
      }
  });
}