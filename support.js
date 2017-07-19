/**
 * Created by 51611 on 17/5/6.
 */
documentWidth=window.screen.availWidth;
//documentWidth=document.body.clientWidth;
gridContainerWidth=0.92*documentWidth;
cellSlideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;
function getPosTop(i,j){
    return cellSpace+i*(cellSlideLength+cellSpace);
}
function getPosLeft(i,j){
    return cellSpace+j*(cellSlideLength+cellSpace);
}
function getNumberBackgroundColor(number){
    switch(number){
        case 2:return '#eee4da';break;
        case 4:return '#ede0c8';break;
        case 6:return '#f2b179';break;
        case 8:return '#f59563';break;
        case 16:return '#f67c5f';break;
        case 32:return '#f65e3b';break;
        case 64:return '#edcf72';break;
        case 128:return '#fddc71';break;
        case 256:return '#edcc61';break;
        case 512:return '#9c0';break;
        case 1024:return '#33b5e5';break;
        case 2048:return '#0079ac';break;
        case 4096:return '#a6c';break;
        case 8192:return '#93c';break;
    }
    return 'black';
}
function getNumberColor(number){
    if(number<=4){
        return '#776e64';
    }
    else{
        return "white";
    }
}
function nospace(board){
    for(i=0;i<4;i++)
        for(j=0;j<4;j++){
            if (board[i][j]==0)
            return false;
        }
    return true;
}
function canMoveLeft( board){
    for(i=0;i<4;i++)
        for(j=1;j<4;j++)
            if(board[i][j]!=0)
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                return true;
    return false;
}
function canMoveRight( board){
    for(i=0;i<4;i++)
        for(j=0;j<3;j++)
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                return true;
    return false;
}
function canMoveUp(board){
    for(i=0;i<4;i++)
        for(j=1;j<4;j++){
            if(board[j][i]!=0)
                if(board[j-1][i]==0||board[j-1][i]==board[j][i])
                return true;
        }
    return false;
}
function canMoveDown(board){
    for (i=0;i<4;i++)
        for(j=0;j<3;j++){
            if(board[j][i]!=0)
                //if(board[j+1][i]==0||board[j+1][i]=board[j][i])
                if(board[j+1][i]==0||board[j+1][i]==board[j][i])
                return true;
        }
    return false;
}
function noBlockHorizontalX(rowX,col1,col2,board){
    for(m=col1+1;m<col2;m++){
        if(board[rowX][m]!=0)
            return false;
    }
    return true;
}

function noBlockHorizontalY(rowY,col1,col2,board){
    for(m=col1+1;m<col2;m++){
        if (board[m][rowY]!=0)
            return false
    }
    return true;
}

function nomove(board){
    if (canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board))
        return false;
    return true;
}