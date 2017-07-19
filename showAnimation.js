/**
 * Created by 51611 on 17/5/6.
 */
function showNumberWithAnimation(i,j,randNumber){
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    board[i][j]=randNumber;
    //console.log(showing[Math.log2(randNumber)-1]);
    numberCell.text(showing[Math.log2(randNumber)-1]);

    numberCell.animate({
        width:cellSlideLength,
        height:cellSlideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },200)
}
function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}

function updateScore(score){
    //$('#score').fadeOut(100);
    $('#score').text(score);
    //$('#score').fadeIn(200);
    //console.log(score);
}