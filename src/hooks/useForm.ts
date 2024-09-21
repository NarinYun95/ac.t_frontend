import { useEffect, useState } from "react";

interface UseFormProps<T>{
  initialValue: T;
  validate:(values: T)=> Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>){
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({}); //초기 상태로 빈 객체 {}를 사용하여 상태를 설정
  //상태(touched)가 Record<string, boolean> 타입으로 정의
  const [errors, setErrors] = useState<Record<string,string>>({});
  
  const handleChangeText = (name: keyof T, text: string) => {
		setValues({
			...values,
			[name]: text,
		})
	};

	const handleBlur = (name:keyof T) =>{
		setTouched({
			...touched,
			[name]: true,
		})
	}

  const getTextInputProps = (name:keyof T) => {
    const value = values[name]
    const onChangeText = (text: string) => handleChangeText(name,text)
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur};
  };

  // 새로운 setErrors 함수 추가
  const updateErrors = (newErrors: Record<string, string>) => {
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleSubmit = (onSubmit: () => void) => {
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };

useEffect(()=>{
  const newErrors = validate(values);   //유효성 검증 error 관리
  setErrors(newErrors);
},[validate, values]);

  return {values, errors, touched, getTextInputProps, setErrors: updateErrors, handleSubmit}; //훅에서는 values, touched 상태, 함수 리턴
}

export default useForm;