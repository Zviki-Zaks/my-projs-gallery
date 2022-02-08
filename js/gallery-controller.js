'use strict'

$(document).ready(init)

function init() {
    renderProjs()
    $('.submit-btn').click(onSandMsg)
    $('.nav-link-contact').click(openCanvas)
}

function renderProjs() {
    const projs = getProjsToDisplay()
    var strHTMLs = projs.map(proj => {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
                    <a class="portfolio-link" data-toggle="modal"
                       href="#portfolioModal" onclick="renderModal('${proj.id}')">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
                    </a>
                    <div class="portfolio-caption">
                        <h4>${proj.name}</h4>
                        <p class="text-muted">${proj.title}</p>
                    </div>
                </div>`})
    $('.projs-container').html(strHTMLs.join(''))
}

function renderModal(projId) {
    // console.log(projId);
    const proj = getProjById(projId)
    var $elModal = $('.modal-body')
    // console.log(proj);
    // console.log($elModal);
    $elModal.find('h2').text(proj.name)
    $elModal.find('.item-intro').text(proj.title)
    $elModal.find('img').attr('src', `img/portfolio/${proj.id}-full.jpg`)
    $elModal.find('.date-cont').text(proj.publishedAt)
    $elModal.find('.labels-cont').text(proj.labels.join(' || '))
}

function onSandMsg() {
    const myEmailAdd = 'zvikizax@gmail.com'
    const emailUserAdd = $('#user-email').val()
    const msgSubject = $('.subject').val()
    const msgBody = $('#msg-body').val() + ' from: ' + emailUserAdd
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmailAdd}&su=${msgSubject}&body=${msgBody}`
    window.open(url)
    $('#user-email').val('')
    $('.subject').val('')
    $('#msg-body').val('')
    openCanvas()
}