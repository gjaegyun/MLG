'use client';

import { useState } from "react";
import CustomFormItem from "@/components/CustomFormItem";
import { Input } from "@/components/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

export default function MakePage() {
  const [name, setName] = useState('');
  const [ageInfoList, setAgeInfoList] = useState(
    Array.from({ length: 5 }, () => ({ age: '', info: '' }))
  );

  const handleAgeChange = (index: number, newAge: string) => {
    const newList = [...ageInfoList];
    newList[index].age = newAge;
    setAgeInfoList(newList);
  };

  const handleInfoChange = (index: number, newInfo: string) => {
    const newList = [...ageInfoList];
    newList[index].info = newInfo;
    setAgeInfoList(newList);
  };

  const isFormValid =
    name.trim() !== '' &&
    ageInfoList.every((item) => item.age.trim() !== '' && item.info.trim() !== '');

  return (
    <div className={cn('flex', 'w-full', 'h-[calc(100vh-6rem)]', 'mt-[1rem]', 'justify-center', 'items-center', 'flex-col')}>
      <div className={cn('flex', 'p-[1.5rem]', 'flex-col', 'justify-center', 'items-center', 'bg-slate-100', 'rounded-xl', 'gap-[1.5rem]')}>
        
        <CustomFormItem text="이름" className="gap-1">
          <Input
            placeholder="이름을 입력해주세요."
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </CustomFormItem>

        {ageInfoList.map((item, index) => {
          const selectedAges = ageInfoList
            .map((el) => el.age)
            .filter((age, i) => age && i !== index); 

          return (
            <CustomFormItem key={index} text={`나이 ${index + 1}`} className="gap-1">
              <Select value={item.age} onValueChange={(value) => handleAgeChange(index, value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="나이를 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg">
                  <SelectGroup>
                    <SelectLabel>나이 선택</SelectLabel>
                    {Array.from({ length: 90 }, (_, i) => {
                      const value = (i + 1).toString();
                      const isSelected = selectedAges.includes(value);
                      if (isSelected) return null; 
                      return (
                        <SelectItem key={value} value={value}>
                          {value}살
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                placeholder="정보를 작성해주세요."
                type="text"
                value={item.info}
                onChange={(e) => handleInfoChange(index, e.target.value)}
              />
            </CustomFormItem>
          );
        })}
        <Button
          variant="blue"
          className={cn('w-full')}
          disabled={!isFormValid}
        >
          확인
        </Button>
      </div>
    </div>
  );
}