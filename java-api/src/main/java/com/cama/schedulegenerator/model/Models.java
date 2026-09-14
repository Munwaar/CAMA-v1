package com.cama.schedulegenerator.model;

import jakarta.validation.constraints.*;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public final class Models {
  private Models() {}

  public record Subject(@NotBlank String name, @NotBlank String teacher, String room) {}
  public record Break(@NotBlank String name, @NotNull @Min(1) Integer afterPeriod, @NotNull @Min(1) Integer durationMinutes) {}
  public record GenerateRequest(
      @NotBlank String institutionName,
      @NotNull @Size(min=1) List<DayOfWeek> workingDays,
      @NotNull LocalTime startTime,
      @NotNull @Min(1) @Max(12) Integer periodCount,
      @NotNull @Min(15) @Max(180) Integer periodDurationMinutes,
      @NotNull @Size(min=1) List<Subject> subjects,
      List<Break> breaks) {}
  public record Period(int number, LocalTime startTime, LocalTime endTime, String subject, String teacher, String room, boolean breakPeriod) {}
  public record DaySchedule(DayOfWeek day, List<Period> periods) {}
  public record ScheduleResponse(String institutionName, int periodCount, List<DaySchedule> schedule) {}
}
