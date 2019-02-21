function palindrome(str) {
    str = str.toLowerCase()
             .replace(/[^a-z0-9]/g,'');
    if(str.length === 1){
      return true;
    }else if(str.length === 2){
      return str[0] === str[1]
        ? true
        : false;
    }else{
      return str[0] === str[str.length - 1]
        ? palindrome(str.slice(1, -1))
        : false;
    }
  }