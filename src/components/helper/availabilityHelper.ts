interface AvailabilitySlot {
  id: string;
  start_date_time: string;
  end_date_time: string;
  is_booked: boolean;
}

function toLocalInputValue(iso: string) {
  return iso.slice(0, 16);
}

function formatDisplayDate(timeString: string) {
  // If it's just a time string like "8:15", use today's date
  const dateStr =
    timeString.length <= 5 ? new Date().toISOString() : timeString;
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDisplayTime(timeString: string) {
  // If it's just a time like "8:15", parse it directly
  if (timeString.length <= 5) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return new Date(timeString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getDurationLabel(startTime: string, endTime: string) {
  // Parse time strings like "8:15" and "9:30"
  const [startHours, startMins] = startTime.split(":").map(Number);
  const [endHours, endMins] = endTime.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHours, startMins, 0);

  const endDate = new Date();
  endDate.setHours(endHours, endMins, 0);

  const h = (endDate.getTime() - startDate.getTime()) / 3_600_000;
  const rounded = Math.round(h * 10) / 10;

  return rounded === 1 ? "1 hour" : `${rounded} hours`;
}

function groupByDate(slots: AvailabilitySlot[]) {
  // Since backend only returns times, group by a generic "All Slots" key
  const map: Record<string, AvailabilitySlot[]> = {};
  const key = "Available Slots";
  map[key] = slots;
  return map;
}

export const availabilityHelper = {
  toLocalInputValue,
  formatDisplayDate,
  formatDisplayTime,
  getDurationLabel,
  groupByDate,
};
