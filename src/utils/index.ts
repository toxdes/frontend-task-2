export const formatCount = (count: number): string => {
  if (count >= 1e9) {
    return `${parseFloat((count / 1e9).toFixed(1))} B`;
  }
  if (count >= 1e6) {
    return `${parseFloat((count / 1e6).toFixed(1))} M`;
  }
  if (count >= 1e3) {
    return `${parseFloat((count / 1e3).toFixed(1))} K`;
  }
  return `${count}`;
};

// stolen and modified from https://stackoverflow.com/a/3177838
export const timeSince = (date: Date) => {
  var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + "w";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  if (Math.floor(seconds) < 10) return "Just Now";
  return Math.floor(seconds) + "s";
};
