export const checkSession = ()=>{

   let sessionId = $('#sessionId').text();
   if ( !sessionId || sessionId === '' ){
      
      window.location = $('#url_main_index').text();
      return false;
      
   }

   return sessionId;

}

export const deleteBufferFiles = ()=>{

   requestDeleteBufferFiles()
   .then( response => { console.log(response ); })

}

export const requestDeleteBufferFiles = async()=>{

   const response = await fetch( $('#url_request_delete_buffer_files').text() , { mode:'cors' } );
   
   return response.json();

}

export const createIdUserSession = ()=>{

   return checkSession();

}


