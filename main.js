/**
 * Created by 51611 on 17/5/6.
 */
var board=new Array();
var score= 0,flag=0;
// var showing= ['子曰','三思','后行','1……','2……','3……','我','喜欢','♥','♥♥','晓丹'];
var showing= ['2','4','8','16','32','64','128','256','512','1024','2048','4096'];
var startX= 0,
    startY= 0,
    endX= 0,
    endY=0;
window.onload=function(){
    $('#box1').removeClass('dn');
    $('#box1').addClass('message-container1');
    $('#box2').addClass('message1');
    setTimeout(function(){
        $('#box1').addClass('dn');
        $('#before').addClass('dn');
    },3000);
    newgame();
}
$(document).ready(function () {
    prepareForMobile();
    });
function prepareForMobile() {
    if(documentWidth>500){
        //整个大方框
        gridContainerWidth=500;
        //padding值
        cellSpace=20;
        //小方块边长
        cellSlideLength=100;
    }
    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', gridContainerWidth*0.02);

    $('.grid-cell').css('width', cellSlideLength);
    $('.grid-cell').css('height', cellSlideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSlideLength);
}
function newgame(){
    //初始化棋盘
    init();
    //在随机两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
    score=0;
    updateScore(score);
}
function init(){
    for(i=0;i<4;i++){
        board[i]=new Array();
        for(j=0;j<4;j++){
            var gridCell=$('#grid-cell-'+i+'-'+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
            board[i][j]=0;
        }
    }
    updateBoardView();
}
function updateBoardView(){
    $('.number-cell').remove();
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$('#number-cell-'+i+'-'+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSlideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSlideLength/2);
            }
            else{
                theNumberCell.css('width',cellSlideLength);
                theNumberCell.css('height',cellSlideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(showing[Math.log2(board[i][j])-1]);
                //showing[Math.log2(board[i][j])-1]
            }
        }
    }
    $('.number-cell').css('line-height',cellSlideLength+'px');
    $('.number-cell').css('line-size',0.6*cellSlideLength+'px');
}
function generateOneNumber(){
    if(nospace(board))
        return false;
    //随机一个位置
    var randx=Math.floor(Math.random()*4);
    var randy=Math.floor(Math.random()*4);
    var time=0;
    while (time<50){
        if(board[randx][randy]==0) break;
        randx=Math.floor(Math.random()*4);
        randy=Math.floor(Math.random()*4);
        time++;
    }
    if(time==50){
        for(i=0;i<4;i++)
            for(j=0;j<4;j++){
                if (board[i][j]==0){
                    randx=i;
                    randy=j;
                }
            }
    }
    //随机一个数字
    //var randNumber=Math.random()<0.5?2:4;
    var randNumber=2;
    //在随机位置显示随机数
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

$(document).keydown(function (event) {
    event.preventDefault();
    switch (event.keyCode){
        case 37://left
            if (moveLeft()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            }
            break;
        case 38://up
            if (moveUp()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            }
            break;
        case 39://right
            if (moveRight()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            }
            break;
        case 40://down
            if (moveDown()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            }
            break;
        default://default
            break;
    }
    //setTimeout( $('#audio1').attr('muted',' '),1000);
});

document.addEventListener('touchstart', function (event) {
    startX=event.touches[0].pageX;
    startY=event.touches[0].pageY;
});
document.addEventListener('touchend', function (event) {
    endX=event.changedTouches[0].pageX;
    endY=event.changedTouches[0].pageY;

    var deltaX=endX-startX;
    var deltaY=endY-startY;

    if(Math.abs(deltaX)<0.3*documentWidth&&Math.abs(deltaY)<0.3*documentWidth)
    return;
    if(Math.abs(deltaX)>=Math.abs(deltaY)){
        if(deltaX>0){
            if (moveRight()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            }//right
        }
        else{
            if (moveLeft()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            }//left
        }
    }
    else{
        if(deltaY<0){
            if (moveUp()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            }//up
        }
        else{
            if (moveDown()){
                setTimeout(generateOneNumber(),210);
                setTimeout(isgameover(),1000);
            } //down
        }
    }

});

function isgameover(){
    if(nomove(board)){
        gameover();
    }
}
function gameover(){
    var nn=Math.ceil(Math.random()*4);
    switch(nn){
        case 1:alert('我们的游戏\n刚刚开始❤');
            break;
        case 2:alert('我不等你谁等你\n我不等你我等谁\n你不等我我等你');
            break;
        case 3: alert('从来不偷东西的你，却爱偷笑\n于是从来不偷东西的我\n便学会了偷看');
            break;
        case 4: alert('你有没有那么一刻，\n抱着某人，\n感觉就像拥有了整个世界。');
        default:
            break;
    }




}
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    for (i = 0; i < 4; i++) {
        for (j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontalX(i, k, j, board)) {
                        //$('#audio2').removeAttr('muted','');
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        //console.log('左边为零的情况');
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontalX(i, k, j, board)&&flag==0) {

                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        //console.log('左边相等的情况');
                        board[i][j] = 0;
                        score+=board[i][k];
                        updateScore(score);
                        flag=1;
                        continue;
                    }
                }
            }
        }
        flag=0;
    }

    setTimeout('updateBoardView()',200);
    return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    for (i = 0; i < 4; i++) {
        for (j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontalX(i, j, k, board)) {
                        //$('#audio2').removeAttr('muted','');
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        //console.log('左边为零的情况');
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontalX(i, j, k, board)&&flag==0) {

                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        //console.log('左边相等的情况');
                        board[i][j] = 0;
                        score+=board[i][k];
                        updateScore(score);
                        flag=1;
                        continue;
                    }
                }
            }
        }
        flag=0;
    }

    setTimeout('updateBoardView()',200);
    return true;
}
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    for (i = 0; i < 4; i++) {
        for (j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                for (k = 0; k < j; k++) {
                    if (board[k][i] == 0 && noBlockHorizontalY(i, k, j, board)) {
                        //$('#audio2').removeAttr('muted','');
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        //console.log('左边为零的情况');
                        board[j][i] = 0;
                        continue;
                    }
                    else if (board[k][i] == board[j][i] && noBlockHorizontalY(i, k, j, board)&&flag==0) {

                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[j][i];
                        //console.log('左边相等的情况');
                        board[j][i] = 0;
                        score+=board[k][i];
                        updateScore(score);
                        flag=1;
                        continue;
                    }
                }
            }
        }
        flag=0;
    }

    setTimeout('updateBoardView()',200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(i=0;i<4;i++)
        for(j=2;j>=0;j--){
            if(board[j][i]!=0){
                for(k=3;k>j;k--){
                    if(board[k][i]==0&&noBlockHorizontalY(i, j, k, board)){
                        //$('#audio2').removeAttr('muted','');
                        showMoveAnimation(j,i,k,i);
                        board[k][i]=board[j][i];
                        board[j][i]=0;
                        continue;
                    }
                    else if(board[k][i]==board[j][i]&&noBlockHorizontalY(i, j, k, board)&&flag==0){

                        showMoveAnimation(j,i,k,i);
                        board[k][i]+=board[j][i];
                        board[j][i]=0;
                        score+=board[i][k];
                        updateScore(score);
                        flag=1;
                        continue;
                    }
                }
            }
            flag=0;
        }
    setTimeout('updateBoardView()',200);
    return true;
}