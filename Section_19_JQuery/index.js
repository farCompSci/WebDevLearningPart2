// $(document).ready(function(){ // Manipulations after html rendering
//     $("h1").css("color","red")
// })


// Removing Class from the Element
$('h1').removeClass('big-title')

// Toggling a Class to an Element
setTimeout(() => {
    $('h1').toggleClass('big-title margin-50');
}, 1000);


if ($('h1').hasClass('margin-50')){
    console.log('Margin 50 was found');
}

$('button').text('No Click');
setTimeout(()=>{
    $('button').text('Click Me!');
}, 1500)

// Modifying content inside the button 
$('button').html('<em>I am emphasized</em>');

// Getting attribute
console.log($('button').attr('onclick'));

// Settign attribute
$('a').attr('href','facebook.com');

// Adding click listener
$('h1').click(function(){
    $('h1').css('color','purple');
})

// Modifying all the buttons
$('button').click( function() {
    $('button').addClass('prettier-font');
    // $('button').css('display','none');
})

// Keystroke placeholder
// $('input').keydown(function(event){
//     console.log(event.key);
// })

// Making the whole document detect the keypress
$(document).keydown(function(event){
    $('h1').text(event.key);
})

// An even easier way of switching the event listener selected
$('h1').on('mouseover',function(){
    $('h1').css('color','purple');
})

// Adding html elements on the fly
$('h1').before('<h2>Adding something before</h2>');
$('h1').after('<h2>Adding something after</h2>');

// Prepending something and appending something
$('h1').prepend('<button>Prepending something</button>');
$('h1').append('<button>Appending something</button>');

// Removing elements
$('h1 button').remove()

// Hiding and showing elements
$('#hide').on('click',()=>{
    $('#hide').hide();
    // $('h1').fadeOut();
    $('h1').fadeToggle()
});

$('#show').on('click',()=>{
    $('#hide').show();
    // $('h1').fadeIn();
});

$('#toggle').on('click',()=>{
    $('#hide').toggle();
})

