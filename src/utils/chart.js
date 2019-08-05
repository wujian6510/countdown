const ratioCount = function(num){
  const docWidth = 1920;
  const doc = window.document,
        docEl = doc.documentElement

  let clientWidth = docEl.getBoundingClientRect().width;
  if(clientWidth>docWidth){
    num = (num/100)*(100*(clientWidth/docWidth));
  }else{
    num = (num/100)*(100/(docWidth/clientWidth));
  }
  return num;
}


const resetFontSize = function(num){
  num = ratioCount(num);
  return num;
}

export {
  resetFontSize,
}