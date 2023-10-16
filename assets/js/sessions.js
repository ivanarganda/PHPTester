export const checkSession = ()=>{

   let sessionId = $('#sessionId').text();
   if ( !sessionId || sessionId === '' ){
      window.location = $('#url_main_index').text();
      return false;
   }

   return sessionId;

}

export const createIdUserSession = ()=>{

   return checkSession();

}


