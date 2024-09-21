import axiosInstance from "@/api/axios";


function setHeader(key:string, value:string){
  axiosInstance.defaults.headers.common[key]=value
}

function removeHeader(key: string){
  if(!axiosInstance.defaults.headers.common[key]){
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
}//키에 해당하는 디폴트 헤더가 있으면 지우고, 없다면 리턴

export {setHeader, removeHeader};