var activityStarted = false;
var intervalTime = 1000;
//---0: row, 1: group, 2: key
var currentHighlight = 0;
var rowCtr = 0;
var groupCtr = 0;
var keyCtr = 0;
var RowTimeOut;
var GroupTimeOut;
var KeyTimeOut;
var isUpperCase = false;

var keyID;
var grpID;
var rowID;
var keyboardLayoutShow= true;
var counter = 0;
var counter1 = 0;

var keyBoard = [
    {
        keys: [["key1","key2","key3","key4","key5","key6","key7","key8","key9","key10"]]
    },
    { 
        keys: [["key11","key12","key13","key14","key15","key16","key17","key18","key19","key20"]]
    },
    {
        keys: [["key21","key22","key23","key24","key25","key26","key27","key28","key29"]]
    },
    {
        keys: [["key30","key31","key32","key33","key34","key35","key36","key37","key38"]]
    },
    {
        keys: [["key39","key40","key41"]]
    }
];

var keyBoard1 = [
    {
        keys: [["key42","key43","key44","key45","key46","key47","key48","key49","key50","key51"]]
    },
    {
        keys: [["key52","key53","key54","key55","key56","key57","key58","key59"]]
    },
    {
        keys: [["key60","key61","key62"]]
    }
];

$( document ).ready(function() {
    $(window).load(function() {
        $('.loadDiv').delay(800).fadeOut(700);
    });
    addEvents();
    
    $( window ).resize(function() {
        setkeybordposition();
    });
    
    $('.keys, #outputArea').attr('tabindex',-1);
    $('#clear').on('click',function(){
        $("#outputArea").html("");
    });

    $("#copy").on('click',function(){
        var $input = $('textarea');
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          var el = $input.get(0);
          var editable = el.contentEditable;
          var readOnly = el.readOnly;
          el.contentEditable = true;
          el.readOnly = false;
          var range = document.createRange();
          range.selectNodeContents(el);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          el.setSelectionRange(0, 999999);
          el.contentEditable = editable;
          el.readOnly = readOnly;
        } else {
          $input.select();
        }
        document.execCommand('copy');
        $input.blur();
    });
    
    setTimeout(function(){
        setkeybordposition();
    }, 500);
    
});

function setkeybordposition(){
    var viewportWidth = $(window).innerWidth();
    if (viewportWidth > 1024) {
       var newLeft = (($(".keyBoard").width() - $('.alphabet').width()) / 2);
    $('.alphabet').css({'left': newLeft}); 
     var newLeft1 = (($(".footer").width() - $('.keybordbuttons').width()) / 2);
    $('.keybordbuttons').css({'left': newLeft1}); 
        var newLeft2 = (($(".punctuation").width() - $('.specialCharacter').width()) / 2)+12;
    $('.specialCharacter').css({'left': newLeft2}); 
   }
}

//Function for Handling Event
function addEvents()
{
    $("#start").on("click", startActivity);
    $("#switch").on("click", switchClicked);

}
//Funtion Close

var highlightInterval = setInterval(updateHighlight,intervalTime);


function startActivity(e)
{
    activityStarted = true;
    $("#switch").removeClass("SwitchDisble").addClass("SwitchEnable");
}

//Funtion for Switch Button
function switchClicked(e)
{
    $(".keys").removeClass("highlight");

    if (currentHighlight == 0)
    {
        clearTimeout(KeyTimeOut);
        console.log($("#"+keyID).text());
        var addContent;

        switch(keyID)

        {
            case 'key41': //Enter On Alphabet Keyboard
                {                   
                    addContent = "\n";
                }      
                break;

            case 'key62': //Enter On SpecialCharacter Keyboard
                {                   
                    addContent = "\n";
                }      
                break;

            case 'key39': //Show SpecialCharacter Keyboard
                { 
                    rowCtr = 0;
                    groupCtr = 0;
                    keyCtr = 0;

                    currentHighlight = 0;
                    clearInterval(highlightInterval);
                    // highlightInterval = setInterval(updateHighlight,intervalTime);                  
                    $(".keyboardLayout").hide();
                    $(".specialCharacter").show();
                      keyboardLayoutShow=false;
                    rowCtr=0;
                    groupCtr = 0;
                    highlightInterval = setInterval(updateHighlight,intervalTime);
                    
                }      
                break;

            case 'key60': //Show Alphabet Keyboard

                {         
                    rowCtr = 0;
                    groupCtr = 0;
                    keyCtr = 0;

                    currentHighlight = 0;
                    clearInterval(highlightInterval);
                    // highlightInterval = setInterval(updateHighlight,intervalTime);    
                    $(".specialCharacter").hide();
                    $(".keyboardLayout").show();
                    keyboardLayoutShow=true;
                    highlightInterval = setInterval(updateHighlight,intervalTime);
                    
                }      
                break;

            case 'key38': //Backspace
                {
                    rowCtr = 0;
                    groupCtr = 0;
                    keyCtr = 0;
                    $('#outputArea').text(
                    function(index, value){
                    return value.substr(0, value.length - 1);
                    })
                }
                break;
                
            case 'key59': //Backspace
                {
                    rowCtr = 0;
                    groupCtr = 0;
                    keyCtr = 0;
                    $('#outputArea').text(
                    function(index, value){
                    return value.substr(0, value.length - 1);
                    })
                }
                break;

            case 'key40': //Space On Alphabet Keyboard              
                {    
                    rowCtr = 0;
                    groupCtr = 0;
                    keyCtr = 0;              
                   addContent = "&nbsp;";                  
                }
                break;

            case 'key61': //Space On SpecialCharacter Keyboard               
                {        
                    rowCtr = 0;
                    groupCtr = 0;
                    keyCtr = 0;          
                   addContent = "&nbsp;";                  
                }
                break;  

            case 'key30': //lowercase to Uppercase 
                { 
                    rowCtr = 0;
                    groupCtr = 0;
                    keyCtr = 0;
                    $(".keys").removeClass("lowercase").addClass("uppercase");
                    isUpperCase = true; 
                }
                break;

            default:
               {
                addContent = $("#"+keyID).text();
                resetHighlight();
               }
    }
          
        if($('.keys').hasClass('uppercase') && !isUpperCase)
         {
            if(addContent){
                addContent = addContent.toUpperCase();
            }
            $(".keys").removeClass("uppercase").addClass("lowercase");
         }
        
        
        $("#outputArea").append(addContent);   
          //resetHighlight()
          // if (currentHighlight = 0){
          //       resetHighlight();
          //    }
        
          
        
    
        $("#copy").removeClass("CopyDisble").addClass("CopyEnable").attr('tabindex',0);
        $("#clear").removeClass("ClearDisble").addClass("ClearEnable").attr('tabindex',0);
        // console.log($("#outputArea").html());
        isUpperCase = false;
    }   
 
}

function resetHighlight()
{
                rowCtr = 0;
                groupCtr = 0;
                keyCtr = 0;
                clearInterval(highlightInterval);
                highlightInterval = setInterval(updateHighlight,intervalTime);  
}
//Function of Highlight
function updateHighlight()
{
    if (activityStarted)
    {
        // console.log("currentHighlight>", currentHighlight, "rowCtr> ", rowCtr, "groupCtr> ", groupCtr, "keyCtr> ", keyCtr);
        switch(currentHighlight)
        {
        
            case 0:
                highlightKey();
                break;
        }
    }
}
//End of Function


function highlightKey()
{
    $(".keys").removeClass("highlight");

    console.log('keyboardLayoutShow'+keyboardLayoutShow)
    if (keyboardLayoutShow){
        keyID = keyBoard[rowCtr].keys[groupCtr][keyCtr];
    
    }else{
        keyID = keyBoard1[rowCtr].keys[groupCtr][keyCtr];
    
    }
    console.log(keyID)
    $("#"+keyID).addClass("highlight");
    KeyTimeOut = setTimeout(function() {
        ++keyCtr;
        // ++counter1;
        if(keyboardLayoutShow && (keyCtr >= keyBoard[rowCtr].keys[groupCtr].length))
        {
            rowCtr++;
            if(rowCtr>=5){
                rowCtr=0;
            }
            keyCtr = 0;
        }else if(!keyboardLayoutShow && (keyCtr >= keyBoard1[rowCtr].keys[groupCtr].length)){
            rowCtr++;
            if(rowCtr>=3){
                rowCtr=0;
            }
            keyCtr = 0;
        }

    }, 500);
    
    if ($("#"+keyID).hasClass('highlight')){
            $("#"+keyID).addClass("selectedkey");
        }else{
            $("#"+keyID).removeClass("selectedkey");            
        }
    
}


