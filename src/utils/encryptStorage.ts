import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptStorage = async<T>(key: string, data: T) =>{
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

const getEncryptStorage = async(key: string) => {
  const storeData = await EncryptedStorage.getItem(key) 

  return storeData ? JSON.parse(storeData) : null; //저장된 데이터 체크
};

const removeEncryptStorage = async (key:string) => {
  const data = await getEncryptStorage(key); //key에 해당하는 데이터가 있는지 판단
  if (data){
    await EncryptedStorage.removeItem(key);
  }
};



export {setEncryptStorage, getEncryptStorage, removeEncryptStorage,};