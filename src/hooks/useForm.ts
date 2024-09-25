import { useEffect, useState } from "react";

interface UseFormProps<T>{
  initialValue: T;
  validate:(values: T)=> Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>){
  const [values, setValuesState] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string,string>>({});
  
  const handleChangeText = (name: keyof T, text: string) => {
    setValuesState(prevValues => ({
      ...prevValues,
      [name]: text,
    }));
  };

  const handleBlur = (name:keyof T) =>{
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name:keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeText(name,text);
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur};
  };

  // 새로운 setValues 함수 추가
  const updateValues = (newValues: Partial<T>) => {
    setValuesState(prevValues => ({
      ...prevValues,
      ...newValues,
    }) as T);
  };

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
    const newErrors = validate(values);
    setErrors(newErrors);
  },[validate, values]);

  return {
    values,
    errors,
    touched,
    getTextInputProps,
    setErrors: updateErrors,
    handleSubmit,
    updateValues, // 새로운 함수 추가
  };
}

export default useForm;