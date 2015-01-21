



if (!(typeof MochaWeb === 'undefined')){




  MochaWeb.testOnly(function(){
  	

    describe('DOM tests - Signup form', function() {


  // var formElem = document.forms[0];
  var signupButton = document.getElementById('view-workouts');
  var expect = chai.expect,
	  assert = chai.assert,
	  should = chai.should;

/*  it('Form exists in the DOM', function() {
    expect(formElem).to.not.equal(null);
  });
 
  it('Input field should be set to type email', function() {
    expect(formElem.email.getAttribute('type')).to.equal('email');
  });
 */

  var bodyWeight;
  it('View Workouts button has the right text', function() {
    expect(signupButton.innerHTML).to.equal('View Workouts');
  });

  $('button#view-workouts.btn').click();
  /*setTimeout(function(){ $('button#new-cycle.btn').click()},50);
  setTimeout(function(){ $('input#bodyWeight').val(175)},100 );
  setTimeout(function(){ $('span#next.next.btn.btn-info.pull-right').click()},150 );
  setTimeout(function(){ $('span#next.next.btn.btn-info.pull-right').click()},200 );
  setTimeout(function(){ $('input#hangTimeOne').val(20)},250 );
  setTimeout(function(){ $('input#hangTimeTwo').val(20)},300 );
  setTimeout(function(){ $('input#hangTimeThree').val(20)},350 );
  setTimeout(function(){ $('input#submit.btn.btn-default.pull-right').click()},400 );
  setTimeout(function(){ $('button#start-set.btn').click()},450 );
  setTimeout(function(){ $('button#max-effort.btn').click()},500 );
  setTimeout(function(){ $('button#start-set.btn').click()},550 );
  setTimeout(function(){ $('button#max-effort.btn').click()}, 600 );
  setTimeout(function(){ $('button#start-set.btn').click()},650);
  setTimeout(function(){ $('button#max-effort.btn').click()},700 );*/

$('button#new-cycle.btn').click();

$('input#bodyWeight').val(175);
$('span#next.next.btn.btn-info.pull-right');
$('span#next.next.btn.btn-info.pull-right');
$('input#hangTimeOne');
$('input#hangTimeTwo');
$('input#hangTimeThree')
$('input#submit.btn.btn-default.pull-right');
$('button#start-set.btn').click();
$('button#max-effort.btn').click();
$('button#start-set.btn').click();
$('button#max-effort.btn').click();
$('button#start-set.btn').click();
$('button#max-effort.btn').click();

  it('Grip 1 RM 267.13', function() {
	   setTimeout(function(){expect(document.getElementById('repMax[0]').innerHTML).to.equal('267.13')},1000);
  });
 
	  	

  



});




  });
}
