import { IUser } from './../../models/user';
import { IAttendee } from '../../models/activity';

export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;
  return new Date(dateString + " " + timeString);
};

export const createAttendee = (user: IUser): IAttendee  => {
  return {
    displayName: user.displayName,
    username: user.username,
    image: user.image!,
    isHost: false
  }
}