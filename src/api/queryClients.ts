import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: false,
    },
    mutations: {
      retry: false, //재요청 사용 안함
    }
  }
})

export default queryClient;