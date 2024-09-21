import { ForwardedRef } from "react";

//refs를 받아서 배열로 사용
function mergeRefs<T> (...refs:ForwardedRef<T>[]){
  return (node:T)=>{
    refs.forEach(ref=>{   //반복문
      if(typeof ref === 'function'){  //함수형 ref 처리
        ref(node)
      }
      else if(ref){                   //객체형 ref 처리
        ref.current = node;
      }
    });
  };
}

//react-merge-ref 라이브러리 써도 ㄱㅊ

export {mergeRefs};