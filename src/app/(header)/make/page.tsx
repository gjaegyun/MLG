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
import { useRouter } from "next/navigation";

export default function MakePage() {
  const { push } = useRouter();
  const [name, setName] = useState('');
  const [ageInfoList, setAgeInfoList] = useState(
    Array.from({ length: 5 }, () => ({ age: '', mood: '', info: '' }))
  );
  
  const handleMoodChange = (index: number, newMood: string) => {
    const newList = [...ageInfoList];
    newList[index].mood = newMood;
    setAgeInfoList(newList);
  };

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
    ageInfoList.every(
      (item) => item.age.trim() !== '' && item.mood.trim() !== '' && item.info.trim() !== ''
    );

    const handleSubmit = () => {
      const newEntry = {
        name,
        moodToNumber: ageInfoList.map((item) => item.mood),
        messages: ageInfoList.map((item) => item.info),
        age: ageInfoList.map((item) => Number(item.age)),
      };
    
      localStorage.setItem("DATA_SINGLE", JSON.stringify(newEntry));
    
      push('/others');
    };

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
              <div className={cn('flex', 'gap-[0.5rem]', 'w-full')}>
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
                <Select
                  value={item.mood}
                  onValueChange={(value) => handleMoodChange(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="기분지수를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg">
                    <SelectGroup>
                      <SelectLabel>기분지수</SelectLabel>
                      {Array.from({ length: 11 }, (_, i) => {
                        const value = (i - 5).toString();
                        return (
                          <SelectItem key={value} value={value}>
                            {value}점
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  );
}