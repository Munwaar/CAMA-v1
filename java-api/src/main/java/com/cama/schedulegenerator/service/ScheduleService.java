package com.cama.schedulegenerator.service;

import com.cama.schedulegenerator.model.Models;
import com.cama.schedulegenerator.model.Models.*;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.IntStream;

@Service
public class ScheduleService {
  public ScheduleResponse generate(GenerateRequest request) {
    List<Models.Break> breaks = Optional.ofNullable(request.breaks()).orElse(List.of());
    validateBreaks(breaks, request.periodCount());
    List<DaySchedule> days = request.workingDays().stream().map(day -> {
      List<Period> periods = new ArrayList<>();
      LocalTime cursor = request.startTime();
      for (int number = 1; number <= request.periodCount(); number++) {
        Subject subject = request.subjects().get((number - 1) % request.subjects().size());
        LocalTime end = cursor.plusMinutes(request.periodDurationMinutes());
        periods.add(new Period(number, cursor, end, subject.name(), subject.teacher(), subject.room(), false));
        cursor = end;
        for (Models.Break breakItem : breaks) {
          if (breakItem.afterPeriod() == number) {
            LocalTime breakEnd = cursor.plusMinutes(breakItem.durationMinutes());
            periods.add(new Period(number, cursor, breakEnd, breakItem.name(), "", "", true));
            cursor = breakEnd;
          }
        }
      }
      return new DaySchedule(day, periods);
    }).toList();
    return new ScheduleResponse(request.institutionName(), request.periodCount(), days);
  }

  private void validateBreaks(List<Models.Break> breaks, int periodCount) {
    Set<Integer> seen = new HashSet<>();
    breaks.forEach(item -> {
      if (item.afterPeriod() > periodCount || !seen.add(item.afterPeriod())) {
        throw new IllegalArgumentException("Breaks must target unique periods within the configured period count");
      }
    });
  }
}
