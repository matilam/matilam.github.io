function scrollsequenceMainFunction(){if(document.getElementsByClassName('scrollsequence-wrap')[0]){"use strict";let SHOWMARKERS=ssqInput.debug.includes('markers');let DEBUG=ssqInput.debug.includes('debug');let PRELOADDEBUG=ssqInput.debug.includes('preloaddebug');let ssqCalc,ssqImg;let ssqCur={};let ssqInit={};let ssqHtml=[];ssqInput.scLength=ssqInput.sc.length;DEBUG&&console.log('0.00 ms ssqInput:',ssqInput);function initSsqCur(){ssqCur.lastPImgRenderedOnSc=[];ssqCur.logObj={renderSuccess:[],renderRestrict:[],}
for(let s=0;s<ssqInput.scLength;s++){ssqCur.lastPImgRenderedOnSc[s]=[]}}initSsqCur();function initSsqHtml(){let t0=performance.now();let allScEl=document.getElementsByClassName('scrollsequence-wrap');for(let s=0;s<ssqInput.scLength;s++){ssqHtml[s]={wrap:allScEl[s],sticky:allScEl[s].getElementsByClassName('scrollsequence-sticky')[0],canvas:allScEl[s].getElementsByClassName('scrollsequence-canvas')[0],};ssqHtml[s].page=[];ssqHtml[s].pageLen=allScEl[s].getElementsByClassName('scrollsequence-page').length;for(let i=0;i<ssqHtml[s].pageLen;i++){ssqHtml[s].page[i]=allScEl[s].getElementsByClassName('scrollsequence-page')[i];ssqHtml[s].page[i].curentImageNo=0}}
let t1=performance.now();let tdelta=(t1-t0).toFixed(2);DEBUG&&console.log(tdelta,'ms ssqHtml: ',ssqHtml)}initSsqHtml();function initSsqCanvas(){let t0=performance.now();for(let s=0;s<ssqInput.scLength;s++){ssqHtml[s].canvas.style.zIndex=ssqInput.sc[s].zIndex;ssqHtml[s].canvas.style.opacity=ssqInput.sc[s].imageOpacity;ssqHtml[s].context=ssqHtml[s].canvas.getContext("2d")
ssqHtml[s].canvas.aaaDPR=(ssqInput.sc[s].canvasDPR==='quality')?window.devicePixelRatio:1}
let t1=performance.now();let tdelta=(t1-t0).toFixed(2);DEBUG&&console.log(tdelta,'ms Canvas Init: ')}initSsqCanvas();function initSsqImg(){let t0=performance.now();ssqImg={objArray:[],absoluteOrder:[],totalImageNo:0,priorityImagesPreloadedCount:0,nonPriorityImagesPreloadedCount:0,priorityLoadingFinished:!1,nonPriorityLoadingFinished:!1,zfirstDrawCalled:!1,};let absCountImg=0;for(let s=0;s<ssqInput.scLength;s++){ssqImg.objArray[s]=[];for(let i=0;i<ssqInput.sc[s].pageLength;i++){ssqImg.totalImageNo=ssqImg.totalImageNo+ssqInput.sc[s].page[i].imagesLength
ssqImg.objArray[s][i]=[];for(let j=0;j<ssqInput.sc[s].page[i].imagesLength;j++){ssqImg.objArray[s][i][j]=new Image();ssqImg.absoluteOrder[absCountImg]=[s,i,j];absCountImg=absCountImg+1}}}
let t1=performance.now();let tdelta=(t1-t0).toFixed(2);DEBUG&&console.log(tdelta,'ms ssqImg: ',ssqImg)}initSsqImg();function ssqCalcCalculate(){let t0=performance.now();ssqCalc={}
ssqCalc.sc=[]
for(let s=0;s<ssqInput.scLength;s++){ssqCalc.sc[s]={}
ssqCalc.sc[s].absBegin=document.getElementsByClassName('scrollsequence-wrap')[s].getBoundingClientRect().top+window.scrollY;ssqCalc.sc[s].absEnd=ssqCalc.sc[s].absBegin+ssqInput.sc[s].scSpacer
ssqCalc.sc[s].leftDistance=document.getElementsByClassName('scrollsequence-wrap')[s].getBoundingClientRect().left+document.documentElement.scrollLeft;ssqCalc.sc[s].page=[]
for(let i=0;i<ssqInput.sc[s].pageLength;i++){ssqCalc.sc[s].page[i]={}
ssqCalc.sc[s].page[i].absBegin=ssqCalc.sc[s].absBegin+ssqInput.sc[s].page[i].pageAbsBegin;ssqCalc.sc[s].page[i].absEnd=ssqCalc.sc[s].absBegin+ssqInput.sc[s].page[i].pageAbsEnd}}
let t1=performance.now();let tdelta=(t1-t0).toFixed(2);DEBUG&&console.log(tdelta,'ms ssqCalc:',ssqCalc)}function ssqCurCalculate(scroll_pos){let t0=performance.now();ssqCur.isActive=!1
for(let s=0;s<ssqInput.scLength;s++){if(scroll_pos>=ssqCalc.sc[s].absBegin&&scroll_pos<ssqCalc.sc[s].absEnd){ssqCur.isActive=!0
ssqCur.sc=s
for(let i=0;i<ssqInput.sc[s].pageLength;i++){if(scroll_pos>=ssqCalc.sc[s].page[i].absBegin&&scroll_pos<ssqCalc.sc[s].page[i].absEnd){ssqCur.page=i
ssqCur.pageProgress=(scroll_pos-ssqCalc.sc[s].page[i].absBegin)/(ssqInput.sc[s].page[i].pageSpacer)
ssqCur.image=Math.round(ssqCur.pageProgress*(ssqInput.sc[s].page[i].imagesLength-1))
ssqCur.pixel=scroll_pos;break}}
break}}
if(!ssqCur.isActive){ssqCur.isActive=!1;ssqCur.sc;ssqCur.page;ssqCur.pageProgress;ssqCur.image;ssqCur.pixel=scroll_pos}
let t1=performance.now();let tdelta=(t1-t0).toFixed(2);DEBUG&&console.log(tdelta,'ms ssqCur(',scroll_pos,'):',ssqCur)}
function ssqInitCalculate(){let t0=performance.now();ssqInit.aascr=window.scrollY;ssqInit.active={}
ssqInit.active.sc=ssqCur.sc;ssqInit.active.page=ssqCur.page;ssqInit.active.pageProgress=ssqCur.pageProgress;ssqInit.active.image=ssqCur.image;ssqInit.active.pixel=ssqCur.pixel;ssqInit.active.isActive=ssqCur.isActive;if(ssqInit.active.isActive){ssqInit.active.curAbsImg=ssqUtilsConvToAbs(ssqInit.active.sc,ssqInit.active.page,ssqInit.active.image)}
ssqInit.notActive=[];for(let s=0;s<ssqInput.scLength;s++){if(window.scrollY<ssqCalc.sc[s].absBegin){ssqInit.notActive.push({type:'next',distance:Math.abs(window.scrollY-ssqCalc.sc[s].absBegin),sc:s,page:0,image:0,pageProgress:0,})}
if(window.scrollY>ssqCalc.sc[s].absEnd){ssqInit.notActive.push({type:'prev',distance:Math.abs(window.scrollY-ssqCalc.sc[s].absEnd),sc:s,page:ssqInput.sc[s].pageLength-1,image:ssqInput.sc[s].page[ssqInput.sc[s].pageLength-1].imagesLength-1,pageProgress:1,})}}
let notActiveDistanceArray=[];for(let x=0;x<ssqInit.notActive.length;x++){notActiveDistanceArray[x]=ssqInit.notActive[x].distance}
notActiveDistanceArray.sort((a,b)=>a-b);for(let x=0;x<ssqInit.notActive.length;x++){if(notActiveDistanceArray[0]===ssqInit.notActive[x].distance){ssqInit.notActive.nearAbsImg=ssqUtilsConvToAbs(ssqInit.notActive[x].sc,ssqInit.notActive[x].page,ssqInit.notActive[x].image)
break}}
if(ssqInit.active.curAbsImg==undefined){ssqInit.aaaCurImg=ssqInit.notActive.nearAbsImg}else{ssqInit.aaaCurImg=ssqInit.active.curAbsImg}
let t1=performance.now();let tdelta=(t1-t0).toFixed(2);DEBUG&&console.log(tdelta,'ms ssqInit:',ssqInit)}
function ssqDumbPreloadArray(curImg,imageTotalLength){let t0=performance.now();PRELOADDEBUG&&console.log('INITIAL CONDITIONS: curImg:',curImg,' length:',imageTotalLength);var justOddArray=[];for(var i=0;i<(imageTotalLength)/2;i++){justOddArray[i]=i*2+1}
var blueArrayLimit=[];for(var i=0;i<(imageTotalLength-curImg)/2;i++){blueArrayLimit[i]=Math.log((imageTotalLength-curImg)/justOddArray[i])/Math.log(2)}
var blueArray=[]
for(var i=0;i<(imageTotalLength-curImg)/2;i++){blueArray[i]=[]
for(var j=0;j<blueArrayLimit[i];j++){blueArray[i][j]=Math.pow(2,[j])*justOddArray[i]+curImg}}
var blueArrayLinear=[];var blueArrayLength=blueArray.length;for(var i=0;i<blueArrayLength;i++){var blueArrayLengthSub=blueArray[i].length;for(var j=0;j<blueArrayLengthSub;j++){blueArrayLinear.push(blueArray[i][j])}}
var pinkArrayLimit=[];for(var i=0;i<(curImg)/2;i++){pinkArrayLimit[i]=Math.log((curImg)/justOddArray[i])/Math.log(2)}
var pinkArray=[]
for(var i=0;i<(curImg)/2;i++){pinkArray[i]=[]
for(var j=0;j<=pinkArrayLimit[i];j++){pinkArray[i][j]=-Math.pow(2,[j])*justOddArray[i]+curImg}}
var pinkArrayLinear=[]
var pinkArrayLength=pinkArray.length;for(var i=0;i<pinkArrayLength;i++){var pinkArrayLengthSub=pinkArray[i].length;for(var j=0;j<pinkArrayLengthSub;j++){pinkArrayLinear.push(pinkArray[i][j])}}
var combinedArray=[curImg]
var maxLengthOfBlueAndPink=Math.max(blueArrayLinear.length,pinkArrayLinear.length)
for(var i=0;i<maxLengthOfBlueAndPink;i++){if(blueArrayLinear[i]!==undefined){combinedArray.push(blueArrayLinear[i])}
if(pinkArrayLinear[i]!==undefined){combinedArray.push(pinkArrayLinear[i])}}
ssqImg.dumbPreloadOrder=combinedArray;let t1=performance.now();let tdelta=(t1-t0).toFixed(2);PRELOADDEBUG&&console.log(tdelta,'ms ssqImg.dumbPreloadOrder:',ssqImg.dumbPreloadOrder)}
function preloadPriorityAndNonPriorityImages(){let t0=performance.now();ssqImg.priorityImageArray=[]
for(let x=0;x<ssqInit.notActive.length;x++){var shc=ssqInit.notActive[x].sc;var str=ssqInit.notActive[x].page;var obr=ssqInit.notActive[x].image;ssqImg.priorityImageArray[x]=ssqUtilsConvToAbs(shc,str,obr);ssqImg.objArray[shc][str][obr].aaaaaaIsPriority=!0;ssqImg.objArray[shc][str][obr].aaaImageInfo={sc:shc,page:str,image:obr,};ssqImg.objArray[shc][str][obr].onload=preloadImagesCallbackFunction;ssqImg.objArray[shc][str][obr].src=ssqInput.sc[shc].page[str].imagesFull[obr]}
const subtractTwoArrays=(arr1,arr2)=>arr1.filter(el=>!arr2.includes(el))
ssqImg.nonPriorityImageArray=subtractTwoArrays(ssqImg.dumbPreloadOrder,ssqImg.priorityImageArray)
for(var i=0;i<ssqImg.nonPriorityImageArray.length;i++){var shc=ssqImg.absoluteOrder[ssqImg.nonPriorityImageArray[i]][0]
var str=ssqImg.absoluteOrder[ssqImg.nonPriorityImageArray[i]][1]
var obr=ssqImg.absoluteOrder[ssqImg.nonPriorityImageArray[i]][2]
ssqImg.objArray[shc][str][obr].aaaaaaIsPriority=!1;ssqImg.objArray[shc][str][obr].aaaImageInfo={sc:shc,page:str,image:obr};ssqImg.objArray[shc][str][obr].onload=preloadImagesCallbackFunction;ssqImg.objArray[shc][str][obr].src=ssqInput.sc[shc].page[str].imagesFull[obr]}
ssqImg.nonPriorityImageCountRequired=Math.round((ssqImg.totalImageNo-ssqImg.priorityImageArray.length)*ssqInput.preloadPercentage)
let t1=performance.now();let tdelta=(t1-t0).toFixed(2);PRELOADDEBUG&&console.log(tdelta,'ms preloadPriorityAndNonPriorityImages','PRIORITY:',ssqImg.priorityImageArray,'NON-PRIORITY:',ssqImg.nonPriorityImageArray,'NON PRIORITY REQD: ',ssqImg.nonPriorityImageCountRequired)}
function preloadImagesCallbackFunction(){this.aaaLoaded=!0;imageWasLoaded(this.aaaImageInfo,this.aaaaaaIsPriority)}
function imageWasLoaded(imageInfo,isPriority){if(isPriority){ssqImg.priorityImagesPreloadedCount=ssqImg.priorityImagesPreloadedCount+1}else{ssqImg.nonPriorityImagesPreloadedCount=ssqImg.nonPriorityImagesPreloadedCount+1}
if(ssqImg.priorityImagesPreloadedCount>=ssqImg.priorityImageArray.length){PRELOADDEBUG&&console.log('All priority images have been loaded. Loading non-priority now. ssqImg.nonPriorityImagesPreloadedCount:',ssqImg.nonPriorityImagesPreloadedCount,'../index.html',ssqImg.nonPriorityImageCountRequired)
ssqImg.priorityLoadingFinished=!0}
if(ssqImg.nonPriorityImagesPreloadedCount>=ssqImg.nonPriorityImageCountRequired){ssqImg.nonPriorityLoadingFinished=!0}
if(ssqImg.priorityLoadingFinished&&ssqImg.nonPriorityLoadingFinished){if(!ssqImg.zfirstDrawCalled){ssqImg.zfirstDrawCalled=!0;PRELOADDEBUG&&console.log('PRIORITY AND ENOUGH OF NON PRIORITY IMAGES ARE LOADED ------------- >>> RENDER SCROLLSEQUENCE ------------------------------')
ssqFirstDraw()
const event=document.createEvent('Event');event.initEvent('ssqPreloadPercentage',!0,!0);document.dispatchEvent(event)}}}
function renderRequest(sc,page,image,requestor,info){switch(requestor){case 'tween':if(ssqCur.lastPImgRenderedOnSc[sc][0]===page&&ssqCur.lastPImgRenderedOnSc[sc][1]===image){}else{renderCanvas(sc,page,image,requestor,info)}
break;case 'resize':renderCanvas(sc,page,image,requestor,info);break;case 'initActive':renderCanvas(sc,page,image,requestor,info)
ssqCur.logObj.renderSuccess.push([sc,page,image,requestor]);break;case 'initNotActive':renderCanvas(sc,page,image,requestor,info)
ssqCur.logObj.renderSuccess.push([sc,page,image,requestor]);break;case 'orientationChange':renderCanvas(sc,page,image,requestor,info)
ssqCur.logObj.renderSuccess.push([sc,page,image,requestor]);break;default:console.log('warning: no render requestor')}}
function renderCanvas(sc,page,image,requestor,info){DEBUG&&console.log('RenderCanvas:',sc,page,image,requestor,info);if(ssqImg.objArray[sc][page][image].aaaLoaded){let canvasWidth,canvasHeight,canvasAspectRatio;let canvasDPR=ssqHtml[sc].canvas.aaaDPR
if(ssqInput.sc[sc].forceFullWidth){canvasWidth=document.documentElement.clientWidth;ssqHtml[sc].canvas.style.left=-document.getElementsByClassName('scrollsequence-wrap')[sc].getBoundingClientRect().left-document.documentElement.scrollLeft+"px"}else{canvasWidth=document.getElementsByClassName('scrollsequence-pages-wrap')[sc].offsetWidth*1}
canvasHeight=document.getElementsByClassName('scrollsequence-pages-wrap')[sc].offsetHeight*1;canvasAspectRatio=canvasWidth/canvasHeight
ssqHtml[sc].canvas.style.width=(canvasWidth*1)+"px";ssqHtml[sc].canvas.style.height=(canvasHeight*1)+"px";ssqHtml[sc].context.canvas.width=canvasWidth*canvasDPR;ssqHtml[sc].context.canvas.height=canvasHeight*canvasDPR;if(canvasAspectRatio>=1){renderScaled(sc,page,ssqImg.objArray[sc][page][image],ssqInput.sc[sc].page[page].scaleTo.desktop,ssqInput.sc[sc].page[page].alignX.desktop,ssqInput.sc[sc].page[page].alignY.desktop)}else{renderScaled(sc,page,ssqImg.objArray[sc][page][image],ssqInput.sc[sc].page[page].scaleTo.mobile,ssqInput.sc[sc].page[page].alignX.mobile,ssqInput.sc[sc].page[page].alignY.mobile)}}else{console.log('Image [',sc,',',page,',',image,'] was not loaded in time ')}}
function renderScaled(sc,page,image,fitOrFill,alignX,alignY){var scale,x,y;switch(fitOrFill){case "fill":scale=Math.max(ssqHtml[sc].canvas.width/image.width,ssqHtml[sc].canvas.height/image.height);break;case "fit":scale=Math.min(ssqHtml[sc].canvas.width/image.width,ssqHtml[sc].canvas.height/image.height);break;default:scale=Math.min(ssqHtml[sc].canvas.width/image.width,ssqHtml[sc].canvas.height/image.height)*fitOrFill}
switch(alignX){case "left":x=0;break;case "right":x=(ssqHtml[sc].canvas.width)-(image.width)*scale;break;case "center":x=(ssqHtml[sc].canvas.width/2)-(image.width/2)*scale;break;default:x=(ssqHtml[sc].canvas.width*alignX)-(image.width*alignX)*scale}
switch(alignY){case "top":y=0;break;case "bottom":y=(ssqHtml[sc].canvas.height)-(image.height)*scale;break;case "center":y=(ssqHtml[sc].canvas.height/2)-(image.height/2)*scale;break;default:y=(ssqHtml[sc].canvas.height*alignY)-(image.height*alignY)*scale}
ssqHtml[sc].context.drawImage(image,Math.round(x),Math.round(y),Math.ceil(image.width*scale),Math.ceil(image.height*scale));ssqCur.lastPImgRenderedOnSc[sc]=[page,image.aaaImageInfo.image]}
function ssqUtilsConvToAbs(sc,page,image){for(let x=0;x<ssqImg.totalImageNo;x++){if(ssqImg.absoluteOrder[x][0]===sc&&ssqImg.absoluteOrder[x][1]===page&&ssqImg.absoluteOrder[x][2]===image){return x;break}}}
let lastOnScrollScStatus,lastOnScrollPage,lastOnScrollImage;let stickyPinWrap;let ticking=!1;let countFastFire=0;let countRafFire=0;for(let s=0;s<ssqInput.scLength;s++){for(let i=0;i<ssqInput.sc[s].page.length;i++){for(let j=0;j<ssqInput.sc[s].page[i].animElLength;j++){ssqInput.sc[s].page[i].animEl[j].thisIsElement=jQuery(".ssq-wrap-"+s+" "+ssqInput.sc[s].page[i].animEl[j].ssqnce_anim_io_id)}}}
if(ssqInput.sc[0].position=='sticky-js'){DEBUG&&console.log('sticky js ')
function ssqStickyPinWrapBefore(){ssqHtml[0].sticky.setAttribute("style","position:relative;box-sizing: border-box;border:-1px dashed lightgreen;")}
function ssqStickyPinWrapActive(){let stickyWidth,stickyHeight,stickyLeft;stickyHeight=document.getElementsByClassName('scrollsequence-pages-wrap')[0].offsetHeight*1;stickyWidth=document.getElementsByClassName('scrollsequence-wrap')[0].offsetWidth*1;stickyLeft=document.getElementsByClassName('scrollsequence-wrap')[0].getBoundingClientRect().left-document.documentElement.scrollLeft+"px";ssqHtml[0].sticky.setAttribute("style","position:fixed; left:"+stickyLeft+"; top:0px;height:"+stickyHeight+"px; width:"+stickyWidth+"px;margin:0px;padding:0px;border:0px")}
function ssqStickyPinWrapAfter(){ssqHtml[0].sticky.setAttribute("style","position:relative;transform: translate3d(0px, "+ssqInput.sc[0].scSpacer+"px, 0px);box-sizing: border-box;border:-1px dashed lightgreen;")}}else{DEBUG&&console.log('not sticky-js')}
function ssqEventOnScroll(scroll_pos,nopin){let curOnScrollScStatus;if(scroll_pos>=ssqCalc.sc[0].absBegin&&scroll_pos<ssqCalc.sc[0].absEnd){curOnScrollScStatus='active'
for(let i=0;i<ssqInput.sc[0].page.length;i++){if(scroll_pos>=ssqCalc.sc[0].page[i].absBegin&&scroll_pos<ssqCalc.sc[0].page[i].absEnd){ssqCur.sc=0
ssqCur.page=i
ssqCur.pageProgress=(scroll_pos-ssqCalc.sc[0].page[i].absBegin)/(ssqInput.sc[0].page[i].pageSpacer)
ssqCur.image=Math.round(ssqCur.pageProgress*(ssqInput.sc[0].page[i].imagesLength-1))
break}}}else if(scroll_pos<ssqCalc.sc[0].absBegin){curOnScrollScStatus='before'}else{curOnScrollScStatus='after'}
if(lastOnScrollScStatus!==curOnScrollScStatus){lastOnScrollScStatus=curOnScrollScStatus
if(ssqInput.sc[0].position=='sticky-js'){switch(curOnScrollScStatus){case 'active':if(!nopin){ssqStickyPinWrapActive()}
break;case 'after':if(!nopin){ssqStickyPinWrapAfter()}
break;default:if(!nopin){ssqStickyPinWrapBefore()}}}}
if(curOnScrollScStatus==='active'){if(lastOnScrollPage!==ssqCur.page){lastOnScrollPage=ssqCur.page;for(let i=0;i<ssqInput.sc[0].page.length;i++){if(i===ssqCur.page){ssqHtml[0].page[i].style.display="block"}else{ssqHtml[0].page[i].style.display="none"}}}
if(lastOnScrollImage!==ssqCur.image){lastOnScrollImage=ssqCur.image
for(let j=0;j<ssqInput.sc[0].page[ssqCur.page].animElLength;j++){if(ssqCur.image>=ssqInput.sc[0].page[ssqCur.page].animEl[j].ssqnce_anim_io_start&&ssqCur.image<=ssqInput.sc[0].page[ssqCur.page].animEl[j].ssqnce_anim_io_end){for(let k=0;k<ssqInput.sc[0].page[ssqCur.page].animEl[j].thisIsElement.length;k++){ssqInput.sc[0].page[ssqCur.page].animEl[j].thisIsElement[k].style.visibility="inherit"}}else{for(let k=0;k<ssqInput.sc[0].page[ssqCur.page].animEl[j].thisIsElement.length;k++){ssqInput.sc[0].page[ssqCur.page].animEl[j].thisIsElement[k].style.visibility="hidden"}}}
renderCanvas(0,ssqCur.page,ssqCur.image)}}}
let lastWindowWidth;let lastWindowHeight;function ssqEventReqAnimFrameFire(scroll_pos,requestor){switch(requestor){case "scroll":ssqEventOnScroll(scroll_pos)
break;case "resize":if(document.documentElement.clientWidth!==lastWindowWidth){lastWindowWidth=document.documentElement.clientWidth
ssqCalcCalculate()
renderCanvas(0,ssqCur.page,ssqCur.image)}else if(document.documentElement.clientHeight!==lastWindowHeight){lastWindowHeight=document.documentElement.clientHeight
renderCanvas(0,ssqCur.page,ssqCur.image)}
break;case "orientationchange":ssqCalcCalculate()
renderCanvas(0,ssqCur.page,ssqCur.image)
break;default:console.log('ERROR REQUESTOR NOT DEFINED!')}}
function ssqEventFastFire(scroll_pos,requestor){if(!ticking){window.requestAnimationFrame(function(){ssqEventReqAnimFrameFire(scroll_pos,requestor);ticking=!1});ticking=!0}}
function ssqFirstDraw(){ssqCalcCalculate();ssqCurCalculate(window.scrollY)
ssqEventOnScroll(window.scrollY,!0);if(lastOnScrollScStatus==='before'){ssqEventOnScroll(ssqCalc.sc[0].absBegin,!0);ssqEventOnScroll(window.scrollY)}else if(lastOnScrollScStatus==='active'){(ssqInput.sc[0].position=='sticky-js')&&ssqStickyPinWrapActive();ssqEventOnScroll(window.scrollY)}else if(lastOnScrollScStatus==='after'){ssqEventOnScroll(ssqCalc.sc[0].absEnd-1,!0);ssqEventOnScroll(window.scrollY)}else{}
window.addEventListener("scroll",function(){ssqEventFastFire(window.scrollY,'scroll')});window.addEventListener("resize",function(){ssqEventFastFire(window.scrollY,'resize')});window.addEventListener("orientationchange",function(){ssqEventFastFire(window.scrollY,'orientationchange')});let nula=0;let interval=setInterval(function(){nula=nula+1;ssqCalcCalculate()},1000);jQuery('.scrollsequence-wrap').css("visibility","inherit")}
function delayedInitialExecution(){ssqCalcCalculate();ssqCurCalculate(window.scrollY)
ssqInitCalculate();ssqDumbPreloadArray(ssqInit.aaaCurImg,ssqImg.totalImageNo);preloadPriorityAndNonPriorityImages()}
setTimeout(delayedInitialExecution,50)}else{setTimeout(scrollsequenceMainFunction,100);console.log('"scrollsequence-wrap" container not found in DOM - trying again in 100ms')}}scrollsequenceMainFunction()