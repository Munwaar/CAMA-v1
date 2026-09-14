package com.cama.schedulegenerator.service;

import com.cama.schedulegenerator.model.Models;
import com.cama.schedulegenerator.model.Models.*;
import org.junit.jupiter.api.Test;
import java.time.*;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class ScheduleServiceTest {
  private final ScheduleService service = new ScheduleService();
  private GenerateRequest request(List<Models.Break> breaks) {
    return new GenerateRequest("CAMA College", List.of(DayOfWeek.MONDAY), LocalTime.of(9, 0), 3, 50,
        List.of(new Subject("Mathematics", "Ms. Priya", "A-101"), new Subject("Science", "Mr. Arun", "Lab 1")), breaks);
  }

  @Test void createsConfiguredPeriodsAndRotatesSubjects() {
    DaySchedule monday = service.generate(request(List.of())).schedule().getFirst();
    assertEquals(3, monday.periods().size());
    assertEquals("Mathematics", monday.periods().get(0).subject());
    assertEquals("Science", monday.periods().get(1).subject());
    assertEquals(LocalTime.of(11, 30), monday.periods().get(2).endTime());
  }

  @Test void insertsBreakAfterConfiguredPeriod() {
    DaySchedule monday = service.generate(request(List.of(new Models.Break("Lunch", 2, 40)))).schedule().getFirst();
    assertEquals(4, monday.periods().size());
    assertTrue(monday.periods().get(2).breakPeriod());
    assertEquals(LocalTime.of(12, 10), monday.periods().get(3).endTime());
  }

  @Test void rejectsBreakOutsidePeriodRange() {
    assertThrows(IllegalArgumentException.class, () -> service.generate(request(List.of(new Models.Break("Lunch", 4, 30)))));
  }
}
