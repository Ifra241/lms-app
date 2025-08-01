import { format, isToday, isYesterday, isThisWeek, isValid } from "date-fns";

export const getMessageGroupLabel=(dataString:string)=>{
    const date=new Date(dataString);
    if(!isValid(date))return "Invalid Date";
    if(isToday(date))return "Today";
    if(isYesterday(date))return "Yesterday";
    if(isThisWeek(date))return format(date,"EEEE");
    return format(date,"dd MMMM yyyy");
};